import Navbar from "./components/Navbar"; // Adjust path based on your folder structure
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import IsbnPage from "./pages/IsbnPage";
import AuthorBooksPage from "./pages/AuthorBooksPage";
import TitleSearchPage from "./pages/TitleSearchPage";
import UserProfilePage from "./pages/UserProfilePage";
import { AuthProvider } from "./context/AuthContext"; 
import "./global.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/isbn/:isbnNum" element={<IsbnPage />} />
          <Route path="/author/:authorName" element={<AuthorBooksPage />} />
          <Route path="/title/:titleBook" element={<TitleSearchPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
