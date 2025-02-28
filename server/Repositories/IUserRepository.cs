using server.Models;

namespace server.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> AuthenticateAsync(string username, string password);
        Task<bool> UserExistsAsync(string username);
        Task AddUserAsync(User user);
    }
}