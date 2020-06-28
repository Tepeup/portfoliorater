import React from "react";
import { Link } from "react-router-dom";
import "./New.styles.scss";
import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import axios from "axios";
import SimpleRating from "../Rating/SimpleRating.component";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import Fab from "@material-ui/core/Fab";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SimpleModal from "../SimpleModal/SimpleModal.component";
import HomeIcon from "@material-ui/icons/Home";

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
      commentList: [
        {
          comment: ["I've been working on the railroad"],
          parent: ["fdfasdfasd34523dfhsgd"],
          _id: "5ef6ce28e873120017cee955",
          createdAt: "2020-06-27T04:42:16.836Z",
          updatedAt: "2020-06-27T04:42:16.836Z",
          __v: 0,
        },
        {
          comment: ["I've been working on the railroad"],
          parent: ["fdfasdfasd34523dfhsgd"],
          _id: "5ef6ce3ee873120017cee956",
          createdAt: "2020-06-27T04:42:38.662Z",
          updatedAt: "2020-06-27T04:42:38.662Z",
          __v: 0,
        },
        {
          comment: ["Testing"],
          parent: ["fdfasdfasd34523dfhsgd"],
          _id: "5ef6ce67e873120017cee957",
          createdAt: "2020-06-27T04:43:19.797Z",
          updatedAt: "2020-06-27T04:43:19.797Z",
          __v: 0,
        },
        {
          comment: ["Testing"],
          parent: ["tepeu"],
          _id: "5ef6d0713ee4b10017fc4fd9",
          createdAt: "2020-06-27T04:52:01.045Z",
          updatedAt: "2020-06-27T04:52:01.045Z",
          __v: 0,
        },
        {
          comment: ["test comment"],
          parent: ["5ee87391d6204400172229e3"],
          _id: "5ef78fdaa05cb80017fdd7ef",
          createdAt: "2020-06-27T18:28:42.848Z",
          updatedAt: "2020-06-27T18:28:42.848Z",
          __v: 0,
        },
        {
          comment: ["test comment 1"],
          parent: ["5ee87391d6204400172229e3"],
          _id: "5ef7959d149dee0017051d4e",
          createdAt: "2020-06-27T18:53:17.778Z",
          updatedAt: "2020-06-27T18:53:17.778Z",
          __v: 0,
        },
        {
          comment: ["test comment 2"],
          parent: ["5ee87391d6204400172229e3"],
          _id: "5ef795a1149dee0017051d4f",
          createdAt: "2020-06-27T18:53:21.120Z",
          updatedAt: "2020-06-27T18:53:21.120Z",
          __v: 0,
        },
        {
          comment: ["THis is a comment"],
          parent: ["5ee87391d6204400172229e3"],
          _id: "5ef7a09f8176fd0017bf8012",
          createdAt: "2020-06-27T19:40:15.953Z",
          updatedAt: "2020-06-27T19:40:15.953Z",
          __v: 0,
        },
        {
          comment: ["THis is a comment"],
          parent: ["5ee87391d6204400172229e3"],
          _id: "5ef7a0a08176fd0017bf8013",
          createdAt: "2020-06-27T19:40:16.265Z",
          updatedAt: "2020-06-27T19:40:16.265Z",
          __v: 0,
        },
        {
          comment: ["Testing out the comment system."],
          parent: ["5ef7cc5215cf8500173a3eda"],
          _id: "5ef7cc5e15cf8500173a3edb",
          createdAt: "2020-06-27T22:46:54.637Z",
          updatedAt: "2020-06-27T22:46:54.637Z",
          __v: 0,
        },
        {
          comment: ["This is muy chido\n"],
          parent: ["5ef7cfa40840e00017d29699"],
          _id: "5ef7cfb00840e00017d2969a",
          createdAt: "2020-06-27T23:01:04.582Z",
          updatedAt: "2020-06-27T23:01:04.582Z",
          __v: 0,
        },
        {
          comment: [""],
          parent: ["5ef7cfa40840e00017d29699"],
          _id: "5ef7cfc90840e00017d2969b",
          createdAt: "2020-06-27T23:01:29.657Z",
          updatedAt: "2020-06-27T23:01:29.657Z",
          __v: 0,
        },
        {
          comment: ["Test"],
          parent: ["5ef7d0670840e00017d2969c"],
          _id: "5ef7d0790840e00017d2969d",
          createdAt: "2020-06-27T23:04:25.825Z",
          updatedAt: "2020-06-27T23:04:25.825Z",
          __v: 0,
        },
        {
          comment: ["Testing the force refresh"],
          parent: ["5ef7cfa40840e00017d29699"],
          _id: "5ef7e1256a3826001778eb70",
          createdAt: "2020-06-28T00:15:33.790Z",
          updatedAt: "2020-06-28T00:15:33.790Z",
          __v: 0,
        },
      ],
      nameData: [""],
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
      .then((res) => this.setState({ commentList: res }));

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
                      text: "My Portfolio",
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
            <div className="blockStyle chatBorder">
              <SimpleModal link={this.state.link} />
            </div>
          </div>

          <div className="commentCotainer">
            <div className="centerDiv">
              <strong>Comments</strong>
            </div>
            {this.state.commentList &&
              this.state.commentList.map((list) => (
                <div className="commentBox" key={Math.random()}>
                  {list.comment}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default New;
