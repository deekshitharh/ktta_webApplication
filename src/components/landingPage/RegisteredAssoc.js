
import React from "react";

import customStyles from "../../styles/genricStyle";

import withStyles from "@material-ui/core/styles/withStyles";

import { withRouter } from "react-router-dom";



import GenicRegisteredAssoc from "../../genricSceen/registeredAssoc"


 class RegisteredClubs extends React.Component {
 

   
  
   

  render() {
  
  
   
   
return (
      
    <React.Fragment>
      <GenicRegisteredAssoc type="landing" />
    </React.Fragment>
    
    );
  }
}
export default withRouter(withStyles(customStyles)(RegisteredClubs));


