

import React from "react";

import customStyles from "../../styles/genricStyle"

import withStyles from "@material-ui/core/styles/withStyles";



import GenicRegisteredClubs from "../../genricSceen/registerdClub"




class RegisteredClubs extends React.Component {
  



    render() {
       
     
      
        return (
            <React.Fragment>
          
            <GenicRegisteredClubs/>
            </React.Fragment>
        );
    }
}

export default withStyles(customStyles)(RegisteredClubs);
