const express = require("express");
let Comment = require("../../models/Comments");
const router = express.Router();

router.route("/comments").get((req, res) => {
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

  newComment.save().catch((err) => res.status(400).json("Error: 400 " + err));
});

// router.route("/comment").get((req, res) => {
//   Comment.findById(req.params.id)
//     .then((comments) => res.json(comments))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
