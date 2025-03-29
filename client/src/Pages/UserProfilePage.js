import React, { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"; // Heroicon 3-dots icon

const UserProfilePage = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const [editingBook, setEditingBook] = useState(null);


  useEffect(() => {
    const fetchUserBooks = async () => {
      try {

        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await fetch(`${apiUrl}/api/books/my-books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchUserBooks();
  }, [token]);

  // ✅ Delete a book
  const handleDelete = async (id) => {
    try {

      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete book.");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };


  return (
    <div className="max-w-6xl mx-auto pt-32 px-6">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        📚 My Book List
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="relative bg-[#1e1e2f] rounded-lg shadow-md overflow-hidden text-white group"
          >
            {/* 3-dot delete icon */}
            <div className="absolute top-2 right-2 z-10">
              <button
                className="p-1 bg-gray-700 rounded-full hover:bg-blue-500 transition"
                onClick={() => setEditingBook(book)}
                title="Edit"
              >
                <EllipsisVerticalIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            <img
              src={book.image || "https://via.placeholder.com/300x400?text=No+Image"}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-sm text-gray-400">Author: {book.author}</p>
              <p className="text-sm text-gray-400">Status: {book.status}</p>
              <p className="text-sm text-green-400 font-semibold">
                {book.currentPage}/{book.totalPages}
              </p>
            </div>
          </div>
        ))}
      </div>

    {editingBook && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-[#1e1e2f] p-6 rounded-lg max-w-lg w-full relative text-white">
          <button
            onClick={() => setEditingBook(null)}
            className="absolute top-2 right-2 text-white text-xl"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-4">Edit Book</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const status = e.target.status.value;
              const currentPage = Number(e.target.currentPage.value);
              const totalPages = editingBook.totalPages;

              if (currentPage < 0) {
                alert("Current page cannot be negative.");
                return;
              }

              if (totalPages > 0 && currentPage > totalPages) {
                alert(`You can't go beyond the total page count (${totalPages}).`);
                return;
              }
              const updated = {
                ...editingBook,
                status: e.target.status.value,
                currentPage: Number(e.target.currentPage.value),
              };

              try {

                const apiUrl = process.env.REACT_APP_API_URL;
                const res = await fetch(`${apiUrl}/api/books/${editingBook.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(updated),
                });

                if (res.ok) {
                  const updatedList = books.map((b) =>
                    b.id === editingBook.id ? updated : b
                  );
                  setBooks(updatedList);
                  setEditingBook(null);
                } else {
                  alert("Update failed");
                }
              } catch (err) {
                console.error("Update error:", err);
              }
            }}
          >
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block mb-1">Status</label>
              <select name="status" defaultValue={editingBook.status} className="w-full p-2 rounded text-black">
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Finished</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Current Page</label>
              <input
                type="number"
                name="currentPage"
                defaultValue={editingBook.currentPage}
                className="w-full p-2 rounded text-black"
              />
            </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this book?")) {
                  handleDelete(editingBook.id);
                  setEditingBook(null);
                }
              }}
            >
              Delete
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                onClick={() => setEditingBook(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Save
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>    
    )}
    </div>
  );
};

export default UserProfilePage;


