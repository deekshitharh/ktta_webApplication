import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ViewMorePage from "../components/landingPage/linkpage";
import Titlize from "../commons/genricComponents/titlize";
import customStyles from "../styles/genricStyle";
import LinesEllipsis from "react-lines-ellipsis";
import ReactHtmlParser from "react-html-parser";
import Button from "@material-ui/core/Button";
import Topbar from "../components/landingPage/TopBar"; 
//import {newsData} from "../../formdata"
import RefreshLoader from "../commons/genricComponents/pageloader";
import { uiCommons } from "../commons";
import { ApiCall } from "../APIService";
import { API_URL } from "../globalUrls";
import { commons } from "../commons";
import InfoComponent from "../commons/genricComponents/infoComponent";
const gridColumns = 2;
const gridRows = 3;

 class GenricNewsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: [],
            filepath: "",
            loading: false
        };
    }
//api fo getting news
    loadNewsData = () => {
        let apiData = {};
        apiData.tableName = "news";
        apiData.client_key = "ktta";
        apiData.type = "getData";
        this.setState({ loading: true });
        ApiCall("POST", apiData, "getData")
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    loading: false,
                    newsData: res["getData"],
                    filepath: res["imagePath"],
                });
            })
            .catch((error) => {
                commons.errorLog(error)
            });
    };
    componentDidMount = () => {
        this.loadNewsData();
    };

    render() {
        const { classes, type } = this.props;
        const { newsData, loading, filepath} = this.state;
        let filteredata = newsData.filter(item => item.image && item.title !=='');
        const newsValues = commons.genricGrid(filteredata, gridRows, gridColumns);


        return (
          <div className={classes.root}>
            {type === "landing" ? (
              <Paper elevation={3}>
                <div style={{ display: "flex" }}>
                  <Typography variant="h6" component="h6" style={{ flex: 1 }}>
                    {" "}
                    Latest News
                  </Typography>
                  <ViewMorePage
                    pathname="/newsdata"
                    title="VIEW ALL"
                    index={false}
                  />
                </div>
                <Divider />
                <Grid container justify="center">
                  {filteredata.length ? (
                    newsValues.map((gridRow, gridIndex) => {
                      let newsDetails = gridRow.colums;

                      return (
                        <Grid container spacing={2} key={gridIndex}>
                          {newsDetails.map((newsRow, newsIndex) => {
                            let gridColumnData = uiCommons.getGrid(gridColumns);
                            if (newsIndex < gridColumns) {
                              return (
                                <Grid
                                  item
                                  md={gridColumnData.md}
                                  xs={gridColumnData.xs}
                                  key={newsIndex}
                                  style={{ display: "flex" }}
                                >
                                  <Card style={{ display: "flex", margin: 5 }}>
                                    <CardMedia
                                      component="img"
                                      // image={newsRow.img}
                                      className={classes.horiCardMedia}
                                      src={
                                        newsRow.image
                                          ? API_URL +
                                            `${filepath}` +
                                            "/" +
                                            `${newsRow.image}`
                                          : ""
                                      }
                                    />
                                    <CardContent
                                      component={Link}
                                      to={`/detailednews/${newsRow.id}`}
                                    >
                                      <Typography
                                        className={classes.newsfont}
                                        variant="h6"
                                      >
                                        <Titlize value={newsRow.title} />
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              );
                            }
                          })}
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
            ) : (
              <React.Fragment>
                  <Topbar index={0}  />

                {/* <Grid container justify="center"> */}

                <Grid
                  spacing={1}
                  alignItems="center"
                  justify="center"
                  align="center"
                  container
                >
                  {/* <Grid item xs={12} md={12}> */}

                  <RefreshLoader display="overlay" loading={loading} />

                  <Paper elavation={1}>
                    {newsData.length ? (
                      newsData.map((value, index) => {
                        return (
                          <Card className={classes.card} key={index}>
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                md={4}
                                style={{ height: "100%" }}
                              >
                                <CardMedia
                                  component="img"
                                  alt=""
                                  src={
                                    value.image
                                      ? API_URL +
                                        `${filepath}` +
                                        "/" +
                                        `${value.image}`
                                      : ""
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={8}>
                                <CardContent>
                                  <Typography gutterBottom variant="h5">
                                    <Titlize
                                      value={
                                        value.title !== null ? value.title : ""
                                      }
                                    />
                                  </Typography>
                                  <Divider style={{ height: 2 }} />

                                  <Typography>
                                    <LinesEllipsis
                                      text={
                                        value.description !== null
                                          ? ReactHtmlParser(value.description)
                                          : ""
                                      }
                                      ellipsis="..."
                                      trimRight
                                      basedOn="letters"
                                    />
                                  </Typography>
                                </CardContent>

                                <CardActions className={classes.newscardaction}>
                                  <Button
                                    className={classes.buttonend}
                                    component={Link}
                                    // to={{
                                    //   pathname: "/detailednews",
                                    //   myCustomProps: value.id,
                                    //   myCustomProps2: filepath
                                    // }}
                                    to={`/detailednews/${value.id}`}
                                  >
                                    Read more
                                  </Button>
                                </CardActions>
                              </Grid>
                            </Grid>
                          </Card>
                        );
                      })
                    ) : (
                      <InfoComponent
                        variant="h4"
                        message="No Data available yet!!!"
                      />
                    )}
                  </Paper>
                </Grid>
                {/* </Grid> */}
                {/* </Grid> */}
              </React.Fragment>
            )}
          </div>
        );
    }
}
export default withRouter(withStyles(customStyles)(GenricNewsContent));