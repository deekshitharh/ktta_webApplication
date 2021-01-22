import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Statistics from "../../commons/genricComponents/charts";

import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
// import "../../styles/legend.css"

import { withRouter } from "react-router-dom";
import customStyles from "../../styles/genricStyle";
import { ApiCall } from "../../APIService";
import InfoComponent from "../../commons/genricComponents/infoComponent";
// parent component for  graph component  used in home.js

class StatisticsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    statistics:{},
    userStatus:""
    };
  }
  loadstatdata = async () => {
    let apiData = {};

    apiData.type = "assocStatistics";
    ApiCall("POST", apiData, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          this.setState({
            statistics: res.data,
           
          });
        } else if (res.status == "failure") {
          this.setState({
           
            userStatus: res.message,
          });
        }
      });
  };

  componentDidMount() {
    this.loadstatdata();
  }
  render() {
    const { classes } = this.props;
const {userStatus,statistics}=this.state
    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <Typography variant="h6" component="h6" className={classes.graphtext}>
            {" "}
            Statistics
          </Typography>
          <Card>
            <Statistics statdata={statistics} />
          </Card>
          {userStatus.length ? (
            <InfoComponent variant="subtitle" message={userStatus} />
          ) : (
            ""
          )}
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(customStyles)(StatisticsContent));
