import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";


import Card from "@material-ui/core/Card";

import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ViewMorePage from "../components/landingPage/linkpage";
import Titlize from "../commons/genricComponents/titlize";
import customStyles from "../styles/genricStyle";
import Topbar from "../components/landingPage/TopBar";
import RefreshLoader from "../commons/genricComponents/pageloader";
import { ApiCall } from "../APIService";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { commons } from "../commons";
import pageBanner from "../config/bannerConfig";
import InfoComponent from "../commons/genricComponents/infoComponent";
//genric component for dispalying the data in landing page  and detailing page of about/officebearers.js component
class GenricOfficebearers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            officeData: [],
            imagepath: "",
            loading: false,
        };
    }

    //api to get officebearers data
    loadOfficebearersData = () => {
        var params = {};




        params.entity = "officeBearers";
       
        this.setState({ loading: true });
        ApiCall("POST", params, "fetchData")

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
                    officeData: res["data"],
                   
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
        const { officeData, loading } = this.state;
        let filteredImage = officeData.filter(item => item.url!= "");
        const defaultlogo = pageBanner("OfficeBeaers");
        let filteredData = filteredImage.slice(0, 4);
        return (
          <div className={classes.root}>
            {type === "landing" ? (
              <React.Fragment>
                <div className={classes.flexView}>
                  <Typography variant="h6" component="h6" className={classes.statistics}>
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
                            className={classes.flexView}
                            key={index}
                          >
                            <Card className={classes.imagecard}>
                              <CardMedia
                                className={classes.media}
                                component="img"
                              
                                src={
                                  value.url
                                    ?  value.url
                                    : defaultlogo
                                }
                              />
                              <CardContent className={classes.textcentre}>
                                <Typography gutterBottom variant="h6">
                                  <Titlize value={value.name}/>
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
                  <Topbar index={0}  />
                <div className={classes.root}>
                  
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
                              className={classes.flexView}
                              key={index}
                            >
                              <Card className={classes.imagecard}>
                                <CardMedia
                                  className={classes.media}
                                  component="img"
                                  
                                  src={
                                    value.url
                                      ?  value.url
                                      : defaultlogo
                                  }
                                />

                                <CardContent className={classes.textcentre}>
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
