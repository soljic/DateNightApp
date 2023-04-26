using API.DTOs;
using AutoMapper;
using Domain;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //CreateMap<Product, ProductToReturnDto>()
            //    .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            //    .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            //    .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());


            //CreateMap<CommandProductDto, Product>()
            //.ForMember(dest => dest.ProductBrand, opt => opt.MapFrom(src => new ProductBrand { Name = src.ProductBrand }))
            //.ForMember(dest => dest.ProductType, opt => opt.MapFrom(src => new ProductType { Name = src.ProductType }))
            //.ForMember(dest => dest.PictureUrl, opt => opt.MapFrom<ProductPictureUrlResolver>());

            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>();
            // CreateMap<OrderDto, Order>().ReverseMap();


        }
    }
}
