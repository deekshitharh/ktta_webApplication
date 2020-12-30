import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Topbar from "../landingPage/TopBar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import PropTypes from "prop-types";
import ViewEntries from "./ViewsDraws/viewEntries"
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import newsStyles from "../../styles/newsStyle"
import {tournamentmenu} from "../../formdata"
import Hidden from "@material-ui/core/Hidden";
import Mobileview from "../MobileView/mobileView"



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
    InputBase
} from "@material-ui/core";




class Entriesdraws extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            activeIndex: 0,
            data: this.props.location.myCustomProps,
        };
    }
   

    handleChange = (event, index
    ) => {
    
        this.setState({
            value: index,
            activeIndex: index
        });
    };




    
    showComp = (index) => {

       
        let menuSelection = tournamentmenu.find(item => item.value === index);
        if (menuSelection && menuSelection.component)
            return <div><menuSelection.component data={this.state.data}/></div>


        return false;
    };



    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { classes } = this.props;
        const { value, activeIndex, data } = this.state;
    
        return (
            <React.Fragment>
                <CssBaseline />
                <Topbar index={3}  />


              
             

                    <div className={classes.root}>



                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Grid container spacing={1}>


                                    <Grid
                                        item
                                        md={8}
                                        sm={8}
                                        xs={8}
                                        style={{ justifyContent: "left" }}
                                    >



                                        <div className={classes.tabContainer}>



                                            <Tabs
                                                onChange={this.handleChange}
                                                value={value}
                                                indicatorColor="primary"
                                                classes={{
                                                    indicator: classes.indicator
                                                }}
                                                textColor="primary"

                                            >
                                                {tournamentmenu.map((item, index) => {

                                                    return (
                                                        <Tab
                                                            key={index}
                                                            selected



                                                            data-key={index}


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

export default withRouter(withStyles(newsStyles)(Entriesdraws));
