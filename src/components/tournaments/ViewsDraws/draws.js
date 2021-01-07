import React from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import ScheduleIcon from "@material-ui/icons/Schedule";
import Card from "@material-ui/core/Card";
import { Link, withRouter } from "react-router-dom";

import Downloadpdf from "./drawsDialouge";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
//import Titleize from 'react-titleize';
import Topbar from "../../landingPage/TopBar";
import Paper from "@material-ui/core/Paper";
import customStyles from "../../../styles/genricStyle";

import MaterialTable, { Column } from "material-table";
import { selectButtons, tableIcons, coloums } from "../../../formdata";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { ApiCall } from "../../../APIService";
import RefreshLoader from "../../../commons/genricComponents/pageloader";
import { commons } from "../../../commons";
class ViewDraws extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      tournamentId: this.props.match.params.id,
      open: false,
      buttonArr: selectButtons,
      value: "",
      ViewPdf: "",
      validPdf: false,
    };
  }

  componentDidMount() {}

  onChange = (event, value) => {
    this.setState({ value: value, open: false });

    const { tournamentId } = this.state;
    var params = {};

    params.type = "downloadDraws";
    params.tournamentId = tournamentId;
    params.eventName = value;
   // params.client_key = "ktta";
    params.withscore = "withScores";

    params.caller = "caller";
    params.apiKey = "apikey";
    this.setState({ loading: true });
    ApiCall("POST", params, "core")
      .then((response) => response.json())
      .then((data) => {
   
        const validPdf = this.validatepdf(data);
        this.setState({
          loading: false,
          ViewPdf: data,
          open: true,
          validPdf,
        });
      })
      .catch((error) => {
        commons.errorLog(error)
      });
  };

  validatepdf = (pdf) => {
    const base64Rejex = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/;
    const check = base64Rejex.test(pdf); // base64Data is the base64 string
    return check;
  };

  handleClose = () => {
    this.setState({
      value: "",
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      buttonArr,
      value,
      open,
      validPdf,
      ViewPdf,
      loading,
      tournamentId,
    } = this.state;

    console.log("iddd" + tournamentId);

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <Grid container justify="center">
            <RefreshLoader style="overlay" loading={loading} />
            <Paper>
              <Grid md={12} sm={12}>
                {buttonArr.map((item, index) => {
                  return (
                    <ToggleButtonGroup
                      style={{ margin: 5 }}
                      value={value}
                      exclusive
                      key={index}
                      onChange={this.onChange}
                      aria-label="text alignment"
                    >
                      <ToggleButton
                        classes={{
                          root: classes.buttonstyle, // class name, e.g. `root-x`

                          selected: classes.selected, // class name, e.g. `disabled-x`
                        }}
                        value={item.value}
                        aria-label="centered"
                      >
                        {item.name}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>

          <Downloadpdf
            open={open}
            view={validPdf}
            ViewPdf={ViewPdf}
            tounamentgroup={value}
            onClose={this.handleClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(customStyles)(ViewDraws));
