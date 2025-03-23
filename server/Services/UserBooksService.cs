using server.Models;
public interface IUserBooksService
{
    Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId);
    Task AddBookAsync(UserBook book);
    Task UpdateBookAsync(UserBook book);
}

public class UserBooksService : IUserBooksService
{
    private readonly IUserBooksRepository _bookRepository;

    public UserBooksService(IUserBooksRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId)
    {
        return await _bookRepository.GetBooksByUserIdAsync(userId);
    }

    public async Task AddBookAsync(UserBook book)
    {
        await _bookRepository.AddBookAsync(book);
    }

    public async Task UpdateBookAsync(UserBook book)
    {
        await _bookRepository.UpdateBookAsync(book);
    }
}
