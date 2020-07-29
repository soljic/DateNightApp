using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activity
{
    public class Edit
    {
                public class Command : IRequest
                {
                         public Guid Id { get; set; }
                        public string Title { get; set; }
                        public string Descriptionle { get; set; }
                        public string Category { get; set; }
                        public DateTime? Date  { get; set; }
                        public string City { get; set; }
                        public string Venue { get; set; }
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

                        var editing = await _context.Activities.FirstOrDefaultAsync(c => c.Id== request.Id);
                        if(editing==null)
                        {
                            throw new Exception("Could not find activity");
                        }
                        editing.Title = request.Title ?? editing.Title;
                        editing.Descriptionle = request.Descriptionle ?? editing.Descriptionle;
                        editing.Category = request.Category ?? editing.Category;
                        editing.Date = request.Date ?? editing.Date;
                        editing.City = request.City ?? editing.City;
                        editing.Venue = request.Venue ?? editing.Venue;
                        
                        var succes = await _context.SaveChangesAsync() > 0;
        
                        if(succes) return Unit.Value;
                        throw new Exception("Problem saving changes");
        
                    }
        
            }
    }
}