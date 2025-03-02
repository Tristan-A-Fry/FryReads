namespace server.Models
{
    //Read docs about Identity -> https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-9.0&tabs=visual-studio
    public class ApplicationUser : Microsoft.AspNetCore.Identity.IdentityUser
    {
        public List<UserBook> UserBooks { get; set; } = new List<UserBook>();
    }
}