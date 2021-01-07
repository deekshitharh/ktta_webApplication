import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Statistics from "../../commons/genricComponents/charts";
import playerStat from "../../commons/genricComponents/charts";
import ChartistGraph from "react-chartist";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";
// import "../../styles/legend.css"
import { statisticsData } from "../../formdata";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, withRouter, Router } from "react-router-dom";
import customStyles from "../../styles/genricStyle";





class StatisticsContent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <Typography variant="h6" component="h6" style={{ flex: 1 }}>
            {" "}
            Statistics
          </Typography>

          <Card>
            <Statistics />
          </Card>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(customStyles)(StatisticsContent));
