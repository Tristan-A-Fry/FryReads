using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto request)
    {
        if (request.Password != request.ConfirmPassword)
        {
            return BadRequest("Passwords do not match.");
        }

        var result = await _userService.RegisterUserAsync(request.Email, request.Password);
        return result ? Ok("User registered successfully.") : BadRequest("Registration failed.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        var token = await _userService.LoginUserAsync(request.Email, request.Password);
        return token != null ? Ok(new { Token = token }) : Unauthorized();
    }
}
