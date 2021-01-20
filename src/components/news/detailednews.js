import React from "react";

//import AuthService from "../service/AuthService";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import Topbar from "../landingPage/TopBar";
import RefreshLoader from "../../commons/genricComponents/pageloader";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApiCall } from "../../APIService";
import { API_URL } from "../../globalUrls";
import Divider from "@material-ui/core/Divider";
import { commons } from "../../commons";
import InfoComponent from "../../commons/genricComponents/infoComponent";
import ReactHtmlParser from "react-html-parser";
//detailing component of newsPage 
class DetailedNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news_id: this.props.match.params.id, //id from  news info
      filepath: "",
      newsDetails: [],
      loading: false
    };
  }
  //api for getting detail news based on id
  loadetailedData = () => {
    debugger
    const { news_id } = this.state;
    let apiData = {};
    apiData.entity="news";
    
    this.setState({ loading: true });
    ApiCall("POST", apiData, "fetchData")
  
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          newsDetails: res["data"],
        
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  componentDidMount = () => {
    this.loadetailedData();
  };

  render() {
    const { classes } = this.props;

    const { filepath,  newsDetails,news_id,loading } = this.state;
    const found = newsDetails.filter(element => element._id == news_id );
    console.log("hey",found)
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={0} />
        <RefreshLoader display="overlay" loading={loading} />
        <div className={classes.root}>
          {found.length? (
          found.map((value, index) => {
            return (
              <Paper className={classes.paper} key={index}>
                <Grid container align="center">
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                 
                  >
                    <img
                      style={{ width: 400, height: 200 }}
                      alt=""
                      src={
                        value.url
                          ?  value.url
                          : ""
                      }
                    ></img>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item md={12} xs={12} sm={12} style={{ padding: 20 }}>
                    <Typography variant="h4">
                      {  value.title ? ReactHtmlParser(  value.title) : ""}
                    </Typography>
                    <Divider/>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h6">
                        {value.description !== null
                          ? ReactHtmlParser(  value.desc)
                          : ""}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
               );
              })
            ) : (
              <InfoComponent
                variant="h4"
                message="No Data available yet!!!"
              />
            )}
        </div>
      </React.Fragment>
    );
  }
}
export default DetailedNews;
