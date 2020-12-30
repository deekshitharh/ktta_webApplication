

import React, { Component } from "react";

import newsStyles from "../../styles/newsStyle"

import withStyles from "@material-ui/core/styles/withStyles";



import GenicRegisteredClubs from "../../genricSceen/registerdClub"




class RegisteredClubs extends React.Component {
    constructor(props) {
        super(props);
        
    }




    render() {
        const { classes } = this.props;
     
      
        return (
            <React.Fragment>
          
            <GenicRegisteredClubs/>
            </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(RegisteredClubs);
