import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Topbar from "../landingPage/TopBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import customStyles from "../../styles/genricStyle";
import { tournamentmenu } from "../../formdata";
import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";
//parent component for view for displaying matchresults,downloaddraws.js,viewentries.js
class Entriesdraws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      activeIndex: 0,
      data: this.props.location.myCustomProps,
    };
  }

  handleChange = (event, index) => {
    this.setState({
      value: index,
      activeIndex: index,
    });
  };

  showComp = (index) => {
    let menuSelection = tournamentmenu.find((item) => item.value === index);
    if (menuSelection && menuSelection.component)
      return (
        <div>
          <menuSelection.component data={this.state.data} />
        </div>
      );

    return false;
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;
    const { value, activeIndex } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3} />

        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Grid container spacing={1}>
                <Grid item md={8} sm={8} xs={8} className={classes.viewClubs}>
                  <div className={classes.tabContainer}>
                    <Tabs
                      onChange={this.handleChange}
                      value={value}
                      indicatorColor="primary"
                      classes={{
                        indicator: classes.indicator,
                      }}
                      textColor="primary"
                    >
                      {tournamentmenu.map((item, index) => {
                        return (
                          <Tab
                            key={index}
                            selected
                            classes={{ root: classes.tabItem }}
                            label={item.label}
                          />
                        );
                      })}
                    </Tabs>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {this.showComp(activeIndex)}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(customStyles)(Entriesdraws));
