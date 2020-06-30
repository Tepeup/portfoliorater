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
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/add", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ])
  .post(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "Email is already in use" }] });
      }

      let setUser = new User({
        username,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      setUser.password = await bcrypt.hash(password, salt);
      setUser.save().then((e) => {
        jwt.sign(
          {
            user: {
              id: e._id,
            },
          },
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json(token);
          }
        );
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
  });
module.exports = router;
