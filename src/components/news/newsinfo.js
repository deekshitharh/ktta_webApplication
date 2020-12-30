import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Topbar from "../landingPage/TopBar"; 
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinesEllipsis from "react-lines-ellipsis";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { ApiCall }from "../../APIService"
import { API_URL } from "../../globalUrls"
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import Divider from '@material-ui/core/Divider';
import RefreshLoader from "../../commons/genricComponents/pageloader"                                                                                                  
import GenricNewsContent from "../../genricSceen/newsPage"
import { commons } from "../../commons";
class Newsinfo extends React.Component {
  constructor(props) {
    super(props);
 
  }

 














  render() {
    const { classes ,} = this.props;
  


 return (
      <React.Fragment>
        <CssBaseline />
     <GenricNewsContent  />
      </React.Fragment>
    );



  }
}
export default (Newsinfo);
