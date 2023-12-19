using System.Text.Json;
using AutoMapper;
using Domain;
using StackExchange.Redis;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace Application.Movies;

public class MovieService
{
    private readonly MovieHttpClient _httpClient;
    private readonly IMapper _mapper;
    private readonly StackExchange.Redis.IDatabase _redis;

    public MovieService(MovieHttpClient httpClient, IMapper mapper, IConnectionMultiplexer  redis)
    {
        _httpClient = httpClient;
        _mapper = mapper;
        _redis = redis.GetDatabase();
    }
    public async Task<List<Movie>> GetMovies(MDbParams mDbParams)
    {
        string cacheKey = $"movies_{mDbParams.Search ?? ""}_{mDbParams.Trending ?? ""}_{mDbParams.Popular ?? ""}_{mDbParams.PageNumber ?? 1}";
        
        // Provjeri cache
        var cachedMovies = await _redis.StringGetAsync(cacheKey);

        if(!string.IsNullOrEmpty(cachedMovies)) 
        {
            // Vrati iz cachea
            return JsonSerializer.Deserialize<List<Movie>>(cachedMovies);
        }
        if (mDbParams.Trending != null && mDbParams.Popular != null)
        {
            mDbParams.Popular = null;
        }
        var mDbUrl = mDbParams switch
        {
            { Search: not null } => $"search/movie?language=en-US&page={mDbParams.PageNumber}&include_adult=false&query={mDbParams.Search}",
            { Popular: not null } => $"movie/popular?language=en-US&page={mDbParams.PageNumber}",
            _ => $"trending/all/week?page={mDbParams.PageNumber}"
        };
        
        // Dohvati listu filmova s API-ja
        var apiMovies = await _httpClient.GetMoviesAsync(mDbUrl);
        ArgumentNullException.ThrowIfNull(apiMovies);
        var semaphore = new SemaphoreSlim(10); // Maksimalno 10 simultanih zahtjeva
        var creditTasks = apiMovies.Select(async movie =>
        {
            await semaphore.WaitAsync();

            try
            {
                var creditUrl = $"movie/{movie.Id}/credits?language=en-us";
                var production = await _httpClient.GetMoviesCreditsAsync(creditUrl);
                if (production != null)
                {
                    if (movie.Production == null)
                    {
                        movie.Production = new Production();
                    }
                    if(movie.Id == production.Id)
                    {
                        if (production.Cast != null)
                        {
                            foreach (var actor in production.Cast)
                            {
                                if (movie.Actors == null)
                                {
                                    movie.Actors = new List<ApiCastMember>();
                                }
                                if (actor.Name != null)
                                {
                                    movie.Actors.Add(actor);
                                }
                            }
                        }
                        if (production.Crew != null)
                        {
                            foreach (var member in production.Crew)
                            {
                                if (member != null && member.Job == "Director")
                                {
                                    movie.Director = member.Name;
                                    
                                }
                            }
                        }
                    }
                }
                else
                {
                    Console.WriteLine("Film nije pronađen.");
                }
               
            }
            finally
            {
                semaphore.Release();
            }
        });

        await Task.WhenAll(creditTasks);
       
        // Mapiraj listu API filmova izravno u listu vaših Movie objekata
        var movies = _mapper.Map<List<Movie>>(apiMovies);
        
        _redis.StringSet(cacheKey, JsonSerializer.Serialize(movies), TimeSpan.FromHours(1));
        return movies;
    }
    
}