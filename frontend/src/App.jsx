import { useState } from "react";
import axios from "axios";
import { FaSearch, FaPlus } from "react-icons/fa";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisherDate: "",
    year: "",
    genre: "",
    summary: "",
  });
  const [editBookId, setEditBookId] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/books");

      setBooks(response.data.data);
      toast.success("Books fetched successfully!");
    } catch (error) {
      console.error("Failed to fetch books", error);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const searchByAuthor = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books?author=${author}`,
      );
      setBooks(response.data.data);
      toast.success("Books fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const searchByGenre = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books?genre=${genre}`,
      );

      setBooks(response.data.data);
      toast.success("Books fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const createBook = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/books", formData);
      toast.success("Book created successfully");

      setOpenModal(false);

      setFormData({
        title: "",
        author: "",
        publisherDate: "",
        year: "",
        genre: "",
        summary: "",
      });

      fetchBooks();
    } catch (error) {
      console.error("Failed to create book", error);
      toast.error("Failed to create book");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      publisherDate: book.publisherDate,
      year: book.year,
      genre: book.genre,
      summary: book.summary,
    });

    setEditBookId(book.id);

    setOpenModal(true);
  };

  const updateBook = async () => {
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:8080/api/books/${editBookId}`,
        formData,
      );

      toast.success("Book updated successfully");

      setOpenModal(false);

      setEditBookId(null);

      setFormData({
        title: "",
        author: "",
        publisherDate: "",
        year: "",
        genre: "",
        summary: "",
      });

      await fetchBooks();
    } catch (error) {
      console.error("Failed to update book", error);

      toast.error("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (book) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}"?`,
    );

    if (!confirmDelete) return;

    setLoading(true);

    try {
      await axios.delete(`http://localhost:8080/api/books/${book.id}`);

      toast.success("Book deleted successfully");

      await fetchBooks();
    } catch (error) {
      console.error("Failed to delete book", error);

      toast.error("Failed to delete book");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "15px",
          },

          success: {
            style: {
              background: "#16a34a",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#16a34a",
            },
          },

          error: {
            style: {
              background: "#dc2626",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
        }}
      />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Books Management</h1>
          <div className="flex gap-6">
            <button
              onClick={fetchBooks}
              className="bg-gray-500 hover:bg-gray-800 text-white px-5 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              All Books
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              <FaPlus className="inline-block mr-2" />
              Create Book
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search by author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={searchByAuthor}
                className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl transition cursor-pointer"
              >
                <FaSearch className="inline-block mr-2" />
                Search
              </button>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search by genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              />

              <button
                onClick={searchByGenre}
                className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl transition cursor-pointer"
              >
                <FaSearch className="inline-block mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center py-10">
            <h2 className="text-2xl font-semibold text-blue-600">Loading...</h2>
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-md p-6  hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                {/* Title */}
                {/* <h2 className="text-2xl font-bold text-blue-600 mb-3">
                  {book.title}
                </h2> */}

                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-blue-600 mb-3">
                    {book.title}
                  </h2>
                  <div className="flex justify-between gap-4">
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-auto hover:text-blue-600 text-xl cursor-pointer"
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      className="text-auto hover:text-red-600 text-xl cursor-pointer"
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </div>

                {/* Author */}
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>

                {/* Genre */}
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Genre:</span> {book.genre}
                </p>

                {/* Year */}
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Year:</span> {book.year}
                </p>

                {/* Summary */}
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {book.summary}
                </p>
              </div>
            ))}
          </div>
        )}
        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
              <h2 className="text-3xl font-bold mb-6">
                {editBookId ? "Update Book" : "Create Book"}
              </h2>

              <div className="grid gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={formData.author}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <input
                  type="date"
                  name="publisherDate"
                  value={formData.publisherDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <textarea
                  name="summary"
                  placeholder="Summary"
                  rows="4"
                  value={formData.summary}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-5 py-3 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={editBookId ? updateBook : createBook}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-5 py-3 rounded-xl"
                >
                  {editBookId ? "Update Book" : "Submit Book"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
