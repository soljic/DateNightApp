using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activity
{
    public class List
    {
        public class Query : IRequest<List<Activities>> { }

        public class Handler : IRequestHandler<Query, List<Activities>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activities>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await  _context.Activities.ToListAsync();
                return activities;
            }
        }
    }
}