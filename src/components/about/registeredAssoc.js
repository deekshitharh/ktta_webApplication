import Typography from "@material-ui/core/Typography";

import React, { Component } from "react";
import Topbar from "../landingPage/TopBar"; 
import PhoneIcon from '@material-ui/icons/Phone';
import { registred_association } from "../../formdata";

import Titlize from "../../commons/genricComponents/titlize";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { borders } from '@material-ui/system';
import Slide from '@material-ui/core/Slide';
import CardHeader from '@material-ui/core/CardHeader';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Slider from "react-slick";
import newsStyles from "../../styles/newsStyle";
import RoomIcon from "@material-ui/icons/Room";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2
} from "react-html-parser";
import { commons } from "../../commons";

const transitionDuration = 1000;


class RegisterdAssoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registredAssoc: registred_association
        };
  }
  
  abrrevatedData = (val) => {
    const data = val.substring(0, 4)
    return data.toUpperCase()
  }



    //    registredClubsdata = () => {
    //      const  clubData=  registered_clubs.map(el => { return  el.data});
    //         this.setState({ registredClub: clubData });
    //     }


    render() {
        const { classes } = this.props;
        const { registredAssoc } = this.state
      var sortedArray = commons.sortArray(registredAssoc,"assoc");
        return (
          <React.Fragment>
            <CssBaseline />

            <div className={classes.root}>
              {/* <Grid container justify="center"> */}

              <Slide
                direction="down"
                in={true}
                timeout={transitionDuration}
                mountOnEnter
                unmountOnExit
              >
                <Paper elavation={10} square={false}>
                  <Grid container spacing={2}>
                    {sortedArray.map((value, index) => {
                      return (
                        <Grid
                          item
                          md={3}
                          sm={6}
                          xs={12}
                          key={index}
                        
                        >
                          <Card
                            className={classes.assoccard}
                          >
                            <CardHeader
                              title={value.abbrevationAssociation ? (value.abbrevationAssociation).toUpperCase() : this.abrrevatedData(value.associationName)}
                            
                              style={{ textAlign: "center" }}
                            />

                            <CardContent>
                              <Grid container direction="row">
                                <Grid item md={1} xs={1} sm={1}>
                                  <LocationCityIcon />
                                </Grid>
                                <Grid item md={11} xs={11} sm={11}>
                                  <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    {value.associationName
                                      ? <Titlize value={value.associationName} />
                                      : ""}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid container direction="row">
                                <Grid item md={1} xs={1} sm={1}>
                                  <MailOutlineIcon />
                                </Grid>
                                <Grid item md={11} xs={11} sm={11}>
                                  <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    {value.emailAddress
                                      ? value.emailAddress.toLowerCase()
                                      : ""}
                                  </Typography>
                                </Grid>
                              </Grid>
                              
                             

                              <Grid container direction="row">
                                <Grid item md={1} xs={1} xm={1}>
                                  <PhoneIcon />
                                </Grid>
                                <Grid item md={11} xs={11} sm={11}>
                                  <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    {value.phoneNumber}
                                  </Typography>
                                </Grid>
                              </Grid>

                              <Grid container direction="row">
                                <Grid item md={1} sm={1} xs={1}>
                                  <RoomIcon />
                                </Grid>
                                <Grid item md={11} sm={11} xs={11}>
                                  <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    {value.address}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Slide>
            </div>
          </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(RegisterdAssoc);
