const express = require("express");
let Stock = require("../../models/Stocks");
const router = express.Router();

//@route GET api/stocks
router.route("/").get((req, res) => {
  Stock.find()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const stock = req.body.stock;
  const percent = req.body.percent;
  const marketPercent = req.body.marketPercent;
  const sector = req.body.sector;
  const sectorPercent = req.body.sectorPercent;
  const newStock = new Stock({
    stock,
    percent,
    marketPercent,
    sector,
    sectorPercent,
  });

  newStock
    .save()
    .then((e) => res.send(e._id))
    .catch((err) => res.status(400).json("Error: 400 " + err));
});

router.route("/update/:id").post((req, res) => {
  Stock.findById(req.params.id).then((stocks) => {
    req.body.percent = req.body.percent;
    req.body.stock = req.body.stock;
    req.body.marketPercent = req.body.marketPercent;
    req.body.sector = req.body.sector;
    req.body.sectorPercent = req.body.sectorPercent;
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

router.route("/sort").get((req, res) => {
  Stock.find()
    .sort({ createdAt: -1 })
    .then((stock) => res.json(stock))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
