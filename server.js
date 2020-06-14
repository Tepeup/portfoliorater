const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
//Connect Databae
connectDB();
// init middleware
app.use(express.json({ extended: false }));

app.get(`/`, (req, res) => res.send("API Running"));

// Define Routes

const stockRouter = require("./routes/api/stocks");

app.use("/stocks", stockRouter);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
