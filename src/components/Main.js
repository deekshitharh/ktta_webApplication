import React, { Component } from "react";




import Home from "./landingPage/home";



class Main extends Component {



  render() {
    const { classes, handlechange } = this.props;
    console.log("main", this.props)
    return (
      <React.Fragment>
        <Home handlechange={handlechange} classes={classes}/>

 
      </React.Fragment>
    );
  }
}

export default Main 
