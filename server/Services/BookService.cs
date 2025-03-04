using server.Models;
public interface IBookService
{
    Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId);
    Task AddBookAsync(UserBook book);
    Task UpdateBookAsync(UserBook book);
}

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;

    public BookService(IBookRepository bookRepository)
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
