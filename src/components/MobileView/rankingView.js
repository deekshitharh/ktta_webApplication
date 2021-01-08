import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import Paper from "@material-ui/core/Paper";
import { AccordionSummary } from '@material-ui/core'
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Titlize from "../../commons/genricComponents/titlize";
import customStyles from "../../styles/genricStyle";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import ResponsiveDailouge from "./responsiveDialouge";
import MaterialTable, { MTableToolbar } from "material-table";
import { selectButtons, tableIcons } from "../../formdata";
import Button from "@material-ui/core/Button";
import { ApiCall } from "../../APIService";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { commons } from "../../commons";

class ResponsiveRanking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: "",
      loading: false,
      tableIcons: tableIcons,
      buttonArr: selectButtons,
      value: "Cadet Girl's Singles",
      playerdetails: [],
      ranking: [],
    };
  }

  handleDetailDisplay = (id, name, username) => {
    var params = {};
    params.type = "playerRankData";
    params.eventName = name;
    params.playerId = id;
    // params.client_key = "ktta";
    params.caller = "caller";
    params.apiKey = "apikey";
    params.sportID = "interestedDomainName";

    params.filterData = "userId";
    this.setState({ loading: true });
    ApiCall("POST", params, "core")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          username: username,
          playerdetails: res["tournamentInfo"],
          open: true,
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {
    var params = {};
    params.type = "assocRank";
    params.eventName = this.state.value;
    params.caller = "caller";
      params.apiKey = "apikey";
      params.sportID = "interestedDomainName";
    params.filterData = "userId";

    this.setState({ loading: true });
    ApiCall("POST", params, "core")
      .then((res) => {
        if (!res["status"]) {
          console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => res.json())
    
      .then((res) => {
        this.setState({
          loading: false,

          ranking: res["data"],
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  }

  onChange = (event, value) => {
    var params = {};
    params.type = "assocRank";
    params.eventName = value;

    params.caller = "caller";
      params.apiKey = "apikey";
      params.sportID = "interestedDomainName";
    params.filterData = "userId";

    // this.onButtonclick(value)
    this.setState({ value: value, loading: true });

    ApiCall("POST", params, "core")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          ranking: res["data"],
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      buttonArr,
      loading,
      playerdetails,
      value,
      username,
      open,
      ranking,
      tableIcons,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={1} />

        <div className={classes.root}>
          <Container maxWidth="sm">
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container>
                  <Grid item sm={12}>
                    <Typography variant="h5"> RANKING POINTS 2019</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item sm={12}>
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

                  <Grid container>
                    <Grid item sm={12} xs={12}>
                      <MaterialTable
                        title=""
                        columns={[
                          {
                            field: "userName",
                            title: "Name",

                            render: (rowData) => (
                              <Typography component="div">
                                <Link
                                  href="javascript:void(0)"
                                  onClick={(e) =>
                                    this.handleDetailDisplay(
                                      rowData.userId,
                                      value,
                                      rowData.userName
                                    )
                                  }
                                >
                                  <Titlize value={rowData.userName.trim()} />
                                </Link>
                              </Typography>
                            ),

                            cellStyle: {
                              width: "100%",
                            },
                          },

                          { field: "rank", title: "Rank" },
                        ]}
                        isLoading={loading}
                        searchFieldAlignment="right"
                        data={ranking}
                        icons={tableIcons}
                        options={{}}
                        components={{
                          Toolbar: (props) => (
                            <div>
                              <MTableToolbar {...props} />
                              <div
                                style={{
                                  padding: "0px 10px",
                                  textAlign: "left",
                                }}
                              >
                                <Typography variant="h6" gutterBottom>
                                  Players Ranking
                                </Typography>
                              </div>
                            </div>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Container>
        </div>

        <ResponsiveDailouge
          loading={loading}
          open={open}
          icons={tableIcons}
          playerdata={ranking}
          playername={username}
          detaildata={playerdetails}
          onClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(customStyles)(ResponsiveRanking));
