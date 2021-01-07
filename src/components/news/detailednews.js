import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import AuthService from "../service/AuthService";
import Table from "@material-ui/core/Table";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Topbar from "../landingPage/TopBar";
import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApiCall } from "../../APIService"
import { API_URL } from "../../globalUrls"
import Collapse from "@material-ui/core/Collapse";
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { commons } from "../../commons";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
class DetailedNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news_id: this.props.match.params.id,//id from  news info
      filepath: "",
      newsDetails:[]
    };
  }
//api for getting detail news
  loadetailedData = () => {
    const { news_id}=this.state
    let apiData = {};
    apiData.tableName = "news";
   // apiData.client_key = "ktta";
    apiData.type = "getDataById";
  
    apiData.id = news_id;
    ApiCall("POST", apiData, "getDataById")

      .then(res => res.json())
      .then(res => {

        this.setState({
          newsDetails: res["getData"],
          filepath: res["imagePath"]
        });
      })
      .catch(error => {
        commons.errorLog(error)

      });
  };


  componentDidMount = () => {
    this.loadetailedData();
  };



  render() {
    const { classes } = this.props;

    
    const { filepath, data,  newsDetails } = this.state;
    
   
  
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={0} />
      
        <div className={classes.root}>
       
          {newsDetails.map((value, index) => {

            return (
          <Paper className={classes.paper} key={index}>
           
              <Grid container 
              
    
               align="center"
             
            >
             
              
                  <Grid item md={12} xs={12} sm={12}
                  //  style={{ height: "100%", width: 400,objectFit:"cover"}}
                  >
          
          
          
                  <img
                        style={{width:400, height :200}}           
                    src={
                        value.image ? API_URL + `${filepath}` + "/" + `${value.image}` : ""
                    }
                  ></img>
              </Grid>
                </Grid>  
                  <Grid container


                    justify="center"
>


                    <Grid item md={12} xs={12} sm={12} style={{ padding: 20 }}>

                      <Typography variant="h4">
                        {value.title ? ReactHtmlParser(value.title) : ""}
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item md={12} xs={12} sm={12}>
                     
                      <Paper className={classes.paper}>
                        <Typography variant="h6" >
                          {value.description != "null" ? ReactHtmlParser(value.description) : ""}
                        </Typography>
                      </Paper>
                    </Grid>


                  </Grid>

              
             
                 

         
         
         
         
         
         
              </Paper>
          
          
            );
          })}

        
        </div>
      </React.Fragment>
    );







  }
}
export default (DetailedNews);
