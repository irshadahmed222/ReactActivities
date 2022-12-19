using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity,ActivityDTOs>()
                .ForMember(d => d.HostUsername, opt => opt.MapFrom(source => source.Attendees
                .FirstOrDefault(x=> x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendees, AttendeeDTOs>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o=> o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x=> x.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o=> o.MapFrom(s => s.Photos.FirstOrDefault(x=> x.IsMain).Url));
        }
    }
}