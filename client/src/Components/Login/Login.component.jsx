import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import axios from "axios";
import SearchBox from "../Searchbox/Searchbox.component";
import "./Login.styles.scss";
import {
  auth,
  signInWithGoogle,
  createUserProfileDocument,
} from "../firebase/firebase.utils";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUser: "",
      loginPassword: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleRegister = async (event) => {
    event.preventDefault();
    const { userName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { userName });
      this.setState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("Password should be atleast six characters");
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  logOut = () => {
    auth.signOut();
  };
  submitRegister = async (event) => {
    event.preventDefault();
    const { loginUser, loginPassword } = this.state;
    try {
      await auth.signInWithEmailAndPassword(loginUser, loginPassword);
      this.setState({ loginUser: "", loginPassword: "" });
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  render() {
    return (
      <div className="Body">
        <div className="dashboard">
          <div className="navbar">
            <div></div>
            <Link className="Link" to="/">
              <div className="Logo">
                <Logo height={36} />
              </div>
            </Link>
            <div></div>
          </div>
          <div className="loginInfoBox">
            <div className="infoContainer">
              <div className="centerContent">
                <div className="title">Login</div>
                <form id="stockForm" onKeyDown={this.newOneEnter}>
                  <SearchBox
                    placeHolder={"Username"}
                    boxType={"text"}
                    name="loginUser"
                    value={this.loginUser}
                    handleChange={this.handleChange}
                  />
                  <SearchBox
                    placeHolder={"Password"}
                    boxType={"password"}
                    value={this.loginPassword}
                    name="loginPassword"
                    handleChange={this.handleChange}
                  />
                </form>

                <button onClick={this.submitRegister} className="loginButtons">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="registerInfoBox">
            <div className="infoContainer">
              <div className="centerContent">
                <div className="title">Register</div>
                <form id="stockForm" onKeyDown={this.newOneEnter}>
                  <SearchBox
                    name="userName"
                    placeHolder={"Username"}
                    boxType={"text"}
                    value={this.userName}
                    handleChange={this.handleChange}
                  />
                  <SearchBox
                    name="email"
                    placeHolder={"Email"}
                    boxType={"email"}
                    value={this.email}
                    handleChange={this.handleChange}
                  />
                  <SearchBox
                    name="password"
                    placeHolder={"Password"}
                    boxType={"password"}
                    value={this.password}
                    handleChange={this.handleChange}
                  />
                  <SearchBox
                    name="confirmPassword"
                    placeHolder={"Confirm Password"}
                    boxType={"password"}
                    value={this.confirmPassword}
                    handleChange={this.handleChange}
                  />
                </form>
                <button onClick={this.handleRegister} className="loginButtons">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="googleInfoBox">
            <div className="infoContainer">
              <div className="centerContet">
                <button onClick={signInWithGoogle}>Google SigIn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
