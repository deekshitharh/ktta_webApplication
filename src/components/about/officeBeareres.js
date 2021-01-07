import Typography from "@material-ui/core/Typography";

import React, { Component } from "react";
import Topbar from "../landingPage/TopBar"; 


import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { borders } from '@material-ui/system';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { ApiCall } from "../../APIService"
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Slider from "react-slick";
import customStyles from "../../styles/genricStyle";
import Titlize from "../../commons/genricComponents/titlize";
import { commons } from "../../commons";
import GenricOfficebearers from "../../genricSceen/officebeares";
import { API_URL } from "../../globalUrls"
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};

class Officebearers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      officeData: [],
      imagepath:""
    };
  }







  render() {
    const { classes } = this.props;
  
    return (
      <React.Fragment>
        <CssBaseline />
     <GenricOfficebearers/>
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(Officebearers);
