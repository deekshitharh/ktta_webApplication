import Typography from "@material-ui/core/Typography";
import React from "react";

import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";


import pageBanner from "../../config/bannerConfig";
import { ApiCall } from "../../APIService";
import Divider from "@material-ui/core/Divider";

import { API_URL } from "../../globalUrls";
import { commons } from "../../commons";
import InfoComponent from "../../commons/genricComponents/infoComponent";


export default class Sponsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsers: [],
      filepath: "",
    };
  }
//api call fo sponsers data
  loadSponsersData = () => {
    let apiData = {};
    apiData.entity = "sponsors";
    
   

    ApiCall("POST", apiData, "fetchData")
      .then((res) => res.json())
      .then((res) => {
        if (!res["status"]) {
          console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => {
        this.setState({
          sponsers: res["data"],
        
        });
      })
      .catch((error) => {
        commons.errorLog(error)
      });
  };

  componentDidMount = () => {
    this.loadSponsersData();
  };

  render() {
    const { classes } = this.props;
    const { sponsers, filepath } = this.state;
    const defaultlogo = pageBanner("sponsers");

    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <div className={classes.flexView}>
            <Typography variant="h6" component="h6" className={classes.regclubs}>
              {" "}
              Sponsors
            </Typography>
          </div>
          <Divider/>

          <Paper className={classes.sponsergid}>
            <Grid container spacing={1} justify="center">
              {sponsers.length ? (
                sponsers.map((newsRow, newsIndex) => {
                  return (
                    <Grid key={newsIndex} item>
                      <img
                      className={classes.sponserimg}
                       alt="" 
                       src={defaultlogo}
                    
                      ></img>
                    </Grid>
                  );
                })
              ) : (
                <InfoComponent
                  variant="h4"
                  message="No Data available yet!!!"
                />
              )}
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}
