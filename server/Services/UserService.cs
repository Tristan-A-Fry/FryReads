
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using server.Models;

/*
Overview of this file:
  - This file handles user authentication (registration and log in) for now
*/
public interface IUserService
{
    Task<bool> RegisterUserAsync(string email, string password);
    Task<string> LoginUserAsync(string email, string password);
}

/*
  UserService Class:
    - Handles all dependencies using constructor injection
    - Each one is relativley self explanatory on what it is doing 
    - However something we may need to look back on is for SignInManager
      - Right now it is not being used, but if we want cookie based sign in's then we need to look into this further
    - Plain English "When user service is created, give it access to the following (usermanager, signInManager, jwtService)"
*/
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

    /*
      RegisterUserAsync:
        - Creates a new user using UserManager.CreateAsync();
        - Hashes the password before storing in DB, returns bool if it was successfully
        - More info on hashing:
          - UserManager generates a salt (random data to strengthen hash)
          - hashes the password using hashing algorithm (by default this is PBKDF2)
          - Stores the hashed password in ASPNetUsers.PasswordHash Console
          - ASPNet Identity automatically hashes the password 
          - We can further customize the hashing by adding a builder.service -> Read Microsoft docs
    */
    public async Task<bool> RegisterUserAsync(string email, string password)
    {
        var user = new ApplicationUser { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);
        return result.Succeeded;
    }

    /*
      LoginUserAsync:
        - Find user by email, check if password is correct, and return a jwt token for authentication
        - How do we compare the password when trying to login:
          - When a user tries to login with their password 
          - On that specific log in attempt, the password they are TRYING to log in with is hashed right away and comapred to the one stored in the database

          ---------------------------------------------------------------------------
          VERY IMPORTANT!VERY IMPORTANT!VERY IMPORTANT!VERY IMPORTANT!VERY IMPORTANT!
          ---------------------------------------------------------------------------
          - How do we verify the passwords if hashing results in a random set of data 
          - There are two parts to this and it is VERY IMPORTANT TO UNDERSTAND THIS:
            - Part 1 (registering a new user):
              - When a password is hashed and stored, ASP.NET Core automatically:
                - Generates a unique "salt" (random data) for each password.
                - Hashes the password + salt using PBKDF2 (or another hashing algorithm).
                - Stores the final hashed value AND the salt in the AspNetUsers.PasswordHash column.
            - Part 2 (logging in, password verification):
              - Even though each stored password is hashed uniquely (because of the salt), the system ensures that password verification is deterministic.
              - When a user logs in:
                - The system retrieves the stored hash from the database.
                - The stored hash contains the salt inside it.
                - It extracts the salt and re-hashes the entered password using the same salt.
                - It compares the new hash to the stored hash.
            - Part 3 (Why Doesn't Login Produce a Different Hash Every Time?)
              - The salt is not randomly generated on every login.
              - Instead, the same salt from registration is used when verifying passwords.
              - Since the same hashing function, salt, and password are used, the system reproduces the same hash.
    */
    public async Task<string> LoginUserAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null){
            Console.WriteLine("Login Failed: User not found");
            return null;
        } 

        bool isPasswordVaild = await _userManager.CheckPasswordAsync(user, password);
        if(!isPasswordVaild){
            Console.WriteLine("Login Failed: Incorrect Password.");
            return null; 
        }

        Console.WriteLine($"User {user.Email} logged in successfully.");
        return _jwtService.GenerateToken(user.Id, user.Email);
    }
}
