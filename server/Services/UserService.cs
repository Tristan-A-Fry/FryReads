
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using server.Models;

public interface IUserService
{
    Task<bool> RegisterUserAsync(string email, string password);
    Task<string> LoginUserAsync(string email, string password);
}

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IJwtService _jwtService;

    public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IJwtService jwtService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
    }

    public async Task<bool> RegisterUserAsync(string email, string password)
    {
        var user = new ApplicationUser { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);
        return result.Succeeded;
    }

    public async Task<string> LoginUserAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return null;

        var result = await _signInManager.PasswordSignInAsync(user, password, false, false);
        if (!result.Succeeded) return null;

        return _jwtService.GenerateToken(user.Id, user.Email);
    }
}
