using Microsoft.EntityFrameworkCore;

namespace server.Services
{
    public interface IAuthService
    {
        Task<string> RegisterUserAsync(string username, string password);
        Task<string?> LoginUserAsync(string username, string password);
    }
}