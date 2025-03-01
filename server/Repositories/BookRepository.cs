using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

public interface IBookRepository
{
    Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId);
    Task AddBookAsync(UserBook book);
    Task UpdateBookAsync(UserBook book);
}

public class BookRepository : IBookRepository
{
    private readonly ApplicationDbContext _context;

    public BookRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId)
    {
        return await _context.UserBooks.Where(b => b.UserId == userId).ToListAsync();
    }

    public async Task AddBookAsync(UserBook book)
    {
        _context.UserBooks.Add(book);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateBookAsync(UserBook book)
    {
        _context.UserBooks.Update(book);
        await _context.SaveChangesAsync();
    }
}
