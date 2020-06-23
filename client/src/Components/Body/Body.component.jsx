import React from "react";
import { Link } from "react-router-dom";
import "./Body.styles.scss";
import { Pie, Doughnut, HorizontalBar, Bar } from "react-chartjs-2";
import SearchBox from "../Searchbox/Searchbox.component";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import axios from "axios";

class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      myTicker: "",
      reset: false,
      stockList: {},
      myList: [],
      myIndustryList: [],
      myMarketList: [],
      industryList: {},
      marketCapList: {},
      sumData: [100],
      nameData: [],
      myShares: "",
      stockIndustry: null,
      techData: [],
      techName: [],
      link: null,
      showShare: true,
      marketCapName: ["Large", "Mid", "Small"],
      marketCapData: [100, 95, 91],
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
      sectorData: [33, 33, 33],
      sectorShow: [
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
      return "Unkown";
    }
  };

  newOnes = async (x) => {
    if (this.state.myTicker && this.state.myShares) {
      await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${this.state.myTicker}&token=bor57j7rh5rbk6e6j1qg`
      )
        .then((e) => e.json())
        .then(
          (e) =>
            e.c &&
            this.setState({
              stockList: this.newStock(
                this.state.myTicker,
                e.c,
                this.state.myShares
              ),
            })
        );
      await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${this.state.myTicker}&token=bor57j7rh5rbk6e6j1qg`
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
                  return "Consumer Discretionary";
                case 5:
                  return "Consumer Staples";
                case 6:
                  return "Health Care";
                case 7:
                  return "Financials";
                case 8:
                  return "Information Technology";
                case 9:
                  return "Communication Services";
                case 10:
                  return "Utilities";
                case 11:
                  return "Real Estate";
                default:
                  return "Information Technology";
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
        this.setState({ myTicker: e.target.value.trim() });
      }
    }
  };

  newOneEnter = (e) => {
    if (e.key === "Enter") {
      this.newOnes();
    }
  };

  handleShareChange = async (e) => {
    this.setState({ myShares: parseInt(e.target.value) });
  };
  cancelCourse = () => {
    this.setState({
      myTicker: "",
      myShares: "",
      reset: true,
    });
  };

  newStock(name, price, shares, industry) {
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
      myIndustryList: [],
      myMarketList: [],
      sumData: [100],
      nameData: [],
      myShares: "",
      showShare: true,
      sectorName: ["GICS Sector"],
      sectorData: [33, 33, 33],
      sectorShow: ["GICS Sector"],
      marketCapName: ["Large", "Mid", "Small"],
      marketCapData: [100, 95, 91],
    });
  };

  render() {
    const state = {
      labels: this.state.nameData,

      datasets: [
        {
          data: this.state.sumData,
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
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
          legend: {
            display: true,
          },
          options: {
            maintainAspectRatio: false,
          },
        },
      ],
    };
    const capState = {
      labels: this.state.marketCapName,

      datasets: [
        {
          data: this.state.marketCapData,
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
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
          legend: {
            display: true,
          },
          options: {
            maintainAspectRatio: false,
          },
        },
      ],
    };
    const sectorState = {
      labels: this.state.sectorShow,

      datasets: [
        {
          data: this.state.sectorData,
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
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
          legend: {
            display: true,
          },
          options: {
            maintainAspectRatio: false,
          },
        },
      ],
    };
    return (
      <div className="Body">
        <div className="dashboard">
          <div className="navbar">
            <Link className="Link" to="/">
              <div className="Logo">
                <Logo height={36} />
              </div>
            </Link>
          </div>
          <div className="scrollbar">
            <div id="item">
              <Pie
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Stocks",
                    fontSize: 20,
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  animateRotate: true,
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem, data) {
                        let label = data.labels[tooltipItem.index];
                        let value = data.datasets[0].data[tooltipItem.index];
                        return `${label}: ${value}%`;
                      },
                    },
                  },

                  legend: {
                    display: true,
                    position: "bottom",
                  },
                }}
              />
              <span class="tildeleft">{"<"}</span>
              <span class="tilde">{">"}</span>
            </div>
            <div id="item">
              <Doughnut
                data={sectorState}
                options={{
                  title: {
                    display: true,
                    text: "GICS Sector",
                    fontSize: 20,
                  },
                  cutoutPercentage: 70,
                  responsive: true,
                  maintainAspectRatio: false,
                  animateRotate: true,
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem, data) {
                        let label = data.labels[tooltipItem.index];
                        let value = data.datasets[0].data[tooltipItem.index];
                        return `${label}: ${value}%`;
                      },
                    },
                  },

                  legend: {
                    display: false,
                    position: "right",
                  },
                }}
              />
            </div>
            <div id="item">
              {" "}
              <Bar
                data={capState}
                options={{
                  title: {
                    display: true,
                    text: "Market Capitalization",
                    fontSize: 20,
                  },

                  scales: {
                    xAxes: [
                      {
                        display: true,
                        gridLines: { display: false },
                        categoryPercentage: 0.9,
                        barPercentage: 0.9,
                      },
                    ],
                    yAxes: [
                      {
                        display: false,
                        gridLines: { display: false },
                        categoryPercentage: 1.0,
                        barPercentage: 0.8,
                      },
                    ],
                  },
                  borderWidth: 0,
                  responsive: true,
                  maintainAspectRatio: false,
                  animateRotate: true,
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem, data) {
                        let value = data.datasets[0].data[tooltipItem.index];
                        return `${value}%`;
                      },
                    },
                  },

                  legend: {
                    display: false,
                    position: "bottom",
                  },
                }}
              />
            </div>
            <span>.</span>
            {/* <Doughnut
              data={capState}
              options={{
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                animateRotate: true,
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem, data) {
                      let label = data.labels[tooltipItem.index];
                      let value = data.datasets[0].data[tooltipItem.index];
                      return `${label}: ${value}%`;
                    },
                  },
                },

                legend: {
                  display: false,
                  position: "bottom",
                },
              }}
            /> */}
          </div>

          <div className="searchandsend">
            <div id="item2">
              <form id="stockForm" onKeyDown={this.newOneEnter}>
                <SearchBox
                  placeHolder={"Ticker Symbol"}
                  handleChange={this.handleTickerChange}
                  boxType={"text"}
                  value={this.state.myTicker}
                />
                <SearchBox
                  placeHolder={"No. Shares"}
                  value={this.state.myShares}
                  boxType={"number"}
                  handleChange={this.handleShareChange}
                />
              </form>
            </div>
            <div className="stockSearch" id="item3">
              <button onClick={this.newOnes}>Add</button>
            </div>
            <div className="stockSearch" id="item4">
              <button onClick={this.resetForm}>Reset</button>
            </div>
            {this.state.showShare ? (
              <div className="stockSearch" id="item5">
                <button onClick={this.onSubmit}>Share</button>
              </div>
            ) : (
              <Link
                className="stockSearch"
                to={`/chart/${this.state.link}`}
                id="item5"
              >
                {" "}
                <div className="stockSearch">
                  <button className="goto">Go To</button>
                </div>
              </Link>
            )}
          </div>

          {/* 
          {this.state.link && !this.state.showShare && (
            <div className="stockSearch" id="item6">
              <input
                className="buttonlike"
                defaultValue={`${window.location.href}chart/${this.state.link}`}
              />
            </div>
          )} */}
        </div>
      </div>
    );
  }
}
export default Body;
