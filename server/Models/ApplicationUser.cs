namespace server.Models
{
    public class ApplicationUser : Microsoft.AspNetCore.Identity.IdentityUser
    {
        public List<UserBook> UserBooks { get; set; } = new List<UserBook>();
    }
}