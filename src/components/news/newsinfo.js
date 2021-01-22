import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import GenricNewsContent from "../../genricSceen/newsPage";
//genric component to display news used in home.js
class Newsinfo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <GenricNewsContent/>
      </React.Fragment>
    );
  }
}
export default Newsinfo;
