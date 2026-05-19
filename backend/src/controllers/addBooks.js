const { db } = require("../../firebase");

const { v4: uuidv4 } = require("uuid");

const { bookSchema } = require("../schemas/books");

const addBooks = async (req, res) => {
  try {
    const validatedData = bookSchema.parse(req.body);
    const bookId = uuidv4();
    const newBook = {
      id: bookId,
      ...validatedData,
      createdAt: new Date(),
    };
    const docRef = await db.collection("books").doc(bookId).set(newBook);

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      id: bookId,
      data: validatedData,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors: formattedErrors,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { addBooks };
