﻿using Application.Dtos;
using Domain.OrderAggregate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Order.Command
{
    public class CreateOrderCommand : IRequest<OrderDto>
    {
        public string BuyerEmail { get; set; }
        public int DeliveryMethod { get; set; }
        public string BasketId { get; set; }
        public OrderAddress ShippingAddress { get; set; }
    }


}
