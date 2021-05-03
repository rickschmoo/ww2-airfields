import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import logo from './logo.svg';

import AuthService from "./services/auth-service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import AirfieldList from "./components/airfield-list.component";
import AirfieldItem from "./components/airfield-item.component";

import ModeratorHome from "./components/moderator-home.component";
import AdminHome from "./components/admin-home.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
  const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

  return (
    <div>

      <nav>
        <div className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            WW2 airfields
          </Link>

          <div className="navbar-nav mr-auto">
            <ul className="nav">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link keepwhite">
                  Home
                </Link>
              </li>
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
            )}
            </ul>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <ul className="nav">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <ul className="nav">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <main>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={["/", "/airfields"]} component={AirfieldList} />
            <Route path="/airfields/:id" component={AirfieldItem} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={AirfieldList} />
            <Route path="/mod" component={ModeratorHome} />
            <Route path="/admin" component={AdminHome} />
          </Switch>
        </div>
      </main>
    </div>
  )};
}

export default App;

