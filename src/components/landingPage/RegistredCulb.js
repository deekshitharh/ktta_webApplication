import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

import newsStyles from "../../styles/newsStyle";

import withStyles from "@material-ui/core/styles/withStyles";

import { Link, withRouter } from "react-router-dom";
import RefreshLoader from "../../commons/genricComponents/pageloader"


import GenicRegisteredClubs from "../../genricSceen/registerdClub"


 class RegisteredClubs extends React.Component {
  constructor(props) {
    super(props);
   
  }

   
  
   

  render() {
    const { classes } = this.props;
  
   
   
return (
      
    <React.Fragment>
      <GenicRegisteredClubs type="landing" />
    </React.Fragment>
    
    );
  }
}
export default withRouter(withStyles(newsStyles)(RegisteredClubs));


