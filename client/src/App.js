import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
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

  render() {
    return (
      <Switch>
        <Route logOut={this.signOut} path="/" exact>
          <Body currentUser={this.state.currentUser} logOut={this.signOut} />
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
    );
  }
}

export default App;
