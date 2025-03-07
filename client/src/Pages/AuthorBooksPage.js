
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AuthorBooksPage = () => {
  const { authorName } = useParams(); // Extract author name from the URL
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBooksByAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:5186/api/books/search?type=author&query=${authorName}`);
        
        // Check if the response is okay
        if (!response.ok) {
          setErrorMessage("No books found for this author.");
          return;
        }
        
        const data = await response.json();
        console.log("Books Data: ", data); // Log the data for debugging

        // Check if books are available in the response and set them
        setBooks(data.books || []); // Make sure you access the correct property
      } catch (error) {
        console.error("Error fetching books by author:", error);
        setErrorMessage("An error occurred while fetching books.");
      }
    };

    fetchBooksByAuthor();
  }, [authorName]);

  // If there is an error message, display it
  if (errorMessage) {
    return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Books by {authorName}</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index} className="mb-2 p-2 bg-gray-800 text-white rounded-md">
              {book.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found for this author.</p>
      )}
    </div>
  );
};

export default AuthorBooksPage;

