import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import axios from "axios";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      commentList: [],
    };
  }

  render() {
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
        </div>
      </div>
    );
  }
}
export default Profile;
