import React from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import New from "./Components/New/New.component";
import Body from "./Components/Body/Body.component";
import Login from "./Components/Login/Login.component";
import "./App.scss";
import {
  auth,
  createUserProfileDocument,
} from "./Components/firebase/firebase.utils";
import Dashboard from "./Components/Dashboard/Dashboard.component";
import PrivateRoute from "./Route/PrivateRoute.component";
import NavBar from "./Components/Navigation/NavBar.component";
import { slide as Menu } from "react-burger-menu";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Recent from "./Components/Recent/Recent.component";
import CreateIcon from "@material-ui/icons/Create";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      sideBar: false,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  signOut = () => {
    auth.signOut();
    this.setState({ currentUser: null });
  };

  openSideBar = () => {
    this.setState({ sideBar: !this.state.sideBar });
  };

  trueState = () => {
    this.setState({ sideBar: true });
  };
  falseState = () => {
    this.setState({ sideBar: false });
  };

  render() {
    return (
      <main>
        <Menu
          onOpen={this.trueState}
          onClose={this.falseState}
          isOpen={this.state.sideBar}
          burgerButtonClassName={"my-class"}
        >
          <Link className="Link" to="/">
            <div className="menu-item">
              <div className="menu-list">
                <HomeIcon className="toHome" />
                Home
              </div>
            </div>
          </Link>
          <Link className="Link" to="/dashboard">
            <div className="menu-item">
              <div className="menu-list">
                <DashboardIcon className="toHome" />
                Dashboard
              </div>
            </div>
          </Link>
          <Link className="Link" to="/create">
            <div className="menu-item">
              <div className="menu-list">
                <CreateIcon className="toHome" />
                New Portfolio
              </div>
            </div>
          </Link>
        </Menu>
        <div className="dashboard">
          <NavBar
            openSideBar={this.openSideBar}
            logOut={this.signOut}
            currentUser={this.state.currentUser}
          />
          <Switch>
            <Route logOut={this.signOut} path="/create" exact>
              <Body
                currentUser={this.state.currentUser}
                logOut={this.signOut}
              />
            </Route>
            <Route path="/" exact>
              <Recent
                currentUser={this.state.currentUser}
                logOut={this.signOut}
              />
            </Route>
            <Route path="/chart/:id" exact>
              <New currentUser={this.state.currentUser} logOut={this.signOut} />
            </Route>
            <PrivateRoute
              component={Dashboard}
              currentUser={this.state.currentUser}
              logOut={this.signOut}
              path="/dashboard"
              exact
            />

            {!this.state.currentUser ? (
              <Route path="/login">
                <Login currentUser={this.props.currentUser} />
              </Route>
            ) : (
              <Redirect to="/dashboard" />
            )}
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
