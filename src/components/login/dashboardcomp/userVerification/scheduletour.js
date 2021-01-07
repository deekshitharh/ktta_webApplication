import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import customStyles from "../../../../styles/genricStyle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SnackPopup from "../../../../commons/genricComponents/snackbar";
import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import { commons } from "../../../../commons";

import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { eventsuscriptionlist } from "../../../../formdata";
import TableDisplay from "../../../../commons/genricComponents/table";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../formdata";
import RefreshLoader from "../../../../commons/genricComponents/pageloader";
import { schedule } from "../../../../formdata";
class SceduleTournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventSchedule: schedule,
      eventData: [],
    };
  }

  componentDidMount() {
    let sceduledArray = [];

    schedule.forEach((x) => {
      x.mEvent.forEach((y, index) => {
        let j = {};
        if (index === 0) {
          j.date = x.date;
        }
        j.time = y.time;
        j.event = y.event;
        j.round = y.round;
        sceduledArray.push(j);
      });
    });
    this.setState({
      eventData: sceduledArray,
    });
  }

  fetchSchedule = () => {
    const { result, checkedFees } = this.state;

    let tournamentdata = sessioncommons.getTournament();
    let params = {};

    params.type = "schedule";
      params.caller = "caller";
      params.apiKey = "apikey";
    params.data = {
      tournamentId: tournamentdata.tournamentId,
    };

    this.setState({ loading: true });
    ApiCall("POST", params, "core")
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          //  this.setState({ eventSchedule: res, loading: false })
        } else {
          // this.setState({ "pwdStatus": true, "dialogOpen": true, loading: false })
          // this.resetForm();
        }
      })

      .catch((error) => {
        commons.errorLog(error);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      eventlist,
      eventSchedule,
      eventData,
      result,
      loading,
      subsciptionData,
      checkedEvent,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <Paper elavation={10} square={false}>
            <Grid container align="center">
              <Grid item md={12} sm={12} xs={12}>
                <MaterialTable
                  title=""
                  columns={[
                    {
                      field: "date",
                      title: "Date",
                    },
                    {
                      field: "time",
                      title: "Time",
                      // render: (rowData) => this.handlefee(rowData.abbName),
                    },
                    {
                      field: "event",
                      title: "Event",
                      // render: (rowData) => this.handlefee(rowData.abbName),
                    },
                    {
                      field: "round",
                      title: "Round",
                      // render: (rowData) => this.handlefee(rowData.abbName),
                    },
                  ]}
                  data={eventData}
                  isLoading={loading}
                  icons={tableIcons}
                  options={{
                    toolbar: false,

                    padding: "dense",

                    search: false,

                    paging: false,
                    filtering: false,

                    headerStyle: {
                      backgroundColor: "#f44336a6",
                      color: "#FFF",
                    },
                    rowStyle: {
                      color: "#000000",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(SceduleTournament);
