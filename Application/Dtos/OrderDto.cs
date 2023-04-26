using Domain.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class OrderDto
    {

        public int DeliveryMethod { get; set; }
        public string BasketId { get; set; }
        public OrderAddress shippingAddress { get; set; }
    }
}
