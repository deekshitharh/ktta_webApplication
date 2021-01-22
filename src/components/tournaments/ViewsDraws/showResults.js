import React from "react";
import Grid from "@material-ui/core/Grid";
import customStyles from "../../../styles/genricStyle";
import Fontawsome from "../../../commons/genricComponents/fontAwsomicon";
import Paper from "@material-ui/core/Paper";

import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { commons } from "../../../commons";
import SnackPopup from "../../../commons/genricComponents/snackbar";

import { ApiCall } from "../../../APIService";
import Container from "@material-ui/core/Container";
import TableRow from "@material-ui/core/TableRow";
import RefreshLoader from "../../../commons/genricComponents/pageloader";

import { drawresults, mresults } from "../../../formdata";

import { withRouter } from "react-router-dom";

import { sessioncommons } from "../../../commons";
//displaying view component to that redirects to showsdraws component based on event ctegory
class displaydraws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchresults: [],
      status: false,
      tournamentId: this.props.match.params.id,
      message: "",
      loading: false,
      emessage: "",
    };
  }

  //set the draw results in local storage.
  handleClick = (x) => {
    const { tournamentId } = this.state;
    let apiData = {};

    apiData.type = "matchResults";
    apiData.tournamentId = tournamentId;
    apiData.eventName = x;

    this.setState({ loading: true });
    ApiCall("POST", apiData, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          if (Object.keys(res).length) {
            sessioncommons.setdrawData(res);
          }
          this.props.history.push(`/showdraws/${x}`);
        } else if (res.status === "failure") {
          this.setState({
            emessage: res.message,
            loading: false,
          });
        }
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  componentDidMount() {
    this.setState({ data: mresults });
  }

  render() {
    const { classes } = this.props;
    const { message, loading, emessage } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <Grid container justify="center">
            <RefreshLoader display="overlay" loading={loading} />

            <Table
              className={classes.drawstable}
              size="small"
              aria-label="simple table"
            >
              <TableBody>
                {drawresults.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => this.handleClick(row.fEvent.event)}
                      >
                        <Fontawsome
                          name={row.fEvent.icon}
                          size="2x"
                          style={{ width: "0.9em", color: "#D85B6D" }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell
                        align="left"
                        onClick={() => this.handleClick(row.mEvent.event)}
                      >
                        <Fontawsome
                          name={row.mEvent.icon}
                          size="2x"
                          style={{ width: "0.9em", color: "#D85B6D" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {message.length ? (
              <SnackPopup message={message} type="success" />
            ) : emessage.length ? (
              <SnackPopup message={`${emessage}`} type="error" />
            ) : (
              ""
            )}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(customStyles)(displaydraws));
