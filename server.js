require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const commentRoutes = require("/Users/sean/Desktop/Portfolio Website/Portfolio-Website/backend/routes/commentRoutes.js");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

console.log("Special Delete Phrase: " , process.env.DELETE_PHRASE);

mongoose.connect("mongodb://127.0.0.1:27017/commentsDB");

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
