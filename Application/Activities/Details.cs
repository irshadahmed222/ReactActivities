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
using Persistence;

namespace Application.Activities
{
    public class Details
    {
       public class Query : IRequest<Result<ActivityDTOs>>
       {
            public Guid Id { get; set; }
       }

        public class Handler : IRequestHandler<Query, Result<ActivityDTOs>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ActivityDTOs>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .ProjectTo<ActivityDTOs>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x=> x.Id == request.Id);
                return Result<ActivityDTOs>.Success(activity);
            }
        }
    }
}