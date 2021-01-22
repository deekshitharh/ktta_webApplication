import React from "react";
import customStyles from "../../styles/genricStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GenicRegisteredAssoc from "../../genricSceen/registeredAssoc";
//genric component of RegisteredAssoc component
class RegisterdAssoc extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GenicRegisteredAssoc />
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(RegisterdAssoc);
