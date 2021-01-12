
import React from "react";


import customStyles from "../../../../styles/genricStyle";

import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import { commons } from "../../../../commons";

import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";


import MaterialTable from "material-table";
import { tableIcons } from "../../../../formdata";

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
//api call for fetching match schedule based on tounamnet ID
  fetchSchedule = () => {
 

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
    
      eventData,
     
      loading,
     
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
