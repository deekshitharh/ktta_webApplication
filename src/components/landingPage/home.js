import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "./TopBar";
import Footer from "./Footer";
import NewsContent from "./NewsContent";
import StandingContent from "./StandingContent";
import Grid from "@material-ui/core/Grid";
import StatisticsContent from "./StatisticsContent";
import OfficeBearers from "./OfficeBearers";
import RegisteredClubs from "./RegistredCulb";

import RegisteredAssoc from "./RegisteredAssoc";
import Sponsers from "./Sponsers";
import { withStyles } from "@material-ui/core/styles";
import {  withRouter } from "react-router-dom";
import customStyles from "../../styles/genricStyle";
import banner1 from "../../images/tball.jpg";
import BannerImage from "../../commons/genricComponents/imageClass";
import MediaWidget from "../socialMediaExtracts/mediaExtracts";
class Home extends Component {


//theme change functionality
  tokenChange = (themeColor) => {
    this.props.handlechange(themeColor)
    console.log("landing", themeColor, this.props )
   
  };

  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <React.Fragment>
          <CssBaseline />
          <Topbar tokenChange={this.tokenChange} classes={classes} />
          <Grid container>
            <Grid item md={8} sm={12} xs={12}>
              <BannerImage img={banner1} type="banner" />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <StatisticsContent classes={classes} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={8} sm={12} xs={12} style={{ padding: "10px" }}>
              <NewsContent classes={classes} />
            </Grid>
            <Grid item md={4} sm={12} xs={12} style={{ padding: "10px" }}>
              <StandingContent classes={classes} />
            </Grid>
          </Grid>
          <Grid container>
            <MediaWidget classes={classes} />
          </Grid>

          <Grid container alignItems="stretch">
            <Grid item md={6} sm={12} xs={12} style={{ padding: "10px" }}>
              <RegisteredClubs classes={classes} />
            </Grid>
            <Grid item md={6} sm={12} xs={12} style={{ padding: "10px" }}>
              <RegisteredAssoc classes={classes} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={12} sm={12} xs={12} style={{ padding: "10px" }}>
              <Sponsers classes={classes} />
            </Grid>
          </Grid>

          <Grid container style={{ padding: "10px" }}>
            <OfficeBearers classes={classes} />
          </Grid>
          <Footer classes={classes} />
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(withStyles(customStyles)(Home));
