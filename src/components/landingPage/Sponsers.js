import Typography from "@material-ui/core/Typography";
import React from "react";

import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";



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

  loadSponsersData = () => {
    let apiData = {};
    apiData.tableName = "sponsers";
    
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
                       alt="" src={API_URL + `${filepath}` + "/" + `${newsRow.image}`}
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
