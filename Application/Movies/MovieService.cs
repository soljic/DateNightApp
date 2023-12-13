using AutoMapper;
using Domain;

namespace Application.Movies;

public class MovieService
{
    private readonly MovieHttpClient _httpClient;
    private readonly IMapper _mapper;

    public MovieService(MovieHttpClient httpClient, IMapper mapper)
    {
        _httpClient = httpClient;
        _mapper = mapper;
    }
    public async Task<List<Movie>> GetMovies(MDbParams mDbParams)
    {
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

        // Mapiraj listu API filmova izravno u listu vaših Movie objekata
        var movies = _mapper.Map<List<Movie>>(apiMovies);

        return movies;
    }
    
}