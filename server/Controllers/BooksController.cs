using Microsoft.AspNetCore.Mvc;




[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IIsbnDbService _isbndbService;

    public BooksController(IIsbnDbService isbndbService)
    {
        _isbndbService = isbndbService;
    }

    // Endpoint for search
    [HttpGet("search")]
    public async Task<IActionResult> SearchBooks([FromQuery] string type, [FromQuery] string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return BadRequest(new { error = "Search term is required." });
        }

        try
        {
            string result = null;

            // Based on the `type` parameter, choose the correct search method
            if (type == "isbn")
            {
                result = await _isbndbService.GetBookByIsbnAsync(query); // Call for ISBN search
            }
            else if (type == "title")
            {
                result = await _isbndbService.GetBooksByTitleAsync(query); // Call for Title search
            }
            else if (type == "author")
            {
                result = await _isbndbService.GetBooksByAuthorAsync(query); // Call for Author search
            }
            else
            {
                return BadRequest(new { error = "Invalid search type." });
            }

            // Return the result, or a message if no book is found
            return result != null ? Ok(result) : NotFound(new { error = "No results found." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message }); // Internal server error
        }
    }
}





// [ApiController]
// [Route("api/[controller]")]
// public class BooksController : ControllerBase
// {
//     private readonly IIsbnDbService _isbndbService;
//
//     public BooksController(IIsbnDbService isbndbService)
//     {
//         _isbndbService = isbndbService;
//     }
//
//     [HttpGet("{isbn}")]
//     public async Task<IActionResult> GetBookByIsbn(string isbn)
//     {
//         var book = await _isbndbService.GetBookByIsbnAsync(isbn);
//         if (book == null)
//         {
//             return NotFound();
//         }
//         return Ok(book);
//     }
//     // Search by Title
//     [HttpGet("search/title/{title}")]
//     public async Task<IActionResult> GetBooksByTitle(string title)
//     {
//         var books = await _isbndbService.GetBooksByTitleAsync(title);
//         if (books == null)
//         {
//             return NotFound();
//         }
//         return Ok(books);
//     }
//
//     // Search by Author
//     [HttpGet("search/author/{author}")]
//     public async Task<IActionResult> GetBooksByAuthor(string author)
//     {
//         var books = await _isbndbService.GetBooksByAuthorAsync(author);
//         if (books == null)
//         {
//             return NotFound();
//         }
//         return Ok(books);
//     }
// }
