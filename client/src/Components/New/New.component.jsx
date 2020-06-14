import React from "react";
import { Link } from "react-router-dom";
import "./New.styles.scss";
import { Pie } from "react-chartjs-2";
import SearchBox from "../Searchbox/Searchbox.component";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import axios from "axios";
import SimpleRating from "../Rating/SimpleRating.component";

class New extends React.Component {
  constructor() {
    super();
    this.state = {
      link: null,
      sumData: [100],
      rating: null,
      noVotes: null,
    };
  }

  async componentDidMount() {
    const parts = window.location.pathname.split("/");
    const id = parts.pop() || parts.pop(); // handle potential trailing slash

    await axios
      .get("/stocks/" + id)
      .then((res) => res.data)
      .then((res) =>
        this.setState({
          sumData: res.percent,
          nameData: res.stock,
          rating:
            res.rating.length > 0
              ? res.rating.reduce((tot, nex) => tot + nex, 0) /
                res.rating.length
              : 0,
          noVotes: res.rating.length,
        })
      );

    this.setState({ link: id });
  }

  onSubmit = (e) => {
    const SharedStocks = {
      stock: this.state.nameData,
      percent: this.state.sumData,
    };
  };

  getURL = () => {
    var parts = window.location.pathname.split("/");
    var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
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
          {" "}
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
          <div key={this.state.rating} className="stockSearch">
            <SimpleRating rating={this.state.rating} link={this.state.link} />
          </div>
          <div className="textstyles">VOTES : {this.state.noVotes}</div>
          <div className="stockSearch">
            <button>
              <Link className="Link" to="/">
                Make your own
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default New;
