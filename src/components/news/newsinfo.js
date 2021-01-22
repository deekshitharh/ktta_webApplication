import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import GenricNewsContent from "../../genricSceen/newsPage";
//genric component to display news in detailing page
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
