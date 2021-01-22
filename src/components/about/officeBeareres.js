import React from "react";

import customStyles from "../../styles/genricStyle";

import GenricOfficebearers from "../../genricSceen/officebeares";

import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
//genric component of office bearers
class Officebearers extends React.Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <GenricOfficebearers />
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(Officebearers);
