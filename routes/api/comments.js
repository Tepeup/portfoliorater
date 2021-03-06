const express = require("express");
let Comment = require("../../models/Comments");
const router = express.Router();

router.route("/").get((req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addcomment").post((req, res) => {
  const comment = req.body.comment;
  const parent = req.body.parent;
  const newComment = new Comment({
    comment,
    parent,
  });

  newComment
    .save()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("Error: 400 " + err));
});

router.route("/:id").get((req, res) => {
  Comment.find({ parent: req.params.id })
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
