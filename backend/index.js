require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;
const CORS = require("cors");

app.use(CORS());
app.use(express.json());
const bookRoutes = require("./src/routes/books");
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the iKissAn APP");
});
