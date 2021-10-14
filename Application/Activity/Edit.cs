using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Domain;

namespace Application.Activity
{
    public class Edit
    {
                public class Command : IRequest
                {
                       public Activities Activities { get; set;}
                }
                 public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    
                    private readonly IMapper _mapper;
                    public Handler(DataContext context, IMapper mapper)
                    {
                        _context = context;
                        _mapper = mapper;
                    }

            public IMapper Mapper { get; }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {   

                        var editing = await _context.Activities.FirstOrDefaultAsync(c => c.Id== request.Activities.Id);
                        if(editing==null)
                        {
                            throw new Exception("Could not find activity");
                        }
                      
                        _mapper.Map(request.Activities,editing);
                        var succes = await _context.SaveChangesAsync() > 0;
        
                        if(succes) return Unit.Value;
                        throw new Exception("Problem saving changes");
        
                    }
        
            }
    }
}