require("dotenv").config();
const express = require("express");
const Comment = require("../models/commentModel");
const router = express.Router();

const deletePhrase = process.env.deletePhrase;
console.log(deletePhrase);
//get all the comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment." });
  }
});

//post a new comment
router.post("/", async (req, res) => {
  const { commentText } = req.body;

  //if comment text does not exist
  if (!commentText) {
    return res.status(400).json({ message: "A comment is required" });
  }

  console.log("accessing the env var:", process.env.DELETE_PHRASE);
  if (commentText === process.env.DELETE_PHRASE) {
    try {
      await Comment.deleteMany({});
      res.status(200).json({ message: "Successfully deleted all comments" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error deleting all comments: ", error });
    }
  }

  try {
    console.log("Made it here");
    const newComment = new Comment({ commentText });
    console.log("New comment object that was passed: ", newComment);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error saving comment." });
  }
});

module.exports = router;
