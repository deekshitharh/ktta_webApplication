import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { registered_clubs } from "../../formdata";

import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import Box from "@material-ui/core/Box";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ApiCall } from "../../APIService";
import Divider from "@material-ui/core/Divider";
import { uiCommons } from "../../commons";
import { API_URL } from "../../globalUrls";
import { commons } from "../../commons";
import InfoComponent from "../../commons/genricComponents/infoComponent";
const gridColumns = 3;
const gridRows = 1;

export default class Sponsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsers: [],
      filepath: "",
    };
  }

  loadSponsersData = () => {
    let apiData = {};
    apiData.tableName = "sponsers";
    //apiData.client_key = "ktta";
    apiData.type = "getData";

    ApiCall("POST", apiData, "getData")
      .then((res) => res.json())
      .then((res) => {
        if (!res["status"]) {
          console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => {
        this.setState({
          sponsers: res["getData"],
          filepath: res["imagePath"],
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
    

    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="h6" style={{ flex: 1 }}>
              {" "}
              Sponsors
            </Typography>
          </div>
          <Divider />

          <Paper style={{ marginTop: 20 }}>
            <Grid container spacing={1} justify="center">
              {sponsers.length ? (
                sponsers.map((newsRow, newsIndex) => {
                  return (
                    <Grid key={newsIndex} item>
                      <img
                        style={{
                          height: 100,
                          width: 100,
                          marginTop: 20,
                        }}
                        src={API_URL + `${filepath}` + "/" + `${newsRow.image}`}
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
