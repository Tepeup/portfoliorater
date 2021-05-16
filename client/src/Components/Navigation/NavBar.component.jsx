import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.styles.scss";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import MenuIcon from "@material-ui/icons/Menu";

class NavBar extends React.Component {
  constructor(visible) {
    super(visible);
    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className="navbar">
        <MenuIcon className="toHome" onClick={this.props.openSideBar} />
        {/* <Link to="/dashboard">
          <DashboardIcon className="toHome" />
        </Link> */}
        <Link className="Link" to="/">
          <div className="Logo">
            <Logo height={36} />
          </div>
        </Link>
        {this.props.currentUser ? (
          <div onClick={this.props.logOut} className="direct">
            Sign Out
          </div>
        ) : (
          <Link to="/login" className="direct">
            <div className="direct">Sign In</div>
          </Link>
        )}
      </div>
    );
  }
}

export default NavBar;
