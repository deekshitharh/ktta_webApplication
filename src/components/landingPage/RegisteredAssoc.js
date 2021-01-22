import React from "react";

import customStyles from "../../styles/genricStyle";

import withStyles from "@material-ui/core/styles/withStyles";

import { withRouter } from "react-router-dom";

import GenicRegisteredAssoc from "../../genricSceen/registeredAssoc";
//genric component for newscomponent
  //based on prop as landing page  which displays data required for as per RegisteredClubs component
class RegisteredAssoc extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GenicRegisteredAssoc type="landing" />
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(customStyles)(RegisteredAssoc));
