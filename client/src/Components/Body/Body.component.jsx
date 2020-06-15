import React from "react";
import { Link } from "react-router-dom";
import "./Body.styles.scss";
import { Pie } from "react-chartjs-2";
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
      sumData: [100],
      nameData: ["STOCKS"],
      myShares: "",
      stockIndustry: null,
      techData: [],
      techName: [],
      link: null,
      showShare: true,
    };
  }

  onSubmit = async (e) => {
    const SharedStocks = {
      stock: this.state.nameData,
      percent: this.state.sumData,
      rating: [0],
    };

    if (this.state.reset) {
      await axios
        .post("/stocks/add", SharedStocks)
        .then((res) => this.setState({ link: res.data, showShare: false }));
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
                this.state.myShares,
                this.state.stockIndustry
              ),
            })
        );
      if (this.state.stockList.name) {
        this.setState((state) => {
          const myList = [...state.myList, state.stockList];
          return {
            myList,
            stockList: "",
            stockIndustry: null,
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
      industry: industry,
      // ...other properties
    };
  }
  resetForm = () => {
    this.setState({
      myTicker: "",
      reset: false,
      stockList: {},
      myList: [],
      sumData: [100],
      nameData: ["STOCKS"],
      myShares: "",
      showShare: true,
    });
  };

  render() {
    const state = {
      labels: this.state.nameData,
      datasets: [
        {
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
            "#1171ba",
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

          data: this.state.sumData,
        },
      ],
    };

    return (
      <div className="Body">
        <Link className="Link" to="/">
          <div className="Logo">
            <Logo height={60} width={80} />
          </div>
        </Link>

        <div className="centerChart">
          <div>
            <Pie
              data={state}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animateRotate: true,

                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>
          <div className="stockSearch">
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
          <div className="stockSearch">
            <button onClick={this.newOnes}>Add</button>
          </div>
          <div className="stockSearch">
            <button onClick={this.resetForm}>Reset</button>
          </div>
          {this.state.showShare ? (
            <div className="stockSearch">
              <button onClick={this.onSubmit}>Share</button>
            </div>
          ) : (
            <Link className="stockSearch" to={`/chart/${this.state.link}`}>
              {" "}
              <div className="stockSearch">
                <button>Go To</button>
              </div>
            </Link>
          )}

          {this.state.link && !this.state.showShare && (
            <div className="stockSearch">
              <input
                className="buttonlike"
                defaultValue={`${window.location.href}chart/${this.state.link}`}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Body;
