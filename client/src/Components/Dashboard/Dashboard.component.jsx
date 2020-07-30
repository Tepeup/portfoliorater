import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import firebase from "../firebase/firebase.utils";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./Dashboard.styles.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import CarouselChart from "../Carousel/Charts.component";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      newList: [],
      myList: [],
    };
  }

  async componentDidMount() {
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
    return (
      <div className="dashboardInfo">
        <div className="infoContainer">
          <div className="favoriteContainer">
            <div className="header">My Portfolios</div>
            {this.state.myList.map((doc, index) => (
              <div className="centerThis" key={doc.id}>
                <Link to={`/chart/${doc.id}`}>
                  <button>{`My Portfolio ${index + 1}`}</button>
                </Link>
              </div>
            ))}
            <Link className="Link" to="/">
              <button className="createButton">Create</button>
            </Link>
          </div>
          <div className="favoriteContainer">
            <div className="header">Favorites</div>
            {this.state.favoriteList.map((doc, index) => (
              <div className="centerThis" key={doc.id}>
                <Link to={`/chart/${doc.id}`}>
                  <button>{`Favorite ${index + 1}`}</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
