
export const addBookToUserProfile = async (book, token, navigate) => {
  if (!token) {
    alert("You need to be logged in to add a book.");
    return;
  }


const payload = {
  title: book.title || "Untitled",
  author: book.author || "Unknown",
  isbn: book.isbn || book.isbn13 || "Unknown",
  status: "Not Started",
  currentPage: 0,
  totalPages: book.pages || 0,
  isCompleted: false
};

  try {
    const res = await fetch("http://localhost:5186/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("📚 Book added to your profile!");
      if (navigate) navigate("/profile"); // optional: only navigate if passed in
    } else {
      const err = await res.json();
      console.error("Error adding book:", err);
      alert("Failed to add book.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
};
