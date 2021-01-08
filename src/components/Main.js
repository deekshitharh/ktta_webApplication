import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";



import Paper from '@material-ui/core/Paper';
import Home from "./landingPage/home";



class Main extends Component {



  render() {
    const { classes, handlechange } = this.props;
    console.log("main", this.props)
    return (
      <React.Fragment>
        <Home handlechange={handlechange} classes={classes}/>

        {/* <CssBaseline />
        // <Topbar classes={classes}/>
        // <Banner classes={classes}/>
        // <NewsSlider classes={classes}/>
        // <AboutInfo classes={classes}/>
        // <Footer classes={classes}/> */}
      </React.Fragment>
    );
  }
}

export default Main 
