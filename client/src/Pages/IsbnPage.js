
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const IsbnPage = () => {
  
  const { isbnNum } = useParams(); // Extract isbnNumber from the URL
  const [bookData, setBookData] = useState(null); // To hold book data
  const [additionalData, setAdditionalData] = useState(null); // To hold additional book data (like pages)
  const { search } = useLocation(); // Access the URL query parameters
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_ISBN_API_KEY;
    const fetchBooksByIsbn = async () => {
      setLoading(true);
      setErrorMessage(""); // Reset error message before fetching new search

      try {
        // First API call for basic book data
        const response = await fetch(
          `https://api2.isbndb.com/book/${isbnNum}`,
          {
            method: "GET",
            headers: {
              "accept": "application/json",
              "Authorization": apiKey, // Add your ISBN API key here
            },
          }
        );
        
        if (!response.ok) {
          setErrorMessage("No books found for this isbn.");
          return;
        }

        const data = await response.json();
        setBookData(data.book); // Store book data

        // Second API call for additional data (pages, etc.)
        const additionalResponse = await fetch(
          `https://api2.isbndb.com/books/${isbnNum}?page=1&pageSize=20&shouldMatchAll=0`,
          {
            method: "GET",
            headers: {
              "accept": "application/json",
              "Authorization": apiKey, // Add your ISBN API key here
            },
          }
        );

        if (!additionalResponse.ok) {
          setErrorMessage("No additional data found for this isbn.");
          return;
        }

        const additionalData = await additionalResponse.json();
        setAdditionalData(additionalData.books[0]); // Assuming the first book in the response has the required data

      } catch (error) {
        console.error("Error fetching book by isbn:", error);
        setErrorMessage("An error occurred while fetching book by isbn.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByIsbn();
  }, [isbnNum]);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
  }

  if (!bookData) {
    return <div className="text-white text-center">No data found for this ISBN.</div>;
  }



  return (
    <div className="text-white p-6 h-screen flex justify-center items-center">
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg w-full max-w-3xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Book Image */}
          <img
            src={bookData.image}
            alt={bookData.title}
            className="w-48 h-72 object-cover rounded-md"
          />

          {/* Book Title */}
          <h2 className="text-2xl font-semibold">{bookData.title}</h2>

          {/* ISBN, ISBN10, and ISBN13 */}
          <div className="text-lg space-y-2">
            <p><strong>Author(s):</strong> {bookData.authors.join(", ")}</p>
            <p><strong>ISBN:</strong> {bookData.isbn}</p>
            <p><strong>ISBN10:</strong> {bookData.isbn10}</p>
            <p><strong>ISBN13:</strong> {bookData.isbn13}</p>
            <p><strong>Pages:</strong> {additionalData.pages}</p>
            <p><strong>Published:</strong> {additionalData.date_published}</p>
            <p><strong>Language:</strong> {bookData.language}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsbnPage;
