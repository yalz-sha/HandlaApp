using Handla.Interfaces;
using Handla.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;

    public AuthController(IUserService userService, IConfiguration config)
    {
        _userService = userService;
        _configuration = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        var createdUser = _userService.Register(user, user.Password);
        return StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(User user)
    {
        
        var loginUser = _userService.Login(user.Username.ToLower(), user.Password);

        if (loginUser == null)
            return Unauthorized();
        

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Issuer"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new
        {
            token = tokenHandler.WriteToken(token),
            userId = loginUser.Id
        });
    }
}
