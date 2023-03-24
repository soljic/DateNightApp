  using Application.Activity;
using Application.Comments;
using Application.Notifications;
using AutoMapper;
using Domain;
using System.Linq;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Activities,Activities>();
             CreateMap<Activities,ActivityDto>().ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Phots.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername))); ; ;

                CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Phots.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Photos, o => o.MapFrom(s => s.Phots))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));;


            CreateMap<Comment, CommentDto>()
              .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
              .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
              .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Phots .FirstOrDefault(x => x.IsMain).Url));


            CreateMap<ActivityAttendee, Profiles.UserActivityDto>()
              .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
              .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
              .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
              .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
              .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
                  s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<Notification, NotificationDto>();

        }


    }
}