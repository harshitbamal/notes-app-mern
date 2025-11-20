import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { "x-auth-token": token },
      });

      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return alert("Fill all fields");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        { headers: { "x-auth-token": token } }
      );

      console.log("Note added:", res.data);
      closeModal();
      loadNotes();
    } catch (err) {
      console.error("Add note error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Failed to add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { "x-auth-token": token },
      });

      loadNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setOpen(true);
  };

  const updateNote = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/notes/${editId}`,
        { title, content },
        { headers: { "x-auth-token": token } }
      );

      closeModal();
      loadNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setTitle("");
    setContent("");
    setEditId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Notes</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            + Add Note
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="text-gray-600 mt-2">{note.content}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => startEdit(note)}
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Note" : "Add Note"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Content"
              className="w-full border p-2 rounded h-28"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={closeModal}
                className="flex-1 border px-3 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={editId ? updateNote : addNote}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
