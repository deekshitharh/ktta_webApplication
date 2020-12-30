import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Slider from "react-slick/lib";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ViewMorePage from "./linkpage";
import Titlize from "../../commons/genricComponents/titlize";
//import {newsData} from "../../formdata"
import GenricNewsContent from "../../genricSceen/newsPage"


export default class NewsContent extends Component {
  constructor(props) {
    super(props);
   
  }


  render() {
  

    return (
      <div >
        <GenricNewsContent type="landing"/>
      </div>
    );
  }
}
