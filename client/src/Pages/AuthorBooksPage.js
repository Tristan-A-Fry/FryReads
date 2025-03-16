

import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const AuthorBooksPage = () => {
  const { authorName } = useParams(); // Extract author name from the URL
  const { search } = useLocation(); // Access the URL query parameters
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState(""); // Get language from query params
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {

    const apiKey = process.env.REACT_APP_ISBN_API_KEY;
    const fetchBooksByAuthor = async () => {
      setLoading(true);
      setErrorMessage(""); // Reset error message before fetching new search

      // Get language from the query string if present
      const urlParams = new URLSearchParams(search);
      const selectedLanguage = urlParams.get("language");

      try {
        // Construct the request URL with language filter if present
        const response = await fetch(
          `https://api2.isbndb.com/author/${encodeURIComponent(
            authorName
          )}?page=${page}&language=${selectedLanguage || ""}`, 
          {
            method: "GET",
            headers: {
              "accept": "application/json",
              "Authorization": apiKey, // Add your ISBN API key here
            },
          }
        );
        
        if (!response.ok) {
          setErrorMessage("No books found for this author.");
          return;
        }

        const data = await response.json();
        console.log("Books Data: ", data); // Log the data for debugging

        // Sort books alphabetically and append them to existing books
        const sortedBooks = data.books.sort((a, b) => a.title.localeCompare(b.title));
        setBooks(prevBooks => [...prevBooks, ...sortedBooks]); // Append new books
      } catch (error) {
        console.error("Error fetching books by author:", error);
        setErrorMessage("An error occurred while fetching books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByAuthor();
  }, [authorName, page, search]); // Depend on authorName, page, and language filter changes

  useEffect(() => {
    // Infinite scroll detection
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPage(prevPage => prevPage + 1); // Load next page when bottom is reached
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up on unmount
  }, [loading]);

  // If there is an error message, display it
  if (errorMessage) {
    return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Books by {authorName}</h1>

      {/* Language filter dropdown */}
      <div className="mb-4">
        <label htmlFor="language" className="mr-2">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="pl">Polish</option>
          {/* Add other language options as needed */}
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index} className="mb-2 p-2 bg-gray-800 text-white rounded-md flex items-center space-x-4">
              {/* Display Book Image */}
              <img src={book.image} alt={book.title} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h3 className="text-xl font-bold">{book.title}</h3>
                {/* Display ISBN or ISBN13 under the title */}
                <p className="text-sm">
                  ISBN: {book.isbn || book.isbn13 || "Not Available"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found for this author.</p>
      )}

      {/* Optionally you can show a "Loading more..." message or loading indicator */}
      {loading && <div>Loading more books...</div>}
    </div>
  );
};

export default AuthorBooksPage;

