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
// POST request
// Register user

router.post(
  "/add",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await user.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User already exists" }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
