using Microsoft.AspNetCore.Identity;
using server.Models;


/*
User Repository over all purpose:
    - responsible for interacting with the user database. 
    - Uses Asp.Net core identity to manage user related operations
*/

/*
IUserReposiotry Purpose:
    - defines what our reposiory should do
    - forces anty class that implements IUserRepository to have a method to retrieve a user by email
    - This will help with dependecy injection
*/
public interface IUserRepository
{
    Task<ApplicationUser> GetUserByEmailAsync(string email);
}

/*
UserRepository Purpose:
    - Actual Implementation of IUserRepository
    - Injects UserManger<ApplicationUser>, which is part of ASP.NET core identity
    - UserManger helps us manage users without manually writing db queries
    - See microsoft docs for more info on UserManger -> https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.identity.usermanager-1?view=aspnetcore-9.0

*/
public class UserRepository : IUserRepository
{

    // In plain English: 👉 "Inject an instance of UserManager<ApplicationUser> into _userManager when creating UserRepository."
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRepository(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

/*
- FindByEmailAsync is a function fo UserManger in ASP identity
- If user exists return the ApplicationUser object
- If not return null
*/
    public async Task<ApplicationUser> GetUserByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }
}
