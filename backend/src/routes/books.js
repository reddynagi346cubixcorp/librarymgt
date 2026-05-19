const express = require("express");
const router = express.Router();
const { addBooks } = require("../controllers/addBooks");
const { getBooks } = require("../controllers/getBooks");

router.post("/", addBooks);
router.get("/", getBooks);

module.exports = router;
