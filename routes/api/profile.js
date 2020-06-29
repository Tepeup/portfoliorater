const express = require("express");
const router = express.Router();

// Public router

router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
