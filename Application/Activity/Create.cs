using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;



namespace Application.Activity
{
    public class Create
    {
          public class Command :  IRequest<Result<Unit>>
        {   public Activities Activity {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
         private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.Activities.Add(request.Activity);
                var succes = await _context.SaveChangesAsync() > 0;

                if (succes) return Result<Unit>.Success(Unit.Value);
                 return Result<Unit>.Failure("Failed to create activity");

            }
        }
    }
}