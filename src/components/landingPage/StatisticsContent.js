import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Statistics from "../../commons/genricComponents/charts";

import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
// import "../../styles/legend.css"

import { withRouter } from "react-router-dom";
import customStyles from "../../styles/genricStyle";





class StatisticsContent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <Typography variant="h6" component="h6"className={classes.statistics}>
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
