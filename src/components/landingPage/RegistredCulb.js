import React from "react";
import customStyles from "../../styles/genricStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import GenicRegisteredClubs from "../../genricSceen/registerdClub";
//genric component for newscomponent
  //based on prop as landing page  which displays data required for as per RegisteredClubs component
class RegisteredClubs extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GenicRegisteredClubs type="landing" />
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(customStyles)(RegisteredClubs));
