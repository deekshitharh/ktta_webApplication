import React, { Component } from "react";
//import {newsData} from "../../formdata"
import GenricNewsContent from "../../genricSceen/newsPage";
//genric component for newscomponent
//based on prop as landing page  which displays data required for as per GenricNewsContent component
export default class NewsContent extends Component {
  render() {
    return (
      <div>
        <GenricNewsContent type="landing" />
      </div>
    );
  }
}
