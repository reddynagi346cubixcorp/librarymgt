const { db } = require("../../firebase");

const deleteBooks = async (req, res) => {
  try {
    const { bookId } = req.params;

    const bookRef = db.collection("books").doc(bookId);

    const bookDoc = await bookRef.get();

    if (!bookDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await bookRef.update({
      deleted: true,
      deletedAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      deletedAt: new Date(),
    });
  } catch (error) {
    console.error("Error deleting book:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};

module.exports = { deleteBooks };
