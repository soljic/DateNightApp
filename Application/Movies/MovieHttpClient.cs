using System.Diagnostics;
using System.Net.Http.Headers;
using Domain;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using Application.Movies.Helpers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Application.Movies;

public class MovieHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public MovieHttpClient(IConfiguration configuration)
    {
        _configuration = configuration;
        string baseUrl = _configuration.GetSection("MovieService:BaseUrl").Value;

        Uri baseUri = new Uri(baseUrl);
        _httpClient = new HttpClient
        {
            BaseAddress = baseUri
        };

        // Postavljanje tokena u zaglavlje za autorizaciju
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration.GetSection("MovieService:AccessToken").Value);
    }

    public async Task<List<ApiMovie>> GetMoviesAsync(string url)
    {
        string apiKey = _configuration.GetSection("MovieService:ApiKey").Value;
        
        var response = await _httpClient.GetAsync($"{url}&api_key={apiKey}");

        if (response.IsSuccessStatusCode)
        {
            var jsonString = await response.Content.ReadAsStringAsync();
            var settings = new JsonSerializerSettings
            {
                Converters = { new ApiMovieConverter() },
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                },
                Formatting = Formatting.Indented
            };

            var movies = JsonConvert.DeserializeObject<ApiResponse>(jsonString, settings)?.Results;
            return movies;

        }
        else
        {
            // Ako zahtjev nije uspješan, obradi grešku (npr. bacanjem iznimke)
            response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            return null; // Ovo se nikada neće izvršiti, ali je potrebno zbog povratnog tipa
        }
    }
}