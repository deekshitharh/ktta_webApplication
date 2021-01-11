import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Switch, Box} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { menuData } from "../../formdata";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { ApiCall } from "../../APIService";
import { API_URL } from "../../globalUrls";
import { commons } from "../../commons";
// color:#d90404
import customStyles from "../../styles/genricStyle";
import {
  List,
  AppBar,
  Toolbar,
  Paper,
  Tabs,
  Tab,
  Popper,
  MenuList,
  MenuItem,
 
} from "@material-ui/core";

import pageBanner from "../../config/bannerConfig";
//import Theme from "./styles/customTheme.js";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkState: true,
      logopath: [],
      nestedclick: null,
      selected: null,
      filepath: "",
      value: this.props.index ? this.props.index : 0,
      menuDrawer: false,
      menuList: [],
      open: false,
      anchorEl: null,
      currentLabel: "HOME",
    };
  }
 
  loadMediaData = () => {
    let apiData = {};
    apiData.tableName = "aboutus";
    //apiData.client_key = "ktta";
    apiData.type = "getData";

    ApiCall("POST", apiData, "getData")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          logopath: res["getData"],
          filepath: res["imagePath"],
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };
  componentDidMount = () => {
    this.loadMediaData();
  };

  handleDrawerClick1 = (event, item, index) => {
   
    //const { nestedclick } = this.state;
    this.setState({
      nestedclick: index,
    });
  };

  handleDrawerClick = (event, item, index) => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  handleChange = (event, value) => {
    this.setState({ value: value });
  };
  //function of tab click
  handleMenuClick = (e, item) => {
    console.log("new file");
    // if (e.target.textContent === "PLAYERS")
    // og('label name', e.target.textContent)
    this.setState({
      currentLabel: item.label,
    });
  };

  //function on hover
  handleMenuOpen = (event, item) => {
    const { currentTarget } = event;
    let curMenuList = [];
    if (item.choices && item.choices.length) {
      curMenuList = item.choices;
    }

    this.setState({
      open: true,

      anchorEl: currentTarget,
      //value: item.value,

      menuList: curMenuList,
    });
  };

  handleMenuClose = () => {
    const currentLabel = this.state.value;
    //const val = menuData.filter(item => `#${item.pathname}` === location || item.choices?.filter(choice => `#${choice.pathname}` === location))[0].value
    const val = menuData.find((item) => item.value === currentLabel).value;

    this.setState({
      open: false,
      anchorEl: null,
      value: val,
    });
  };
  handleThemeChange = (x) => {
    let checked = x.target.checked
    this.setState((prevState) => ({
      darkState: !prevState.darkState,
    }));
   

    this.props.tokenChange(checked ? "dark" : "light");
    checked 
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  };




  handleClick1 = (event, index) => {
    //const { nestedclick } = this.state;
   
    
    this.setState({ nestedclick: index });
  
  };
 

  handleInputSearch = () => {};

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  };

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  };

  renderMenu = () => {
    const {
     
      open,
      nestedclick,
     
      value,
    
    } = this.state;
    return menuData && menuData.length ? (
      <List>
        {menuData.map((item, index1) => {
          if (item.choices && item.choices.length) {
            return (
              <div key={index1}>
                <ListItem
                  button
                  onClick={(e) => this.handleDrawerClick(e, item, index1)}
                >
                  <ListItemIcon>{item.icon ? item.icon : ""}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.choices.map((nestedItem, index) => {
                      console.log("state", nestedclick);
                      return (
                        <ListItem
                          key={index}
                          button
                          onClick={(e) =>
                            this.handleDrawerClick1(e, item, index1)
                          }
                          selected={nestedclick === index}
                          //className={classes.nested}
                          component={Link}
                          to={{
                            pathname: nestedItem.pathname,
                            search: this.props.location.search,
                          }}
                        >
                          <ListItemIcon>
                            {nestedItem.icon ? nestedItem.icon : ""}
                          </ListItemIcon>
                          <ListItemText primary={nestedItem.name} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          } else {
            return (
              <ListItem
                selected={value === index1}
                component={Link}
                to={{
                  pathname: item.pathname,
                  search: this.props.location.search,
                  hash: item.hash ? item.hash : "",
                }}
                button
                key={item.label}
              >
                <ListItemIcon>{item.icon ? item.icon : ""}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          }
        })}
      </List>
    ) : (
      <div></div>
    );
  };

  componentDidMount() {}

  render() {
    const { classes, tab } = this.props;

    const {
      anchorEl,
      
      open,
      darkState,
    
      filepath,
      logopath,
      menuList,
      
    } = this.state;
    const defaultlogo = pageBanner("topBar");
  
   
   
    return (
      <div
        className={classes.root}
        onMouseLeave={this.handleMenuClose.bind(this)}
      >
        <AppBar position="relative" color="default">
          <Toolbar>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} className={classes.flex}> */}
              {logopath.length === 0 ? (
                <Grid
                  item
                  md={4}
                  sm={10}
                  xs={10}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    maxWidth: "100%",
                    //backgroundSize: "cover",
                    // backgroundPositionX: 'left',
                    background: `url(${defaultlogo} )  bottom no-repeat `,
                    backgroundPosition: "left",
                    backgroundSize: "contain",
                  }}
                ></Grid>
              ) : (
                ""
              )}

              {logopath.map((value, index) => {
                return (
                  <Grid
                    item
                    md={4}
                    sm={10}
                    xs={10}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      maxWidth: "100%",
                      //backgroundSize: "cover",
                      // backgroundPositionX: 'left',
                      background: `url(${API_URL + `${filepath}` + "/" + `${value.logo}`} )  bottom no-repeat `,
                      backgroundPosition: "left",
                      backgroundSize: "contain",
                    }}
                  >
                    <div></div>
                  </Grid>
                );
              })}
              <Grid item md={8} sm={2} xs={2}>
                {(!this.props.noTabs || tab) && (
                  <React.Fragment>
                    <div className={classes.iconContainer}>
                      <IconButton
                        onClick={this.mobileMenuOpen}
                        className={classes.iconButton}
                        color="inherit"
                        aria-label="Menu"
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <div className={classes.tabContainer}>
                      <SwipeableDrawer
                        classes={{
                          paper: classes.swipeableDrawer, // class name, e.g. `classes-nesting-root-x`
                        }}
                        anchor="right"
                        open={this.state.menuDrawer}
                        onClose={this.mobileMenuClose}
                        onOpen={this.mobileMenuOpen}
                      >
                        <AppBar title="Menu" />

                        {this.renderMenu()}
                      </SwipeableDrawer>
                      {/* <Grid
                      alignItems="flex-start"
                      justify="flex-end"
                      direction="row"
                      md={8}
                      container
                    > */}

                      <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        classes={{
                          indicator: classes.indicator,
                        }}
                        centered
                      >
                        {menuData.map((item, index) => {
                          return (
                            <Tab
                              key={index}
                              selected
                              onChange={this.handleChange}
                              onMouseOver={(e) => this.handleMenuOpen(e, item)}
                              //onClick={(e)=> this.handleMenuClick(e ,item)}
                              component={Link}
                              to={{
                                pathname: item.pathname,
                                search: this.props.location.search,
                              }}
                              classes={{ root: classes.tabItem }}
                              label={item.label}
                              aria-owns={open ? "menu-list-grow" : undefined}
                              aria-haspopup={"true"}
                            />
                          );
                        })}
                      </Tabs>

                      {menuList && menuList.length ? (
                        <Popper
                          open={open}
                          anchorEl={anchorEl}
                          id="menu-list-grow"
                        >
                          <Paper>
                            <MenuList>
                              {menuList.map((value, index) => {
                                return (
                                  <MenuItem
                                    component={Link}
                                    to={{
                                      pathname: value.pathname,
                                      search: this.props.location.search,
                                    }}
                                    key={index}
                                    //onClick={(e) => this.handleMenuClick(e, value)}
                                    onClick={this.handleMenuClose}
                                  >
                                    {value.name}
                                  </MenuItem>
                                );
                              })}
                            </MenuList>
                          </Paper>
                        </Popper>
                      ) : (
                        ""
                      )}
                    </div>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle1" align="center">
                Light
              </Typography>
              <Switch checked={darkState} onChange={this.handleThemeChange} />
              <Typography variant="subtitle1" align="center">
                Dark
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(customStyles)(Topbar));
