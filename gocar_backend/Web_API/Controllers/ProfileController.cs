using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Security.Claims;
using Ubiety.Dns.Core;
using Web_API.Data;
using Web_API.Models.ProfileModels;
using static Web_API.Controllers.ProfileController;
using Response = Web_API.Models.ProfileModels.Response;
using Microsoft.AspNetCore.Authorization;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProfileController : Controller
    {

        public record SignInRequest(string Email, string Password);
        public record Response(bool IsSuccess, string Message);
        public record UserClaim(string Type, string Value);
        public record User(string Email, string Name, string Surname);



        private readonly ProfilesDbContext dbContext;
        public ProfileController(ProfilesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        

        [HttpPost("signin")]
        public async Task<IActionResult> SignInAsync([FromBody] SignInRequest signInRequest)
        {
            var user = dbContext.Profiles.FirstOrDefault(x => x.Email == signInRequest.Email &&
                                                x.Password == signInRequest.Password);
            if (user is null)
            {
                return BadRequest(new Response(false, "Invalid credentials."));
            }

            var claims = new List<Claim>
    {
        new Claim(type: ClaimTypes.Email, value: signInRequest.Email),
        new Claim(type: ClaimTypes.Name,value: user.Name),
        new Claim(type: ClaimTypes.Surname,value: user.Surname),
    };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity),
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    AllowRefresh = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7)
                });

            return Ok(new Response(true, "Signed in successfully"));
        }

        [Authorize]
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            var users = HttpContext.User.Claims.ToList();

            if (users is null)
                return BadRequest(new {isSuccess =  false, message = "Something went wrong"});

            var email = users.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var name = users.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            var surname = users.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value;

            var user = new User(email, name, surname);
             var userClaims = HttpContext.User.Claims.Select(x => new UserClaim(x.Type, x.Value)).ToList();
            return Ok(new {isSuccess = true, user});
        }

        [Authorize]
        [HttpGet("signout")]
        public async Task<IActionResult> SignOutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok( new {isSuccess = true, message = "Everything went right"});
        }
    }
}
