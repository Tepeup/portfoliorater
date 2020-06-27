const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const path = require("path");

//Connect Databae
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// Define Routes

const stockRouter = require("./routes/api/stocks");
app.use("/stocks", stockRouter);
app.use("/comments", require("./routes/api/comments"));
app.use(express.json());

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
