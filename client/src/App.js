import Navbar from "./components/Navbar"; // Adjust path based on your folder structure
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
// import IsbnPage from "./pages/IsbnPage";
import AuthorBooksPage from "./pages/AuthorBooksPage";
import { AuthProvider } from "./context/AuthContext"; 
import "./global.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/isbn/:isbn" element={<IsbnPage />} /> */}
          <Route path="/author/:authorName" element={<AuthorBooksPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
