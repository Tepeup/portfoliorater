import React from "react";
import { Link } from "react-router-dom";

import firebase from "../firebase/firebase.utils";

import axios from "axios";
import CarouselChart from "../Carousel/Charts.component";

class Recent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      newList: [],
      myList: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("/stocks/sort/new")
      .then((res) => res.data)
      .then((res) => {
        this.setState({ newList: res.slice(0, 20) });
      });

    firebase
      .firestore()
      .collection("users")
      .doc(`${this.props.id}`)
      .collection("favorites")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const newList = [doc.data(), ...this.state.favoriteList];
          this.setState({ favoriteList: newList });
        });
      });

    firebase
      .firestore()
      .collection("users")
      .doc(`${this.props.id}`)
      .collection("myPortfolios")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const newList = [doc.data(), ...this.state.myList];
          this.setState({ myList: newList });
        });
      });
  }

  render() {
    const marketCapLabels = ["Large", "Mid", "Small"];
    const stockColors = [
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
    ];

    return (
      <div className="dashboard-content">
        <div className="recent-content">
          <div className="header styledHeader">
            <div className="title-card">
              <strong>Recent Portfolios</strong>
            </div>
          </div>

          {this.state.newList.map((doc, index) => (
            <div className="centerThis" key={doc._id}>
              <CarouselChart
                stockLabels={doc.stock}
                stockData={doc.percent}
                capLabels={marketCapLabels}
                capData={doc.marketPercent}
                sectorLabels={doc.sector}
                sectorData={doc.sectorPercent}
                stockColors={stockColors}
              />
              <div className="link-card">
                <div className="link-body">
                  <Link to={`/chart/${doc._id}`}>
                    {" "}
                    <button>See Comments</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Recent;
