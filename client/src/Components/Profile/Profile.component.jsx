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

  async componentDidMount() {
    await axios
      .get("/stocks/")
      .then((res) => res.data)
      .then((res) => this.setState({ commentList: res.slice(-15) }));

    this.setState({ link: id });
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
