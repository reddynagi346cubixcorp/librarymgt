const { db } = require("../../firebase");

const getBooks = async (req, res) => {
  try {
    const { author, genre, year } = req.query;
    let query = db.collection("books");
    if (author) {
      query = query.where("author", "==", author);
    }
    if (genre) {
      query = query.where("genre", "==", genre);
    }
    if (year) {
      query = query.where("year", "==", parseInt(year));
    }
    const booksSnapshot = await query.get();
    const books = booksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: books.length,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error("Failed to fetch books", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getBooks };
