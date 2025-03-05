/*
 Why do a need a respons model?
  - The API returns JSON.
  - C# needs a strongly typed object to map JSON properties to class properties.
  - BookDetail helps deserialize the JSON response so that your application can use it.
*/
namespace server.Models{
  public class BookResponse
  {
      public BookDetail Book { get; set; }
  }
}
