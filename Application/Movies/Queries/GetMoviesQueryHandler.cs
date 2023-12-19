using Application.Core;
using Application.Order.Queries;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Movies.Queries
{
    public class GetMoviesQueryHandler : IRequestHandler<GetMoviesQuery, Result<PagedListApi<Movie>>>
    {
        private readonly DataContext _context;
        private readonly MovieService _movieService;
        private readonly IMapper _mapper;

        public GetMoviesQueryHandler(DataContext context, IMapper mapper, MovieService movieService)
        {
            _context = context;
            _mapper = mapper;
            _movieService = movieService;
        }


        public async Task<Result<PagedListApi<Movie>>> Handle(GetMoviesQuery request, CancellationToken cancellationToken)
        { 
            var movies = await _movieService.GetMovies(request.MDbparams);
            if (movies == null)
            {
                throw new ApplicationException("Problem getting the items");
            }
            foreach (var movie in movies) 
            {
                movie.Cast = movie.Cast.Take(5).ToList();
            } 
            return Result<PagedListApi<Movie>>.Success(
                PagedListApi<Movie>.CreateAsync(movies,request.MDbparams.PageNumber!.Value, request.MDbparams.PageSize)
            );
            
        }
    }
}
