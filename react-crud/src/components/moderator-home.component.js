import React, { Component } from "react";

import UserService from "../services/user-service";

export default class ModeratorHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Moderator Home</h1>
        </header>
        {this.state.content}
      </div>
    );
  }
}


