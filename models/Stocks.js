const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    stock: { type: [String], required: true },
    percent: { type: [Number], required: true },
    marketPercent: { type: [Number], required: true },
    sector: { type: [String], required: true },
    sectorPercent: { type: [Number], required: true },
    rating: { type: [Number], required: false },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
