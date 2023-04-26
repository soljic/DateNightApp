using Domain.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {

        public int DeliveryMethod { get; set; }
        public string BasketId { get; set; }
        public OrderAddress shippingAddress { get; set; }
    }
}
