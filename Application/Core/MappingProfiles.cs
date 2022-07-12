using Application.Activity;
using Application.Comments;
using AutoMapper;
using Domain;
using System.Linq;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activities,Activities>();
             CreateMap<Activities,ActivityDto>().ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Phots.FirstOrDefault(x => x.IsMain).Url));

                CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Phots.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Photos, o => o.MapFrom(s => s.Phots));


            CreateMap<Comment, CommentDto>()
              .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
              .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
              .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Phots .FirstOrDefault(x => x.IsMain).Url));
        }
    }
}