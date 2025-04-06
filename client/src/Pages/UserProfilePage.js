import React, { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline"; // optional icon

const UserProfilePage = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const token = localStorage.getItem("token");

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

      {/* Filter buttons / tabs */}
      <div className="flex gap-4 mb-6 text-white">
        <button
          onClick={() => setStatusFilter("All")}
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "All" ? "bg-[#2ac9ff]" : "bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter("Reading")}
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "Reading" ? "bg-[#2ac9ff]" : "bg-gray-700"
          }`}
        >
          Reading
        </button>
        <button
          onClick={() => setStatusFilter("Planning")}
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "Planning" ? "bg-[#2ac9ff]" : "bg-gray-700"
          }`}
        >
          Planning
        </button>
        <button
          onClick={() => setStatusFilter("Completed")}
          className={`px-4 py-2 rounded-lg ${
            statusFilter === "Completed" ? "bg-[#2ac9ff]" : "bg-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books
          .filter((book) =>
            statusFilter === "All" ? true : book.status === statusFilter
          )
          .map((book) => (
            <div
              key={book.id}
              className="relative bg-[#1e1e2f] rounded-lg shadow-md overflow-hidden text-white group"
            >
              <div className="absolute top-2 right-2 z-10">
                <button
                  className="p-1 bg-gray-700 rounded-full hover:bg-green-400 transition"
                  onClick={() => setEditingBook(book)}
                  title="Edit"
                >
                  <EllipsisVerticalIcon className="w-5 h-5 text-white" />
                </button>
              </div>

              <img
                src={
                  book.image || "https://via.placeholder.com/300x400?text=No+Image"
                }
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

      {/* Edit modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#151f2e] p-6 rounded-lg max-w-5xl w-full relative text-white">
            <button
              onClick={() => setEditingBook(null)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Book : "{editingBook.title}"</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const status = e.target.status.value;
                let currentPage = Number(e.target.currentPage.value);
                const totalPages = editingBook.totalPages;

                if (currentPage < 0) {
                  alert("Current page cannot be negative.");
                  return;
                }

                if (status === "Completed"){
                  currentPage = totalPages;
                }

                if (totalPages > 0 && currentPage > totalPages) {
                  alert(`You can't go beyond the total page count (${totalPages}).`);
                  return;
                }

                const updated = {
                  ...editingBook,
                  status,
                  currentPage,
                  notes: editingBook.notes,
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
              <div className="mb-4">
                <label className="block mb-1 text-[#798ba1]">Status</label>
                <select
                  name="status"
                  defaultValue={editingBook.status}
                  className="w-full p-2 rounded font-bold text-[#a6b3c1] bg-[#0b1622]"
                >
                  <option>Planning</option>
                  <option>Reading</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-[#798ba1]">Current Page</label>
                <input
                  type="number"
                  name="currentPage"
                  defaultValue={editingBook.currentPage}
                  className="w-full p-2 rounded  font-bold text-[#a6b3c1] bg-[#0b1622] focus:outline-none focus:ring-0"
                />
              </div>
              
              {/* Add Start Date */}
              <div className="flex flex-col text-sm text-[#798ba1] mb-4 w-full">
                <label className="mb-2">Start Date</label>
                <div className="relative">
                  <DatePicker
                    selected={editingBook.startDate ? new Date(editingBook.startDate) : null}
                    onChange={(date) =>
                      setEditingBook({ ...editingBook, startDate: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="w-full bg-[#0b1622] text-[#a6b3c1] font-bold rounded-lg p-3 pl-10 focus:outline-none focus:ring-0"
                    placeholderText="Select start date"
                  />
                  <CalendarDaysIcon className="w-5 h-5 text-[#798ba1] absolute left-3 top-3" />
                </div>
              </div>
              
              {/* Add Finished Date */}
              <div className="flex flex-col text-sm text-[#798ba1] mb-4 w-full">
                <label className="mb-2">Finish Date</label>
                <div className="relative">
                  <DatePicker
                    selected={editingBook.completedDate ? new Date(editingBook.completedDate) : null}
                    onChange={(date) =>
                      setEditingBook({ ...editingBook, completedDate: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="w-full bg-[#0b1622] text-[#a6b3c1] font-bold rounded-lg p-3 pl-10 focus:outline-none focus:ring-0"
                    placeholderText="Select finish date"
                  />
                  <CalendarDaysIcon className="w-5 h-5 text-[#798ba1] absolute left-3 top-3" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[#798ba1] mb-2 block">Notes</label>
                  <textarea 
                    className="font-bold text-[#a6b3c1] bg-[#0b1622] w-full rounded-lg p-3 focus:outline-none focus:ring-0"
                    value={editingBook.notes}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, notes: e.target.value})
                      }
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
                    className="px-4 py-2 bg-[#2ac9ff] rounded hover:bg-[#00b3f0]"
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


