using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activity
{
    public class Delete
    {
           public class Command : IRequest
                {
                    public Guid Id { get; set; }
               
                 }            
                
            public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        var delete = await _context.Activities.FindAsync(request.Id);
                         if(delete==null)
                        {
                            throw new Exception("Could not find activity");
                        }

                          _context.Remove(delete);
                          //handler logic implementation
                        var succes = await _context.SaveChangesAsync() > 0;
        
                        if(succes) return Unit.Value;
                        throw new Exception("Problem saving changes");
        
                    }

        }
            }
    }
