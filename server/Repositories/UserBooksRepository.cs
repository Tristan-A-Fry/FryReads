using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

public interface IUserBooksRepository
{
    Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId);
    Task AddBookAsync(UserBook book);
    Task UpdateBookAsync(UserBook book);
    Task<UserBook> GetBookByIdAsync(int id);
    Task DeleteBookAsync(UserBook book);
}

public class UserBooksRepository : IUserBooksRepository
{
    private readonly ApplicationDbContext _context;


    // This is allowing us to interact with the database 
    // In english " When bookrepository is created give it a DB connection
    public UserBooksRepository(ApplicationDbContext context)
    {
        _context = context;

    }

    /*
      GetBooksByUserIdAsync
      - Self exaplanatory
      - Fetches all books that belong to a specific user
      - we would use this fucntion on their profile page or dashboard
    */
    public async Task<IEnumerable<UserBook>> GetBooksByUserIdAsync(string userId)
    {
        return await _context.UserBooks.Where(b => b.UserId == userId).ToListAsync();
    }

    /*
     * - Again pretty self exaplanatory
     * - Now that we are accessing the database we need "_context"
     * - then save changes asynchoroulsy 
     * */
    public async Task AddBookAsync(UserBook book)
    {
        _context.UserBooks.Add(book);
        await _context.SaveChangesAsync();
    }

    /*
     * - Basically the same thing as above only this time we are updating the book object 
     * - We will use this for example when a user wants to change their reading progress (i.e what page # they are on)
     * */
    public async Task UpdateBookAsync(UserBook book)
    {
        _context.UserBooks.Update(book);
        await _context.SaveChangesAsync();
    }

    public async Task<UserBook> GetBookByIdAsync(int id)
    {
        return await _context.UserBooks.FindAsync(id);
    }

    public async Task DeleteBookAsync(UserBook book)
    {
        _context.UserBooks.Remove(book);
        await _context.SaveChangesAsync();
    }
}
