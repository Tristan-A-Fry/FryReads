using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
// using System.IdentityModel.Tokens.Jwt;

[ApiController]
[Route("api/books")]
[Authorize] // ✅ Requires JWT authentication for all endpoints in this controller
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet("my-books")]
    public async Task<IActionResult> GetMyBooks()
    {
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

        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        Console.WriteLine($"Extracted User ID from jwt: {userId}");

        if (string.IsNullOrEmpty(userId))
        {
            Console.WriteLine("Could not Extract user ID");
            return Unauthorized("Invalid user, Could not get the UserID");
        }

        var books = await _bookService.GetBooksByUserIdAsync(userId);
        return Ok(books);
    }
}
