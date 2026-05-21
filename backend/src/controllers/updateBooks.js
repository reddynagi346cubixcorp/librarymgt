const { db } = require("../../firebase");
const { bookSchema } = require("../schemas/books");

const updateBooks = async (req, res) => {
  try {
    const { bookId } = req.params;
    const validateBook = bookSchema.partial().parse(req.body);
    const bookRef = db.collection("books").doc(bookId);
    const bookDoc = await bookRef.get();
    if (!bookDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    await bookRef.update({ ...validateBook, updatedAt: new Date() });
    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      id: bookId,
      data: validateBook,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

module.exports = { updateBooks };
