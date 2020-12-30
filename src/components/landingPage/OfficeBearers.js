import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ViewMorePage from "./linkpage";
import Titlize from "../../commons/genricComponents/titlize";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ApiCall } from "../../APIService";
import { API_URL } from "../../globalUrls";
import Divider from "@material-ui/core/Divider";
import GenricOfficebearers from "../../genricSceen/officebeares";
export default class OfficeBearers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    // let bannerFound = officeData.map(item => item.image != "");
    // og("hello office" + JSON.stringify(bannerFound))
    return (
      <React.Fragment>
        <GenricOfficebearers type="landing" />
      </React.Fragment>
    );
  }
}
