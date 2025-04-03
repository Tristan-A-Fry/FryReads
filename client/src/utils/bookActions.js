
export const addBookToUserProfile = async (book, _, navigate) => {
  const token = localStorage.getItem("token"); // ✅ use directly here
  if (!token) {
    alert("You need to be logged in to add a book.");
    return;
  }


const payload = {
  title: book.title || "Untitled",
  author: book.authors?.[0] || book.author || "Unknown",
  isbn: book.isbn || book.isbn13 || "Unknown",
  image: book.image || book.image_url || null, // ✅ <-- Add this
  status: "Planning",
  currentPage: 0,
  totalPages: book.pages || 0,
  isCompleted: false
};

  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(`${apiUrl}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

  if (res.ok) {
    alert("📚 Book added to your profile!");
    return true; // ✅ success
  } else {
    alert("Failed to add book.");
    return false;
  } 
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
};


