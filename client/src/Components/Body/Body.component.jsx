import React from "react";
import { Link } from "react-router-dom";
import "./Body.styles.scss";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import SearchBox from "../Searchbox/Searchbox.component";

import axios from "axios";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Carousel from "react-bootstrap/Carousel";

import firebase from "../firebase/firebase.utils";
import CarouselChart from "../Carousel/Charts.component";
import tickerSymbols from "../../Assets/tickers.json";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicker: null,
      myTicker: null,
      reset: false,
      stockList: {},
      myList: [],
      myIndustryList: [],
      myMarketList: [],
      industryList: {},
      marketCapList: {},
      sumData: [100],
      nameData: [""],
      myShares: null,
      stockIndustry: null,
      techData: [],
      techName: [],
      link: null,
      showShare: true,
      marketCapName: ["Large", "Mid", "Small"],
      marketCapData: [100, 90, 80],
      sectorName: [
        "Energy",
        "Materials",
        "Industrials",
        "Consumer Discretionary",
        "Consumer Staples",
        "Health Care",
        "Financials",
        "Information Technology",
        "Communication Services",
        "Utilities",
        "Real Estate",
      ],
      stockColors: [
        "#9b9b9b",
        "#1652f0",
        "#e6194b",
        "#3cb44b",
        "#ffd8b1",
        "#808080",
        "#f58231",
        "#911eb4",
        "#ffe119",
        "#e6beff",
        "#9a6324",
        "#fffac8",
        "#800000",
        "#aaffc3",
        "#808000",
        "#bcf60c",
        "#fabebe",
        "#008080",
      ],
      sectorData: [100],
      sectorShow: [
        "",
        // "Energy",
        // "Materials",
        // "Industrials",
        // "Cons. Discretionary",
        // "Cons. Staples",
        // "Health Care",
        // "Financials",
        // "Technology",
        // "Comm. Services",
        // "Utilities",
        // "Real Estate",
      ],
      sideBar: true,
    };
  }

  onSubmit = async (e) => {
    const SharedStocks = {
      stock: this.state.nameData,
      percent: this.state.sumData,
      marketPercent: this.state.marketCapData,
      sector: this.state.sectorShow,
      sectorPercent: this.state.sectorData,
      rating: [0],
    };

    if (this.state.reset) {
      await axios
        .post("/stocks/add", SharedStocks)
        .then((res) => this.setState({ link: res.data, showShare: false }));
    }

    this.props.currentUser &&
      firebase
        .firestore()
        .collection("users")
        .doc(`${this.props.currentUser.id}`)
        .collection("myPortfolios")
        .doc(`${this.state.link}`)
        .set({ id: `${this.state.link}` })
        .catch((error) => {
          alert(`Error`);
        });
  };

  sortMarketCap = (x) => {
    if (x > 10000) {
      return "Large Cap";
    } else if (x > 2000) {
      return "Mid Cap";
    } else {
      return "Small Cap";
    }
  };

  sortIndustrytoSector = (industry) => {
    let ind = industry.trim();
    if (
      [
        `Energy Equipment & Services`,
        `Oil, Gas & Consumable Fuels`,
        "Energy",
      ].indexOf(ind) !== -1
    ) {
      return "Energy";
    } else if (
      [
        `Chemicals`,
        `Construction Materials`,
        `Containers & Packaging`,
        `Metals & Mining`,
        `Paper & Forest Products`,
        "Materials",
      ].indexOf(ind) !== -1
    ) {
      return "Materials";
    } else if (
      [
        `Aerospace & Defense`,
        `Building Products`,
        `Construction & Engineering`,
        `Electrical Equipment`,
        `Industrial Conglomerates`,
        `Machinery`,
        `Trading Companies & Distributors`,
        `Commercial Services & Supplies`,
        `Professional Services`,
        `Air Freight & Logistics`,
        `Airlines`,
        `Marine`,
        `Road & Rail`,
        `Transportation Infrastructure`,
        "Industrials",
      ].indexOf(ind) !== -1
    ) {
      return "Industrials";
    } else if (
      [
        `Auto Components`,
        `Automobiles`,
        `Household Durables`,
        `Leisure Products`,
        `Textiles, Apparel & Luxury Goods`,
        `Hotels, Restaurants & Leisure`,
        `Diversified Consumer Services`,
        `Distributors`,
        `Internet & Direct Marketing Retail`,
        `Multiline Retail`,
        `Specialty Retail`,
        "Consumer Discretionary",
        "Retail",
      ].indexOf(ind) !== -1
    ) {
      return "Consumer Discretionary";
    } else if (
      [
        `Food & Staples Retailing`,
        `Beverages`,
        `Food Products`,
        `Tobacco`,
        `Household Products`,
        `Personal Products`,
        "Consumer Staples",
        "Consumer products",
      ].indexOf(ind) !== -1
    ) {
      return "Consumer Staples";
    } else if (
      [
        `Health Care Equipment & Supplies`,
        `Health Care Providers & Services`,
        `Health Care Technology`,
        `Biotechnology`,
        `Pharmaceuticals`,
        `Life Sciences Tools & Services`,
        "Health Care",
      ].indexOf(ind) !== -1
    ) {
      return "Health Care";
    } else if (
      [
        `Banks`,
        `Thrifts & Mortgage Finance`,
        `Diversified Financial Services`,
        `Consumer Finance`,
        `Capital Markets`,
        `Mortgage Real Estate Investment `,
        `Insurance`,
        "Financials",
        "Banking",
        "Financial Services",
      ].indexOf(ind) !== -1
    ) {
      return "Financials";
    } else if (
      [
        "Technology",
        `IT Services`,
        `Software`,
        `Communications Equipment`,
        `Technology Hardware, Storage & Peripherals`,
        `Electronic Equipment, Instruments & Components`,
        "Semiconductors",
        `Semiconductors & Semiconductor Equipment`,
        "Information Technology",
      ].indexOf(ind) !== -1
    ) {
      return "Information Technology";
    } else if (
      [
        `Diversified Telecommunication Services`,
        `Wireless Telecommunication Services`,
        `Media`,
        `Entertainment`,
        `Interactive Media & Services`,
        "Communication Services",
      ].indexOf(ind) !== -1
    ) {
      return "Communication Services";
      // ...
    } else if (
      [
        `Electric Utilities`,
        `Gas Utilities`,
        `Multi-Utilities`,
        `Water Utilities`,
        `Independent Power and Renewable Electricity Producers`,
        "Utilities",
      ].indexOf(ind) !== -1
    ) {
      return "Utilities";
    } else if (
      [
        `Equity Real Estate Investment Trusts `,
        `Real Estate Management & Development`,
        "Real Estate",
      ].indexOf(ind) !== -1
    ) {
      return "Real Estate";
    } else {
      return "Information Technology";
    }
  };

  newOnes = async (x) => {
    if (this.state.selectedTicker && this.state.myShares) {
      await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${this.state.selectedTicker}&token=bor57j7rh5rbk6e6j1qg`
      )
        .then((e) => e.json())
        .then(
          (e) =>
            e.c &&
            this.setState({
              stockList: this.newStock(
                this.state.selectedTicker,
                e.c,
                this.state.myShares
              ),
            })
        );
      await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${this.state.selectedTicker}&token=bor57j7rh5rbk6e6j1qg`
      )
        .then((e) => e.json())
        .then((e) =>
          e.marketCapitalization
            ? this.setState({
                aAT: e.marketCapitalization,
                marketCap: this.sortMarketCap(e.marketCapitalization),
                stockIndustry: e.finnhubIndustry,
                sortedIndutry: this.sortIndustrytoSector(e.finnhubIndustry),
              })
            : this.setState({
                marketCap: "N/A",
                stockIndustry: "N/A",
                sortedIndutry: this.sortIndustrytoSector("N/A"),
              })
        );

      if (this.state.stockList.name) {
        this.setState((state) => {
          const myList = [...state.myList, state.stockList];
          return {
            myList,
            stockList: "",
            marketCapList: this.newStock(
              this.state.marketCap,
              this.state.stockList.price * this.state.stockList.shares
            ),
            industryList: this.newStock(
              this.state.sortedIndutry,
              this.state.stockList.price * this.state.stockList.shares
            ),
          };
        });

        this.setState((state) => {
          const myMarketList = [...state.myMarketList, state.marketCapList];
          const myIndustryList = [...state.myIndustryList, state.industryList];
          return {
            myMarketList,
            myIndustryList,
            marketCapList: "",
            industryList: "",
          };
        });

        this.setState({
          stockColors: [
            "#1652f0",
            "#e6194b",
            "#3cb44b",
            "#ffd8b1",
            "#808080",
            "#f58231",
            "#911eb4",
            "#ffe119",
            "#e6beff",
            "#9a6324",
            "#fffac8",
            "#800000",
            "#aaffc3",
            "#808000",
            "#bcf60c",
            "#fabebe",
            "#008080",
          ],
        });

        this.setState((state) => {
          const befData = state.myList.map(
            (res) => res.price !== undefined && res.price * res.shares
          );
          const aftData = befData.filter((res) => res !== false);
          const totBalanace = aftData.reduce(
            (tot, cur) => !isNaN(cur) && tot + cur,
            0
          );
          const sumData = aftData.map((res) =>
            Math.round((res / totBalanace) * 100)
          );

          return { sumData };
        });

        this.setState((state) => {
          const befData = state.myList.map(
            (res) => res.name !== undefined && res.name
          );
          const aftData = befData.filter((res) => res !== false);

          const nameData = aftData;
          return { nameData };
        });

        this.setState((state) => {
          let largeBalance = state.myMarketList.reduce(
            (tot, cur) => (cur.name === "Large Cap" ? tot + cur.price : tot),
            0
          );
          let midBalance = state.myMarketList.reduce(
            (tot, cur) => (cur.name === "Mid Cap" ? tot + cur.price : tot),
            0
          );
          let smallBalance = state.myMarketList.reduce(
            (tot, cur) => (cur.name === "Small Cap" ? tot + cur.price : tot),
            0
          );
          let notSummed = [largeBalance, midBalance, smallBalance];
          let summedData = notSummed.reduce((tot, cur) => tot + cur, 0);
          let marketCapData = [
            Math.round((largeBalance / summedData) * 100),
            Math.round((midBalance / summedData) * 100),
            Math.round((smallBalance / summedData) * 100),
          ];

          return { marketCapData };
        });

        this.setState((state) => {
          let enBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Energy" ? tot + cur.price : tot),
            0
          );
          let matBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Materials" ? tot + cur.price : tot),
            0
          );
          let indBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Industrials" ? tot + cur.price : tot),
            0
          );
          let cdBalance = state.myIndustryList.reduce(
            (tot, cur) =>
              cur.name === "Consumer Discretionary" ? tot + cur.price : tot,
            0
          );
          let csBalance = state.myIndustryList.reduce(
            (tot, cur) =>
              cur.name === "Consumer Staples" ? tot + cur.price : tot,
            0
          );
          let hcBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Health Care" ? tot + cur.price : tot),
            0
          );
          let fBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Financials" ? tot + cur.price : tot),
            0
          );
          let itBalance = state.myIndustryList.reduce(
            (tot, cur) =>
              cur.name === "Information Technology" ? tot + cur.price : tot,
            0
          );
          let commBalance = state.myIndustryList.reduce(
            (tot, cur) =>
              cur.name === "Communication Services" ? tot + cur.price : tot,
            0
          );
          let utBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Utilities" ? tot + cur.price : tot),
            0
          );
          let reBalance = state.myIndustryList.reduce(
            (tot, cur) => (cur.name === "Real Estate" ? tot + cur.price : tot),
            0
          );

          let notSummed = [
            enBalance,
            matBalance,
            indBalance,
            cdBalance,
            csBalance,
            hcBalance,
            fBalance,
            itBalance,
            commBalance,
            utBalance,
            reBalance,
          ];
          let summedData = notSummed.reduce((tot, cur) => tot + cur, 0);
          let preSector = notSummed.map(
            (x) => summedData !== 0 && Math.round((x / summedData) * 100)
          );
          let sectorData = preSector.filter((x) => Boolean(x));
          let indexData = preSector.map((x, index) => x !== 0 && index + 1);
          let filterSector = indexData.filter((x) => Boolean(x));
          let sectorShow = filterSector.map((x) => {
            if (x) {
              switch (x) {
                case 1:
                  return "Energy";
                case 2:
                  return "Materials";
                case 3:
                  return "Industrials";
                case 4:
                  return "Cons. Discretionary";
                case 5:
                  return "Cons. Staples";
                case 6:
                  return "Health Care";
                case 7:
                  return "Financials";
                case 8:
                  return "Technology";
                case 9:
                  return "Comm. Services";
                case 10:
                  return "Utilities";
                case 11:
                  return "Real Estate";
                default:
                  return "Technology";
              }
            }
          });

          return {
            sectorData,
            indexData,
            sectorShow,
            filterSector,
            preSector,
            summedData,
            notSummed,
          };
        });
      }

      this.cancelCourse();
    }
  };

  handleTickerChange = async (e) => {
    if (e.target.value === "") {
      this.setState({ myTicker: null });
    } else {
      e.target.value = e.target.value.toUpperCase();

      if (e.target.value === "" || e.target.value === null) {
      } else {
        this.setState({ myTicker: e.target.value });
      }
    }
  };

  // newOneEnter = (e) => {
  //   if (e.key === "Enter") {
  //     this.newOnes();
  //   }
  // };

  changeSides = () => {
    this.setState({ sideBar: !this.state.sideBar });
  };

  handleShareChange = async (e) => {
    this.setState({ myShares: parseInt(e.target.value) });
  };
  cancelCourse = () => {
    this.setState({
      myTicker: "",
      selectedTicker: "",
      myShares: null,
      reset: true,
    });
  };

  newStock(name, price, shares) {
    return {
      name: name,
      price: price,
      shares: shares,

      // ...other properties
    };
  }
  resetForm = () => {
    this.setState({
      myTicker: "",
      reset: false,
      stockList: {},
      myList: [],
      selectedTicker: null,
      myIndustryList: [],
      myMarketList: [],
      sumData: [100],
      nameData: [""],
      myShares: null,
      showShare: true,
      sectorName: ["GICS Sector"],
      stockIndustry: null,
      sectorData: [100],
      sectorShow: [
        "",
        // "Energy",
        // "Materials",
        // "Industrials",
        // "Cons. Discretionary",
        // "Cons. Staples",
        // "Health Care",
        // "Financials",
        // "Technology",
        // "Comm. Services",
        // "Utilities",
        // "Real Estate",
      ],
      marketCapName: ["Large", "Mid", "Small"],
      marketCapData: [100, 50, 10],
    });
  };

  render() {
    return (
      <div className="dashboard-content">
        <div className="carousel-content">
          <CarouselChart
            stockLabels={this.state.nameData}
            stockData={this.state.sumData}
            capLabels={this.state.marketCapName}
            capData={this.state.marketCapData}
            sectorLabels={this.state.sectorShow}
            sectorData={this.state.sectorData}
            stockColors={this.state.stockColors}
          />

          <div className="submit-content">
            <div className="submit-form">
              {/* <form id="stockForm" onKeyDown={this.newOneEnter}> */}
              <form id="stockForm">
                <div
                  className={`${
                    this.state.selectedTicker ? null : "whiteout"
                  } selected`}
                >
                  Selected: {this.state.selectedTicker}
                </div>
                <SearchBox
                  placeHolder={"Search New Company"}
                  handleChange={this.handleTickerChange}
                  boxType={"text"}
                  value={this.state.myTicker}
                />

                <div>
                  {this.state.myTicker == ""
                    ? null
                    : tickerSymbols
                        .filter(
                          (data) =>
                            data["Symbol"].includes(this.state.myTicker) ||
                            data["Name"].includes(this.state.myTicker)
                        )
                        .slice(0, 10)
                        .map((res) => {
                          return (
                            <div
                              className="search-result"
                              onClick={() => {
                                this.setState({
                                  selectedTicker: res.Symbol,
                                  myTicker: "",
                                });
                              }}
                            >
                              {`${res.Name} (${res.Symbol})`}
                            </div>
                          );
                        })}
                </div>

                {this.state.selectedTicker ? (
                  <SearchBox
                    placeHolder={`No. of ${this.state.selectedTicker} Shares`}
                    value={this.state.myShares}
                    boxType={"number"}
                    handleChange={this.handleShareChange}
                  />
                ) : null}
              </form>

              <div className="buttonBox">
                {this.state.myShares ? (
                  <div className="stockSearch" id="item5">
                    <button onClick={this.newOnes} className="add-stock">
                      {`Add ${this.state.myShares} shares of ${this.state.selectedTicker}`}
                    </button>
                  </div>
                ) : (
                  <button className="inactive">Add Stock</button>
                )}
                {/* <Fab color="primary" aria-label="add">
                  <AddIcon onClick={this.newOnes} />
                </Fab> */}

                {this.state.stockIndustry ? (
                  this.state.showShare ? (
                    <div className="stockSearch" id="item5">
                      <button onClick={this.onSubmit}>Submit Portfolio</button>
                    </div>
                  ) : (
                    <Link
                      className="stockSearch"
                      to={`/chart/${this.state.link}`}
                      id="item5"
                    >
                      {" "}
                      <div className="stockSearch">
                        <button className="goto">Go To Submission</button>
                      </div>
                    </Link>
                  )
                ) : null}
                {this.state.stockIndustry ? (
                  <div className="stockSearch">
                    <button className="resetButton" onClick={this.resetForm}>
                      Reset Portfolio
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Body;
