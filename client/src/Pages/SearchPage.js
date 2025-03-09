


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [searchType, setSearchType] = useState("isbn"); // Default search type
  const [language, setLanguage] = useState(""); // State to hold the selected language
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    setErrorMessage(""); // Reset error message before new search

    if (!searchTerm) {
      setErrorMessage("Please enter a search term.");
      return;
    }

    try {
      let url = "";

      if (searchType === "isbn") {
        // Redirect to ISBN detail page
        navigate(`/isbn/${searchTerm}`);
      } else if (searchType === "title") {
        url = `http://localhost:5186/api/books/search?type=title&query=${searchTerm}`;
        // Proceed with the search if needed
      } else if (searchType === "author") {
        // Redirect to Author's books page
        // Check if language is selected and append to URL if present
        if (language) {
          navigate(`/author/${encodeURIComponent(searchTerm)}?language=${language}`);
        } else {
          navigate(`/author/${encodeURIComponent(searchTerm)}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while searching.");
    }
  };

  return (
    <div className="search-container max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search for Books</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4">
        {/* Search by Dropdown */}
        <div className="flex space-x-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-3 border rounded-md w-64 text-lg"
          >
            <option value="isbn">ISBN</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>

          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-md w-64 text-lg"
          >
            <option value="">Select Language (Optional)</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64 text-lg text-black"
          required
        />

        {/* Search Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-64 hover:bg-blue-600 transition">
          Search
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
    </div>
  );
};

export default SearchPage;

