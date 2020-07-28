using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activity;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/activities")]
    [ApiController]
    public class ActivitiesContoller : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesContoller(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activities>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

         [HttpGet("{id}")]
        public async Task<ActionResult<Activities>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }   
}