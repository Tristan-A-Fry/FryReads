

import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addBookToUserProfile } from "../utils/bookActions";

const TitleSearchPage = () => {
  const { titleBook } = useParams(); // Extract author name from the URL
  const { search } = useLocation(); // Access the URL query parameters
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState(""); // Get language from query params
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page
  const [userBooks, setUserBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {

    const apiKey = process.env.REACT_APP_ISBN_API_KEY;
    const fetchBooksByTitle = async () => {
      setLoading(true);
      setErrorMessage(""); // Reset error message before fetching new search

      // Get language from the query string if present
      const urlParams = new URLSearchParams(search);
      const selectedLanguage = urlParams.get("language");

      try {
        let url = `https://api2.isbndb.com/books/${titleBook}?page=${page}&pageSize=20&shouldMatchAll=0`;
        if(selectedLanguage){
          url += `&language=${selectedLanguage}`;
        }
        // Construct the request URL with language filter if present
        const response = await  fetch(url, 
          {
            method: "GET",
            headers: {
              "accept": "application/json",
              "Authorization": apiKey, // Add your ISBN API key here
            },
          }
        );
        
        if (!response.ok) {
          setErrorMessage("No books found by this title.");
          return;
        }

        const data = await response.json();
        console.log("Books Data: ", data); // Log the data for debugging

        // Sort books alphabetically and append them to existing books
        const sortedBooks = data.books.sort((a, b) => a.title.localeCompare(b.title));
        setBooks(prevBooks => [...prevBooks, ...sortedBooks]); // Append new books
      } catch (error) {
        console.error("Error fetching books by title:", error);
        setErrorMessage("An error occurred while fetching books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByTitle();
    }, [titleBook, page, search]); // Depend on authorName, page, and language filter changes

  useEffect(() => {
    // Infinite scroll detection
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPage(prevPage => prevPage + 1); // Load next page when bottom is reached
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up on unmount
  }, [loading]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchUserBooks = async () => {
      if (!localStorage.getItem("token")) return;

      const res = await fetch(`${apiUrl}/api/books/my-books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserBooks(data);
      }
    };

    fetchUserBooks();
  }, []);

  // If there is an error message, display it
  if (errorMessage) {
    return <div className="text-red-500 text-center mt-4">{errorMessage}</div>;
  }


  const handleAddBook = async (book) => {
    const added = await addBookToUserProfile(book);

    if (added) {
      const incomingIsbn = book.isbn || book.isbn13;
      setUserBooks((prev) => [
        ...prev,
        {
          isbn: incomingIsbn,
        },
      ]);
    }
  };

 return (
    <div className="max-w-6xl mx-auto p-4 pt-24">
      <h1 className="text-3xl font-bold mb-4">Books found with "{titleBook}"</h1>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {loading && <p>Loading...</p>}

      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => {
            const isAlreadyAdded = userBooks.some(
              (b) => b.isbn === (book.isbn || book.isbn13)
            );

            return (
              <li
                key={index}
                className="mb-4 p-4 bg-gray-800 text-white rounded-md flex items-center space-x-4"
              >
                <img
                  src={book.image || "https://via.placeholder.com/100x140?text=No+Image"}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  <p className="text-sm text-gray-300">
                    ISBN: {book.isbn || book.isbn13 || "N/A"}
                  </p>
                </div>

                {/* ✅ Conditional Button */}
                <div>
                  {isAlreadyAdded ? (
                    <span className="text-green-400 text-sm font-medium">✅ Already in Profile</span>
                  ) : (
                    <button
                      onClick={() => handleAddBook(book)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Add to Profile
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No books found by this title.</p>
      )}
    </div>
  );
};


export default TitleSearchPage;
