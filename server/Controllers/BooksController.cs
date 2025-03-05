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

    [HttpGet("{isbn}")]
    public async Task<IActionResult> GetBookByIsbn(string isbn)
    {
        var book = await _isbndbService.GetBookByIsbnAsync(isbn);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }
}
