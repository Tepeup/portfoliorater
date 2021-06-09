import React from "react";
import { Link } from "react-router-dom";

import firebase from "../firebase/firebase.utils";

import "./Dashboard.styles.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [1, 2],
      newList: [],
      myList: [1, 2],
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
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="header styledHeader">
            <div className="title-card">
              <strong>My Portfolios</strong>
            </div>
          </div>
          <div className="infoContainer">
            <div className="favoriteContainer">
              {this.state.myList.map((doc, index) => (
                <div key={doc.id}>
                  <Link to={`/chart/${doc.id}`}>
                    <div className="dashboard-list" key={doc.id}>
                      <div className="number-list">{`${index + 1}`}</div>
                      <div className="title-list">Portfolio</div>
                    </div>
                  </Link>
                </div>
              ))}
              <Link className="Link" to="/">
                <button className="createButton">New Portfolio</button>
              </Link>
            </div>
          </div>

          <div className="header styledHeader">
            <div className="title-card">
              <strong>My Favorites</strong>
            </div>
          </div>

          <div className="infoContainer">
            <div className="favoriteContainer">
              {this.state.favoriteList.map((doc, index) => (
                <Link to={`/chart/${doc.id}`}>
                  <div className="dashboard-list" key={doc.id}>
                    <div className="number-list">{`${index + 1}`}</div>
                    <div className="title-list">Favorite</div>
                  </div>
                </Link>
              ))}
              <Link className="Link" to="/new">
                <button className="createButton">Browse Recent</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
