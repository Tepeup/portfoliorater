import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import firebase from "../firebase/firebase.utils";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./Dashboard.styles.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      newList: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("/stocks/sort/new")
      .then((res) => res.data)
      .then((res) => {
        this.setState({ newList: res.slice(-10) });
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
  }

  render() {
    return (
      <div className="Body">
        <div className="dashboard">
          <div className="navbar">
            <Link to="/dashboard">
              <DashboardIcon className="toHome" />
            </Link>
            <Link className="Link" to="/">
              <div className="Logo">
                <Logo height={36} />
              </div>
            </Link>
            <div onClick={this.props.logOut} className="direct">
              Sign Out
            </div>
          </div>
          <div className="dashboardInfo">
            <div className="infoContainer">
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
              <div className="favoriteContainer">
                <div className="header">Recent Portfolios</div>
                {this.state.newList.map((doc, index) => (
                  <div className="centerThis" key={doc.id}>
                    <Link to={`/chart/${doc.id}`}>
                      <button>{`Portfolio ${index + 1}`}</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
