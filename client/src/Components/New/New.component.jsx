import React from "react";
import { Link } from "react-router-dom";
import "./New.styles.scss";
import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import axios from "axios";
import SimpleRating from "../Rating/SimpleRating.component";
import { Pie, Doughnut, HorizontalBar, Bar } from "react-chartjs-2";

class New extends React.Component {
  constructor() {
    super();
    this.state = {
      link: null,
      sumData: [100],
      rating: null,
      noVotes: null,
      marketCapName: ["Large", "Mid", "Small"],
      marketCapData: [100, 95, 91],
      sectorData: [100],
      sectorShow: [""],
      commentList: [{ comment: "test" }, { comment: "test2" }],
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
          marketCapData: res.marketPercent,
          sectorShow: res.sector,
          sectorData: res.sectorPercent,
          rating:
            res.rating.length > 0
              ? res.rating.reduce((tot, nex) => tot + nex, 0) /
                res.rating.length
              : 0,
          noVotes: res.rating.length,
        })
      );

    await axios
      .get("/comments/" + id)
      .then((res) => res.data)
      .then((res) => this.setState({ commentList2: res }));

    this.setState({ link: id });
  }

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

          data: this.state.sumData,
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

          <Carousel>
            <Carousel.Item>
              <div id="item" className="fixthis">
                <Pie
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: "MY PORTFOLIO",
                      fontSize: 24,
                      fontColor: "black",
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
                      labels: {
                        boxWidth: 20,
                        padding: 5,
                      },
                    },
                  }}
                />
              </div>{" "}
            </Carousel.Item>
            <Carousel.Item>
              <div id="item" className="fixthis">
                <Doughnut
                  data={sectorState}
                  options={{
                    title: {
                      display: true,
                      text: "GICS Sector",
                      fontSize: 24,
                      fontColor: "black",
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
                      display: true,
                      position: "bottom",
                      labels: {
                        boxWidth: 20,
                        padding: 5,
                        filter: function (legendItem, data) {
                          return legendItem.index < 12;
                        },
                      },
                    },
                  }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div id="item" className="fixthis">
                {" "}
                <Bar
                  data={capState}
                  options={{
                    title: {
                      display: true,
                      text: "Market Capitalization",
                      fontSize: 24,
                      fontColor: "black",
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
            </Carousel.Item>
          </Carousel>

          <div className="searchandsend">
            {" "}
            <div key={this.state.rating} className="stockSearch" id="item2">
              <SimpleRating
                size="large"
                rating={this.state.rating}
                link={this.state.link}
              />
            </div>
            <div className="textstyles" id="item3">
              VOTES : {this.state.noVotes}
            </div>
            {this.state.commentList.map((list) => (
              <div>{list.comment}</div>
            ))}
            {this.state.commentList2 && typeof this.state.commentList2}
            <div className="stockSearch" id="item4">
              <Link className="Linkto" to="/">
                <button className="makeOwn">Make your own</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default New;
