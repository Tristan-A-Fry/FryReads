
import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const res = await fetch("http://localhost:5186/api/books/my-books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error loading books:", err);
      }
    };

    if (token) fetchUserBooks();
  }, [token]);

  return (
    <div className="text-black p-6 h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">📚 My Book List</h1>

      {books.length === 0 ? (
        <p className="text-gray-600">You haven’t added any books yet.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="p-4 bg-white shadow rounded-md">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-700">Author: {book.author}</p>
              <p className="text-sm">ISBN: {book.isbn}</p>
              <p className="text-sm">Status: {book.status}</p>
              <p className="text-sm">
                Progress: {book.currentPage} / {book.totalPages} pages
              </p>
              <p className="text-sm">
                Completed: {book.isCompleted ? "✅ Yes" : "❌ No"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfilePage;

