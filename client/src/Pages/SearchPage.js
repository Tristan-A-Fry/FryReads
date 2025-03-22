

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [searchType, setSearchType] = useState(""); // Default search type
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

    if(!searchType){
      setErrorMessage("Please enter a search type.");
      return;
    }

    try {
      let url = "";

      if (searchType === "isbn") {
        // Redirect to ISBN detail page
        navigate(`/isbn/${searchTerm}`);
      } else if (searchType === "title") {
        navigate(`/title/${searchTerm}`)
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
    <div className="search-container h-screen flex justify-center items-center bg-gray-900">
      <div className="max-w-6xl p-4 text-center">
        {/* Centered Text */}
        <h1 className="text-3xl font-bold text-white mb-6">Search for Books</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col items-center space-y-6">
          {/* Search by Dropdown */}
          <div className="flex space-x-6 mb-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-[200px] p-4 text-lg text-gray-700 bg-white border-2 border-[#2ac9ff] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2ac9ff] transition duration-200"
            >
              <option value="">Search By</option>
              <option value="isbn">ISBN</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>

            {/* Language Dropdown */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-[200px] p-4 text-lg text-gray-700 bg-white border-2 border-[#2ac9ff] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2ac9ff] transition duration-200"
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
            className="w-[700px] p-5 text-lg text-gray-700 border-2 border-[#2ac9ff] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2ac9ff] transition duration-200"
            required
          />

          {/* Search Button */}
          <button
            type="submit"
            className="w-[200px] p-4 text-lg text-gray-700 bg-white border-2 border-[#2ac9ff] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2ac9ff] transition duration-200"
          >
            Search
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default SearchPage;

