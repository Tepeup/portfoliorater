import React from "react";
import "./New.styles.scss";
import axios from "axios";
import SimpleRating from "../Rating/SimpleRating.component";
import SimpleModal from "../SimpleModal/SimpleModal.component";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Fab from "@material-ui/core/Fab";
import firebase from "../firebase/firebase.utils";

import CarouselChart from "../Carousel/Charts.component";

import CustomizedAccordions from "../Accordion/Accordion";

class New extends React.Component {
  constructor() {
    super();
    this.state = {
      link: null,
      sumData: [100],
      rating: null,
      noVotes: null,
      marketCapName: ["Large", "Mid", "Small"],
      marketCapData: [100, 90, 80],
      sectorData: [100],
      sectorShow: [""],
      commentList: [],
      nameData: [""],
      liked: false,
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
      .then((res) => this.setState({ commentList: res.slice(-15) }));

    this.setState({ link: id });
    if (this.props.currentUser) {
      if (this.props.currentUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(`${this.props.currentUser.id}`)
          .collection("favorites")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().id === this.state.link) {
                this.setState({ liked: true });
              }
            });
          });
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      if (this.props.currentUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(`${this.props.currentUser.id}`)
          .collection("favorites")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().id === this.state.link) {
                this.setState({ liked: true });
              }
            });
          });
      }
    }
  }

  getURL = () => {
    var parts = window.location.pathname.split("/");
    var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
  };

  likeChart = () => {
    this.props.currentUser
      ? firebase
          .firestore()
          .collection("users")
          .doc(`${this.props.currentUser.id}`)
          .collection("favorites")
          .doc(`${this.state.link}`)
          .set({ id: `${this.state.link}` })
          .then(() => {
            this.setState((prevState) => ({ liked: !prevState.liked }));
          })
          .catch((error) => {
            alert(`Error liking chart`);
          })
      : alert("Login to save to favorites");
  };

  unLikeChart = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${this.props.currentUser.id}`)
      .collection("favorites")
      .doc(`${this.state.link}`)
      .delete()
      .then(() => {
        this.setState((prevState) => ({ liked: !prevState.liked }));
      })
      .catch(function (error) {
        alert(error);
      });
  };

  render() {
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
        <div className="carousel-content">
          <CarouselChart
            stockLabels={this.state.nameData}
            stockData={this.state.sumData}
            capLabels={this.state.marketCapName}
            capData={this.state.marketCapData}
            sectorLabels={this.state.sectorShow}
            sectorData={this.state.sectorData}
            stockColors={stockColors}
          />
          <CustomizedAccordions
            stocks={this.state.nameData}
            percent={this.state.sumData}
          />

          <div className="infoBox" id="ratingBox">
            <div className="infoContainer">
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
                {this.props.currentUser ? (
                  this.state.liked ? (
                    <Fab className="liked" onClick={this.unLikeChart}>
                      <FavoriteIcon />
                    </Fab>
                  ) : (
                    <Fab className="unliked" onClick={this.likeChart}>
                      <FavoriteIcon />
                    </Fab>
                  )
                ) : (
                  <Fab className="unliked" onClick={this.likeChart}>
                    <FavoriteIcon />
                  </Fab>
                )}
              </div>
            </div>
          </div>
          <div className="commentContainer">
            <div className="infoContainer">
              <div className="centerDiv">
                <strong>{`Comments ( ${this.state.commentList.length} )`}</strong>
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
      </div>
    );
  }
}
export default New;
