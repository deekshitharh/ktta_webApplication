import React, { Component } from "react";
import Home from "./landingPage/home";
//parent componet homepage.js component
class Main extends Component {
  render() {
    const { classes, handlechange } = this.props;
    return (
      <React.Fragment>
        <Home handlechange={handlechange} classes={classes} />
      </React.Fragment>
    );
  }
}

export default Main;
