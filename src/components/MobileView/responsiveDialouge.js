import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import BaseDialog from "../players/dialouges/baseDialouge";

import LocationCityIcon from "@material-ui/icons/LocationCity";
import Grid from "@material-ui/core/Grid";
import customStyles from "../../styles/genricStyle";
import MaterialTable from "material-table";

import CardContent from "@material-ui/core/CardContent";

import CardHeader from "@material-ui/core/CardHeader";

import Card from "@material-ui/core/Card";
import ScoreIcon from "@material-ui/icons/Score";
import RoomIcon from "@material-ui/icons/Room";
import { rankingResponsiveTable } from "../../formdata";

import Titlize from "../../commons/genricComponents/titlize";
//mobile view component for player ranking dailouge display for additional details view used in rankingview.js

class ResponsiveDailouge extends Component {
  render() {
    const {
      playername,
      detaildata,
      classes,
      playerdata,
      icons,
      loading,
    } = this.props;
    let playerInfo = playerdata.find((item) => item.userName === playername);

    return (
      <BaseDialog {...this.props}>
        <div>
          <Grid container>
            <Grid item sm={12} xs={12} className={classes.responsiveDailouge}>
              <Card>
                <CardHeader
                  title={
                    playerInfo ? <Titlize value={playerInfo.userName} /> : ""
                  }
                  className={classes.textcentre}
                />

                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={1} sm={1}>
                      <RoomIcon />
                    </Grid>
                    <Grid item xs={11} sm={11}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        className={classes.responsivepadding}
                      >
                        {playerInfo ? (
                          <Titlize value={playerInfo.stateName} />
                        ) : (
                          ""
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item xs={1} sm={1}>
                      <LocationCityIcon />
                    </Grid>
                    <Grid item xs={11} sm={11}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        className={classes.responsivepadding}
                      >
                        {playerInfo ? (
                          <Titlize value={playerInfo.academy} />
                        ) : (
                          ""
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item xs={1} sm={1}>
                      <ScoreIcon />
                    </Grid>
                    <Grid item xs={11} sm={11}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        className={classes.responsivepadding}
                      >
                        {playerInfo ? playerInfo.totPoints : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item sm={12} xs={12} >
              <MaterialTable
                title=""
                isLoading={loading}
                columns={rankingResponsiveTable}
                data={detaildata}
                icons={icons}
                options={{
                  searchFieldAlignment: "left",
                }}
              />
            </Grid>
          </Grid>
        </div>
      </BaseDialog>
    );
  }
}

export default withRouter(withStyles(customStyles)(ResponsiveDailouge));
