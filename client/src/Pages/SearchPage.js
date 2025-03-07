


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [searchType, setSearchType] = useState("isbn"); // Default search type
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
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
        navigate(`/author/${encodeURIComponent(searchTerm)}`);
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
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-3 border rounded-md w-64 text-lg"
        >
          <option value="isbn">ISBN</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-md w-64 text-lg text-black"
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





// import { useState } from "react";
//
// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search input
//   const [searchType, setSearchType] = useState("isbn"); // Default search type
//   const [searchResults, setSearchResults] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//
//   // Handle the search form submission
//   const handleSearch = async (e) => {
//     e.preventDefault(); // Prevent form submission
//     setErrorMessage(""); // Reset error message before new search
//
//     if (!searchTerm) {
//       setErrorMessage("Please enter a search term.");
//       return;
//     }
//
//     try {
//       // Construct the API URL based on search type
//       let url = "";
//       if (searchType === "isbn") {
//         url = `http://localhost:5186/api/books/${searchTerm}`; // ISBN search
//       } else if (searchType === "title") {
//         url = `http://localhost:5186/api/books/search/title/${searchTerm}`; // Title search
//       } else if (searchType === "author") {
//         url = `http://localhost:5186/api/books/search/author/${searchTerm}`; // Author search
//       }
//
//       const response = await fetch(url);
//
//       if (!response.ok) {
//         setErrorMessage("No results found.");
//         setSearchResults([]);
//         return;
//       }
//
//       const data = await response.json();
//       console.log("Search Results:", data); // Debugging output
//       setSearchResults(data); // Set the search results in state
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("An error occurred while searching.");
//     }
//   };
//
//   return (
//     <div className="search-container max-w-6xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Search for Books</h1>
//
//       {/* Search Form */}
//       <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4">
//         {/* Search by Dropdown */}
//         <select
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//           className="p-2 border rounded-md w-64 text-lg"
//         >
//           <option value="isbn">ISBN</option>
//           <option value="title">Title</option>
//           <option value="author">Author</option>
//         </select>
//
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder={`Search by ${searchType}`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border rounded-md w-64 text-lg"
//           required
//         />
//
//         {/* Search Button */}
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-64 hover:bg-blue-600 transition">
//           Search
//         </button>
//       </form>
//
//       {/* Error Message */}
//       {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
//
//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-semibold mb-4">Results</h2>
//           {searchResults.map((book, index) => (
//             <div key={index} className="mb-4 p-4 bg-gray-800 text-white rounded-md">
//               <h3 className="text-xl font-bold">{book.title}</h3>
//               <p><strong>Author:</strong> {book.author}</p>
//               {/* Add any other book details you want to display */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default SearchPage;
//
