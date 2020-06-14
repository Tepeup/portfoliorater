const express = require("express");
let Stock = require("../../models/Stocks");
const router = express.Router();

//@route GET api/stocks
router.route("/").get((req, res) => {
  Stock.find()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json("Error: " + err));
});
// router.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("User Route");
// });
router.route("/add").post((req, res) => {
  const stock = req.body.stock;
  const percent = req.body.percent;
  console.log(req.body);
  const newStock = new Stock({ stock, percent });

  newStock
    .save()
    .then((e) => res.send(e._id))
    .catch((err) => res.status(400).json("Error: 400 " + err));
});
router.route("/update/:id").post((req, res) => {
  Stock.findById(req.params.id).then((stocks) => {
    req.body.percent = req.body.percent;
    req.body.stock = req.body.stock;
    stocks.rating = [...req.body.rating, ...stocks.rating];

    stocks
      .save()
      .then((e) => res.send(e))
      .catch((err) => res.status(400).json("Error" + err));
  });
});

router.route("/:id").get((req, res) => {
  Stock.findById(req.params.id)
    .then((stock) => res.json(stock))
    .catch((err) => res.status(400).json("Error: " + err));
});
// router.post("/", async (req, res) => {
//   const newStocks = {
//     tickers: req.body.tickers,
//     percents: req.body.percents,
//     ratings: req.body.rating,
//   };

//   res.json(newStocks);
// });

module.exports = router;
