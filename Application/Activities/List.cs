using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDTOs>>>{}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDTOs>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ActivityDTOs>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // .Include(a=> a.Attendees) // using after queryies
                // .ThenInclude(u => u.AppUser)
                var activities = await _context.Activities
                    .ProjectTo<ActivityDTOs>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                    // var activitiesToReturn = _mapper.Map<List<ActivityDTOs>>(activities);
                return Result<List<ActivityDTOs>>.Success(activities);
            }
        }
    }
}