import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ScheduleIcon from '@material-ui/icons/Schedule';
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import fields from "../../formdata/formvalues";
import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { sessioncommons } from "../../commons"
import leagueData from "../../formdata/leagueList"
import RoomIcon from "@material-ui/icons/Room";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LeagueInfo from "./prolegue"
import { } from "../../APIService"
import { commons } from "../../commons";
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import Grid from "@material-ui/core/Grid";
import customStyles from "../../styles/genricStyle"
import RefreshLoader from "../../commons/genricComponents/pageloader"
import CommitieData from "./commitedetails"
import { ApiCall } from "../../APIService";
import { Link as CoreLink } from '@material-ui/core';
import InfoComponent from "../../commons/genricComponents/infoComponent"

class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emessage:"",
      //   tornamentData: eventData, tourType: "ranking",
      tournamentData: [],
      eventList: [],
      commitie: false,
      tourType: "ranking",
      tourval: [],
      playerDetails: [],
      open: false,
      commitiedata: [],
      tournamentval: []
    };
    this.handleChildUpdate = this.handleChildUpdate.bind(this)

  }

  loadTournamentData = () => {

    let params = {};
    // params.client_key = "TSA";
    // params.client_key = localStorage.getItem("api_key")
    params.type = "upcoming";
    params.filterData = "userId";
    params.apiKey = "apikey";
    params.caller = "caller";

    params.sportID = "interestedDomainName"
    this.setState({ loading: true });
    ApiCall("POST", params, "core")
      .then((res) => res.json())
      .then((res) => {

        if (res.status === "success" && res.resultID) {
            this.setState({
           loading: false,
           tournamentData: res["resultID"],
           tourval: res["resultID"],
           tournamentval: res["tournamentList"],
           tname: ""
        });


       





      
        }
        else if (res.error) {

          this.setState({

            loading: false,
            "emessage": "Something went wrong!!!"

          });
        }



      //   if (!res["status"]) {
      //     // console.log("api error" + res["status"]);
      //   }
      //   return res;
      // })
      // .then((res) => {
      //   // console.log("hello" + res);
      //   this.setState({
      //     loading: false,
      //     tournamentData: res["resultID"],
      //     tourval: res["resultID"],
      //     tournamentval: res["tournamentList"],
      //     tname: ""
      //   });
      })




      .catch((error) => {
        commons.errorLog(error)

      });
  };

  componentDidMount = () => {
    this.loadTournamentData();
    //this.fetchPlyer()
  };

  //   fetchPlyer=()=>{
  //   let apiData = {};
  //   apiData.tableName = "playerdetails";
  //   //apiData.client_key = "ktta";
  //   apiData.type = "getData"
  //   ApiCall("POST", apiData, "getData")

  //     .then(res => res.json())
  //     .then(res => {
  //       if (!res["status"]) {
  //         // console.log("api error" + res["status"])
  //       }

  //       return res;
  //     })
  //     .then(res => {

  //       this.setState({
  //         playerDetails: res["getData"],

  //       });


  //       sessioncommons.setplayerSession(res["getData"])



  //     })


  //     .catch(error => {
  //       commons.errorLog(error)
  //     });

  // }



  onsubmitdata = (tdata) => {
    const { tournamentval } = this.state
    const tounamentDetail = tournamentval.find(item => item.tournamentName === tdata);
    sessioncommons.setTournament(tounamentDetail)
    this.props.history.push({
      pathname: '/login',
    });

  }


  handleClose = () => {
    this.setState({
      open: false

    });
  };

  showCommitie = (id, name) => {


    var params = {};


    params.tableName = "league_committee";
    params.type = "getDataByTournamentId";
    //params.client_key = "ktta";
    params.tournamentId = id;



    ApiCall("POST", params, "getData")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          open: true,
          tname: name,
          commitiedata: data["getData"]
        });
      })
      .catch((error) => {
        commons.errorLog(error)

      });


  };


  handleChildUpdate(tourType) {

    const { tournamentData, tourval } = this.state

    if (tourType === "ranking")

      this.setState({
        tourType: "ranking",
        tournamentData: tourval,

      })
    else
      this.setState({ tourType: "leauge", tournamentData: tourval })

  }
  render() {
    const { classes } = this.props;
    const { tournamentData, tournamentval, emessage, tourType, open, loading, tname, commitiedata, commitie } = this.state;
    const x = tournamentData.length

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3}  />

        <div className={classes.root}>
          <LeagueInfo
            handleChildUpdate={this.handleChildUpdate}
            loadtdata={this.loadTournamentData}
            //loading={loading}
          />

          <Grid
            align="center"
            justify="center"
            container
          
          >
            <RefreshLoader style="overlay" loading={loading} />

            <Paper className={classes.tourpaper}>
              {tournamentData.length ? (
                tournamentData.map((value, index) => {
                  let tournamentType = commons.checkDate(
                    value.eventStartDate,
                    value.eventEndDate,
                    value.eventSubscriptionLastDate
                  );
                  console.log("futue", tournamentType);
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
                              <Grid style={{ flex: 1 }}>
                                <Typography gutterBottom variant="body1">
                                  {" "}
                                  <b>
                                    {value.eventName != "null"
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
                                      style={{ width: "2em", color: "black" }}
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
                                  style={{ marginLeft: "5px" }}
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
                                  style={{ marginLeft: "5px" }}
                                >
                                  Event dates:
                                  {commons.formatDate(value.eventStartDate)} to{" "}
                                  {commons.formatDate(value.eventEndDate)}
                                </Typography>
                              </Grid>
                              <Grid item xs={1} md={1} sm={2}>
                                <ScheduleIcon />
                              </Grid>
                              <Grid item xs={11} md={11} sm={10}>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  style={{ marginLeft: "5px" }}
                                >
                                  Last date for registration:{" "}
                                  {commons.formatDate(
                                    value.eventSubscriptionLastDate
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>

                          <CardActions style={{ justifyContent: "flex-end" }}>
                            {tournamentType === "future" ? (
                              <Button
                                onClick={() =>
                                  this.onsubmitdata(value.eventName)
                                }
                              >
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
                <InfoComponent variant="h3" message="No Tournament announced yet!!!!"/>
                 
                
                  
               
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