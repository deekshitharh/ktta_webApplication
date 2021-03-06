import React from "react";
import CardContent from "@material-ui/core/CardContent";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import Paper from "@material-ui/core/Paper";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { sessioncommons } from "../../commons";
import RoomIcon from "@material-ui/icons/Room";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import LeagueInfo from "./prolegue";
import {} from "../../APIService";
import { commons } from "../../commons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import customStyles from "../../styles/genricStyle";
import RefreshLoader from "../../commons/genricComponents/pageloader";
import CommitieData from "./commitedetails";
import { ApiCall } from "../../APIService";
import { Link as CoreLink } from "@material-ui/core";
import InfoComponent from "../../commons/genricComponents/infoComponent";
//displaying the tounamnet list user can  register or /view entries/draws based onpast and upcomming tournaments data
//past and upcomming tournaments data
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emessage: "",
      tournamentData: [],
      eventList: [],
      commitie: false,
      tourType: "ranking",
      tourval: [],
      playerDetails: [],
      open: false,
      commitiedata: [],
      tournamentval: [],
    };
    this.handleChildUpdate = this.handleChildUpdate.bind(this);
  }
  //api call to display the tounamnet list "upcomming/past"
  loadTournamentData = () => {
    let params = {};
    params.type = "tourList";
    this.setState({ loading: true });
    ApiCall("POST", params, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          this.setState({
            loading: false,
            tournamentData: res["data"],
            tourval: res["data"],
            tournamentval: res["tournamentList"],
            tname: "",
          });
        } else if (res.status == "failure") {
          this.setState({
            tournamentData: res["data"],
            loading: false,
            emessage: "Something went wrong!!!",
          });
        }
      })

      .catch((error) => {
        commons.errorLog(error);
      });
  };

  componentDidMount = () => {
    this.loadTournamentData();
  };
//onsubmit functionality that redirects to login
  onsubmitdata = (tdata) => {
    let tournamentval = {};
    tournamentval.tournamentId = tdata._id;
    tournamentval.tournamentId = tdata._id;
    tournamentval.tournamentName = tdata.eventName;
    sessioncommons.setTournament(tournamentval);
    this.props.history.push({
      pathname: "/login",
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  //api function to get committie data
  showCommitie = (id, name) => {
    var params = {};

    params.entity = "leagueCommittee";
    params.tournamentId = id;

    ApiCall("POST", params, "fetchData")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          open: true,
          tname: name,
          commitiedata: data["data"],
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  //update the  type and fetch the tournamnet data based client key "ranking/leugue"
  handleChildUpdate(tourType) {
    const { tourval } = this.state;

    if (tourType === "ranking")
      this.setState({
        tourType: "ranking",
        tournamentData: tourval,
      });
    else this.setState({ tourType: "leauge", tournamentData: tourval });
  }
  render() {
    const { classes } = this.props;
    const {
      tournamentData,
      tourType,
      open,
      loading,
      tname,
      commitiedata,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3} />

        <div className={classes.root}>
          <LeagueInfo
            handleChildUpdate={this.handleChildUpdate}
            loadtdata={this.loadTournamentData}
          />

          <Grid align="center" justify="center" container>
            <RefreshLoader display="overlay" loading={loading} />

            <Paper className={classes.tourpaper}>
              {tournamentData.length ? (
                tournamentData.map((value, index) => {
                  let tournamentType = commons.checkDate(
                    value.eventStartDate,
                    value.eventEndDate,
                    value.eventSubscriptionLastDate
                  );

                  return (
                    <Card className={classes.tornamentcard} key={index}>
                      <Grid
                        container
                        item
                        alignItems="center"
                        justify="center"
                        xs={12}
                        md={12}
                      >
                        <Grid item xs={12} md={12}>
                          <CardContent>
                            <Grid container>
                              <Grid className={classes.statistics}>
                                <Typography gutterBottom variant="body1">
                                  {" "}
                                  <b>
                                    {value.eventName !== null
                                      ? value.eventName
                                      : ""}
                                  </b>
                                </Typography>
                              </Grid>

                              <Grid>
                                {tourType === "ranking" ? (
                                  <CoreLink
                                    component="button"
                                    variant="body1"
                                    onClick={() => {
                                      this.showCommitie(
                                        value._id,
                                        value.eventName
                                      );
                                    }}
                                  >
                                    Committee
                                    <FontAwesomeIcon
                                      icon={faHandPointRight}
                                      size="1x"
                                      className={classes.commitieicon}
                                    />
                                  </CoreLink>
                                ) : (
                                  ""
                                )}
                              </Grid>
                            </Grid>

                            <Grid container>
                              <Grid item md={1} sm={2} xs={1}>
                                <RoomIcon />
                              </Grid>
                              <Grid item md={11} sm={10} xs={11}>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  className={classes.commitiegrid}
                                >
                                  {value.domainName}
                                </Typography>
                              </Grid>

                              <Grid item md={1} sm={2} xs={1}>
                                <CalendarTodayIcon />
                              </Grid>
                              <Grid item xs={11} md={11} sm={10}>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  className={classes.commitiegrid}
                                >
                                  Event dates:
                                  {commons.formatDate(
                                    value.eventStartDate
                                  )} to {commons.formatDate(value.eventEndDate)}
                                </Typography>
                              </Grid>
                              <Grid item xs={1} md={1} sm={2}>
                                <ScheduleIcon />
                              </Grid>
                              <Grid item xs={11} md={11} sm={10}>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  className={classes.commitiegrid}
                                >
                                  Last date for registration:{" "}
                                  {commons.formatDate(
                                    value.eventSubscriptionLastDate
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>

                          <CardActions className={classes.commitiecard}>
                            {tournamentType === "future" ? (
                              <Button onClick={() => this.onsubmitdata(value)}>
                                Register
                              </Button>
                            ) : tournamentType === "closed" ? (
                              <Button disabled>Entries closed</Button>
                            ) : (
                              <div>
                                <Button
                                  component={Link}
                                  to={`/entriesDraws/${value._id}`}
                                >
                                  View Entries/Draws
                                </Button>
                              </div>
                            )}
                          </CardActions>
                        </Grid>
                      </Grid>
                    </Card>
                  );
                })
              ) : (
                <InfoComponent
                  variant="h3"
                  message="No Tournament announced yet!!!!"
                />
              )}
            </Paper>
          </Grid>
        </div>
        <CommitieData
          name={tname}
          open={open}
          data={commitiedata}
          onClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(customStyles)(Tournament));
