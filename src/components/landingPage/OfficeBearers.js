
import React from "react";


import GenricOfficebearers from "../../genricSceen/officebeares";
export default class OfficeBearers extends React.Component {


  render() {
  

    // let bannerFound = officeData.map(item => item.image != "");
    // og("hello office" + JSON.stringify(bannerFound))
    return (
      <React.Fragment>
        <GenricOfficebearers type="landing" />
      </React.Fragment>
    );
  }
}
