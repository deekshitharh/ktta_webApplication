import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import pageBanner from "../config/bannerConfig";
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
//genric component for dispalying the data in landing page  and detailing page of news/newsinfo.js component
class GenricNewsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      filepath: "",
      loading: false,
    };
  }
  //api fo getting news
  loadNewsData = () => {
    let apiData = {};
    apiData.entity = "news";
    this.setState({ loading: true });
    ApiCall("POST", apiData, "fetchData")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          newsData: res["data"],
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };
  componentDidMount = () => {
    this.loadNewsData();
  };

  render() {
    const { classes, type } = this.props;
    const { newsData, loading, filepath } = this.state;

    let filteredata = newsData.filter((item) => item.url && item.title !== "");
    const newsValues = commons.genricGrid(filteredata, gridRows, gridColumns);
    const defaultlogo = pageBanner("news");

    return (
      <div className={classes.root}>
        {type === "landing" ? (
          <Paper elevation={3}>
            <div className={classes.flexView}>
              <Typography
                variant="h6"
                component="h6"
                className={classes.regclubs}
              >
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
                            >
                              <Card className={classes.newsCard}>
                                <CardMedia
                                  component="img"
                                  className={classes.horiCardMedia}
                                  src={newsRow.url ? newsRow.url : defaultlogo}
                                />
                                <CardContent
                                  component={Link}
                                  to={`/detailednews/${newsRow._id}`}
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
            <Topbar index={0} />

            <Grid
              spacing={1}
              alignItems="center"
              justify="center"
              align="center"
              container
            >
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
                            className={classes.gridpaper}
                          >
                            <CardMedia
                              component="img"
                              alt=""
                              src={value.url ? value.url : defaultlogo}
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
                              <Divider className={classes.divider} />

                              <Typography>
                                <LinesEllipsis
                                  text={
                                    value.desc !== null
                                      ? ReactHtmlParser(value.desc)
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
                                to={`/detailednews/${value._id}`}
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
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default withRouter(withStyles(customStyles)(GenricNewsContent));
