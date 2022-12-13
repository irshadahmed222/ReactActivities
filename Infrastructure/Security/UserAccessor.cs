using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContext;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor;
        }
        public string GetUsername()
        {
            return _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}