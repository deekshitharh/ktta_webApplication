import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import customStyles from "../../../styles/genricStyle";
import Topbar from "../../landingPage/TopBar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logout from "../../login/dashboardcomp/logout";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Grid from "@material-ui/core/Grid";
import { ApiCall } from "../../../APIService";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { commons } from "../../../commons";
import formValidation from "../../../commons/formfunction";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";

import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { dashboardData } from "../../../formdata";
import Container from "@material-ui/core/Container";
import Downloadpdf from "../../tournaments/ViewsDraws/drawsDialouge";
import { Paper } from "@material-ui/core";
import { sessioncommons } from "../../../commons";
import RefreshLoader from "../../../commons/genricComponents/pageloader";
import DescriptionIcon from "@material-ui/icons/Description";
//dashboard component  redirected after login
//parent compoent for givenetries.js,userprofile.js,viewprospectus.js
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
      pdata: false,
      value: 0,
      name: "",
      activeStep: 0,
      uploadedFile: null,
      error: {},
      open: true,
      message: "",
      playerDetails: {},
      requestStatus: "",
      uploadedstatus: {},
      iduploaded: null,
      loading: false,
      notup: false,
      uploaded: false,
      userStatus: null,
      pdfopen: false,
      prosvalue: "Prospectus",
      download: false,
      ViewPdf: "",
      validPdf: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  logout = () => {
    this.setState({ logout: true });
  };

  handleChange = (event, index) => {
    let Found = dashboardData.find((item) => item.value === index);
    this.setState({
      value: Found.value,
    });
  };
  //displaying dashboard components
  showComp = (index) => {
    let Found = dashboardData.find((item) => item.value === index);

    if (Found)
      return (
        <div>
          <Found.component />
        </div>
      );

    return false;
  };
  downloaddraws = () => {
    this.setState({
      download: true,
    });
  };

  handleClose = () => {
    this.setState({
      pdfopen: false,
    });
  };
//downloading prospectus in dashboard.js
  componentDidMount() {
    this.setState({ pdfopen: false });
    let data = "http://karnatakatt.com/pdf/fp-prospectus.pdf";
    this.setState({
      loading: false,
      ViewPdf: data,
      pdfopen: true,
      validPdf: true,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      download,
      pdata,
      open,
      loading,
      value,
      pdfopen,
      validPdf,
      ViewPdf,
      prosvalue,
    } = this.state;

    const tname = sessioncommons.getTournament();
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3} />
        <div className={classes.rootDashboard}>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              {!open ? (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              )}
            </div>
            <Divider />
            <List>
              {" "}
              {dashboardData.map((nestedItem, index) => {
                return (
                  <ListItem
                    className={classes.ListItemu}
                    key={index}
                    selected={value === index}
                    button
                    onClick={(e) => this.handleChange(e, index)}
                  >
                    <ListItemIcon>
                      {nestedItem.icon ? nestedItem.icon : ""}
                    </ListItemIcon>
                    <ListItemText primary={nestedItem.label} />
                  </ListItem>
                );
              })}
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer}>
              <Grid container className={classes.dashboardcomp}>
                <Grid className={classes.statistics}>
                  <Typography gutterBottom variant="h4" component="span">
                    KTTA
                  </Typography>
                </Grid>

                <Grid>
                  <Button
                    onClick={this.downloaddraws}
                    className={classes.dashboardtext}
                    startIcon={<DescriptionIcon />}
                  >
                    Prospectus
                  </Button>
                </Grid>

                <Grid>
                  <Button onClick={this.logout} startIcon={<ExitToAppIcon />}>
                    Logout
                  </Button>
                  {this.state.logout && <Logout />}
                </Grid>
              </Grid>
            </div>
            <Divider />
            <Container maxWidth="md">
              <Grid alignItems="center" justify="center" container>
                <Grid item xs={12} md={12}>
                  <Paper className={classes.contentpaper}>
                    {pdata && (
                      <Grid align="center" justify="center" container>
                        <Grid>
                          <RefreshLoader style="normal" loading={loading} />
                        </Grid>
                      </Grid>
                    )}

                    <Grid container>
                      <Grid container align="center">
                        <Grid item md={12} sm={10} xs={11}>
                          <Typography gutterBottom variant="h3">
                            {tname.tournamentName}
                          </Typography>
                        </Grid>

                        <Divider />

                        <Grid item md={12}>
                          {this.showComp(value)}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>

                  {download ? (
                    <Downloadpdf
                      open={pdfopen}
                      view={validPdf}
                      ViewPdf={ViewPdf}
                      tounamentgroup={prosvalue}
                      onClose={this.handleClose}
                      test={true}
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(customStyles)(Dashboard));
