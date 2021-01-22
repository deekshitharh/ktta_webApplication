
import React from "react";


import GenricOfficebearers from "../../genricSceen/officebeares";
export default class OfficeBearers extends React.Component {
  //genric component for newscomponent
  //based on prop as landing page  which displays data required for as per GenricOfficebearers component

  render() {
    return (
      <React.Fragment>
        <GenricOfficebearers type="landing" />
      </React.Fragment>
    );
  }
}
