using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Activity
{
    public class List
    {
        public class Query : IRequest<Result<List<Activities>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activities>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Activities>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await  _context.Activities.ToListAsync(cancellationToken);
              return Result<List<Activities>>.Success(activities);
            }
        }
    }
}