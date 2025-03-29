using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
// using System.IdentityModel.Tokens.Jwt;

[ApiController]
[Route("api/books")]
[Authorize] // ✅ Requires JWT authentication for all endpoints in this controller
public class AddBooksController : ControllerBase
{
    private readonly IUserBooksService _bookService;

    public AddBooksController(IUserBooksService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet("my-books")]
    public async Task<IActionResult> GetMyBooks()
    {

        /* FOR DEBUGGING
          Console.WriteLine("WE ARE INSIDE THE GET MY BOOKS METHOD()");
          Console.WriteLine("Incoming Request Header:");
          foreach (var header in Request.Headers)
          {
              Console.WriteLine($"   {header.Key}: {header.Value}");
          }

          foreach (var claim in User.Claims) // 🔍 Print all claims for debugging
          {
              Console.WriteLine($"🔹 Claim: {claim.Type} = {claim.Value}");
          }
          */

        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        //For Debugging
        // Console.WriteLine($"Extracted User ID from jwt: {userId}");

        if (string.IsNullOrEmpty(userId))
        {

            //For Debugging
            // Console.WriteLine("Could not Extract user ID");

            return Unauthorized("Invalid user, Could not get the UserID");
        }

        var books = await _bookService.GetBooksByUserIdAsync(userId);
        return Ok(books);
    }

    [HttpPost]
    public async Task<IActionResult> AddBook([FromBody] UserBook book)
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Invalid user.");

        book.UserId = userId;
        book.AddedDate = DateTime.UtcNow;

        await _bookService.AddBookAsync(book);
        return Ok(book);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] UserBook updatedBook)
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Invalid user.");

        // Optional: validate ownership and book existence
        updatedBook.Id = id;
        updatedBook.UserId = userId;

        await _bookService.UpdateBookAsync(updatedBook);
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var book = await _bookService.GetBookByIdAsync(id);

        if (book == null || book.UserId != userId)
            return NotFound();

        await _bookService.DeleteBookAsync(book);
        return NoContent();
    }
}
