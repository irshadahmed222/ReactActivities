using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{   
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AccountController(
            ILogger<AccountController> logger, 
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            TokenService tokenService
            )
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTOs>> Login(LoginDTOs loginDto )
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if(user == null) return Unauthorized();
            var result = await _signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTOs>> Register(RegisterDTOs registerDtos)
        {
            if(await _userManager.Users.AnyAsync(x=> x.Email == registerDtos.Email)){
                ModelState.AddModelError("email", "Email taken");
               return ValidationProblem(); 
            } 
            if(await _userManager.Users.AnyAsync(x=> x.UserName == registerDtos.UserName)) { 
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new AppUser {
                DisplayName = registerDtos.DisplayName,
                Email = registerDtos.Email,
                UserName = registerDtos.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDtos.Password);

            if(result.Succeeded){
                return CreateUserObject(user);
            }
            return BadRequest("Error occured registering user, kindly contact system administration");
        }

        [HttpGet]
        public async Task<ActionResult<UserDTOs>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        private UserDTOs CreateUserObject(AppUser user)
        {
            return new UserDTOs
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}