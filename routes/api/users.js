const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
let User = require("../../models/Users");

// Public router

//GEt user test
router.route("/").get((req, res) => {
  Stock.find()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    username,
    email,
    password,
  });

  newUser
    .save()
    .then((e) => res.send(e))
    .catch((err) => res.status(400).json("Error: 400 " + err));
});
module.exports = router;
