import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import New from "./Components/New/New.component";
import Body from "./Components/Body/Body.component";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Body} />
      <Route path="/chart/:id" exact component={New} />
    </Router>
  );
};

export default App;
