const express = require("express");
const router = express.Router();
const { addBooks } = require("../controllers/addBooks");
const { getBooks } = require("../controllers/getBooks");
const { updateBooks } = require("../controllers/updateBooks");
const { deleteBooks } = require("../controllers/deleteBooks");

router.post("/", addBooks);
router.get("/", getBooks);
router.put("/:bookId", updateBooks);
router.delete("/:bookId", deleteBooks);

module.exports = router;
