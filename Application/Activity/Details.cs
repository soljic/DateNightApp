using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.Activity
{
    public class Details
    {
        public class Query : IRequest<Activities>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activities>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activities> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Activities.FirstOrDefaultAsync(c => c.Id == request.Id);
                return result;
            }
        }
    }
}