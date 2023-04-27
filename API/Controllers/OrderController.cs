using Application.Dtos;
using Application.Interfaces;
using Application.Order.Command;
using Domain;
using Domain.OrderAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly IMediator _mediator;
         private readonly IUserAccessor _userAccessor;
        public OrderController(IMediator mediator, IUserAccessor userAccessor)
        {
            _mediator = mediator;
            _userAccessor = userAccessor;
        }


        [HttpPost]
        public async Task<OrderDto> CreateOrder(API.DTOs.OrderDto order)
        {
            var email = _userAccessor.GetEmail();
            return await Mediator.Send(new CreateOrderCommand(order.DeliveryMethod, email, order.BasketId, order.shippingAddress));
        }

    }
}
