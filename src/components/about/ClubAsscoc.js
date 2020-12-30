import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Topbar from "../landingPage/TopBar";

import CssBaseline from "@material-ui/core/CssBaseline";

import newsStyles from "../../styles/newsStyle"
import {aboutMenu }from "../../formdata"




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



class ClubAssociation extends Component {
    state = {
        value:this.props.location.asssocval?this.props.location.asssocval: 0,
        //activeIndex: 0,

    };

    handleChange = (event, index
    ) => {
       
        this.setState({
            value: index,
            //activeIndex: index
        });
    };
    showComp = (index) => {


        let Found = aboutMenu.find(item => item.value === index);

        if (Found) return <div><Found.component /></div>


        return false;
    };


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { classes } = this.props;
        const { value, activeIndex} = this.state;
    

        return (
            <React.Fragment>
                <CssBaseline />
                <Topbar index={0}  />


              
              
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
                                              

                                            >
                                                {aboutMenu.map((item, index) => {

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
                        {this.showComp(value)}




                    </div>
             
            </React.Fragment>
        );

    }
}

export default withRouter(withStyles(newsStyles)(ClubAssociation));
