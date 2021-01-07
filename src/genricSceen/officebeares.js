import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Slider from "react-slick/lib";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ViewMorePage from "../components/landingPage/linkpage";
import Titlize from "../commons/genricComponents/titlize";
import customStyles from "../styles/genricStyle";
import LinesEllipsis from "react-lines-ellipsis";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2
} from "react-html-parser";
import Button from "@material-ui/core/Button";
import Topbar from "../components/landingPage/TopBar";
//import {newsData} from "../../formdata"
import RefreshLoader from "../commons/genricComponents/pageloader";
import { uiCommons } from "../commons";
import { ApiCall } from "../APIService";
import { API_URL } from "../globalUrls";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { commons } from "../commons";
import InfoComponent from "../commons/genricComponents/infoComponent";

class GenricOfficebearers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            officeData: [],
            imagepath: "",
            loading: false,
        };
    }
    loadOfficebearersData = () => {
        var params = {};




        params.tableName = "officebearers";
        //params.client_key = "ktta";
        params.type = "getData";
        this.setState({ loading: true });
        ApiCall("POST", params, "getData")

            .then(res => res.json())
            .then(res => {
                if (!res["status"]) {
                    console.log("api error" + res["status"])
                }
                return res;
            })
            .then(res => {

                this.setState({
                    loading: false,
                    officeData: res["getData"],
                    imagepath: res["imagePath"]
                });
            })
            .catch(error => {
                commons.errorLog(error)
            });
    };


    componentDidMount = () => {
        this.loadOfficebearersData();
    };






    render() {
        const { classes,type } = this.props;
        const { officeData, imagepath, loading } = this.state
        let filteredImage = officeData.filter(item => item.image != null);

        let filteredData = filteredImage.slice(0, 4);
        return (
          <div className={classes.root}>
            {type === "landing" ? (
              <React.Fragment>
                <div style={{ display: "flex" }}>
                  <Typography variant="h6" component="h6" style={{ flex: 1 }}>
                    {" "}
                    Office Bearers
                  </Typography>
                  <ViewMorePage
                    pathname="/officebearers"
                    title="MORE"
                    index={false}
                  />
                </div>
                <Divider />

                <Paper elavation={1} className={classes.officepaper}>
                  <Grid container spacing={2} justify="center">
                    {filteredData.length ? (
                      filteredData.map((value, index) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={3}
                            sm={6}
                            style={{ display: "flex" }}
                            key={index}
                          >
                            <Card className={classes.imagecard}>
                              <CardMedia
                                className={classes.media}
                                component="img"
                                src={
                                  value.image
                                    ? API_URL +
                                      `${imagepath}` +
                                      "/" +
                                      `${value.image}`
                                    : ""
                                }
                              />
                              <CardContent style={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h6">
                                  <Titlize value={value.name} />
                                </Typography>

                                <Typography
                                  component="div"
                                  gutterBottom
                                  variant="body1"
                                >
                                  <Titlize value={value.designation} />
                                </Typography>
                                {value.email ? (
                                  <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                  >
                                    <Grid item>
                                      <MailOutlineIcon />
                                    </Grid>

                                    <Grid item>
                                      <Typography gutterBottom variant="body1">
                                        {value.email}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  ""
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })
                    ) : (
                      <InfoComponent
                        variant="h4"
                        message="No Data available yet!!!"
                      />
                    )}
                  </Grid>
                </Paper>
              </React.Fragment>
            ) : (
              <React.Fragment>
                  <Topbar index={4}  />
                <div className={classes.root}>
                  {/* <Grid container justify="center"> */}
                  <RefreshLoader
                    type="linear"
                    loading={loading}
                    variant="determinate"
                  />
                  <Paper elavation={3} className={classes.officepaper}>
                    <Grid container spacing={2} justify="center">
                   
                      {officeData.length ? (
                        officeData.map((value, index) => {
                          return (
                            <Grid
                              item
                              md={3}
                              sm={6}
                              xs={12}
                              style={{ display: "flex" }}
                              key={index}
                            >
                              <Card className={classes.imagecard}>
                                <CardMedia
                                  className={classes.media}
                                  component="img"
                                  src={
                                    value.image
                                      ? API_URL +
                                        `${imagepath}` +
                                        "/" +
                                        `${value.image}`
                                      : ""
                                  }
                                />

                                <CardContent style={{ textAlign: "center" }}>
                                  <Typography gutterBottom variant="h6">
                                    <Titlize value={value.name} />
                                  </Typography>
                                  <Typography
                                    component="div"
                                    gutterBottom
                                    variant="body1"
                                  >
                                    <Titlize value={value.designation} />
                                  </Typography>

                                  {value.email ? (
                                    <Grid
                                      container
                                      direction="row"
                                      justify="center"
                                    >
                                      <Grid item>
                                        <MailOutlineIcon />
                                      </Grid>

                                      <Grid item>
                                        <Typography
                                          gutterBottom
                                          variant="body1"
                                        >
                                          {value.email}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })
                      ) : (
                        <InfoComponent
                          variant="h4"
                          message="No Data available yet!!!"
                        />
                      )}
                    </Grid>
                  </Paper>
                </div>
              </React.Fragment>
            )}
          </div>
        );
    }
}

export default withStyles(customStyles)(GenricOfficebearers);
