import React from "react";
//import AuthService from "../service/AuthService";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ReactHtmlParser from "react-html-parser";
import { withStyles } from "@material-ui/core/styles";
import { ApiCall } from "../../APIService";
import { API_URL } from "../../globalUrls";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import customStyles from "../../styles/genricStyle";
import Topbar from "../landingPage/TopBar";
//import { APIService } from "../service";
import InfoComponent from "../../commons/genricComponents/infoComponent";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Titlize from "../../commons/genricComponents/titlize";
class Legal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyData:"",
            legalData: [],
            pdfPath: null,
        };
    }

    loadlegaldata = () => {
        let apiData = {};
        apiData.tableName = "legal";
      //  apiData.client_key = "ktta";
        apiData.type = "getData";
      
        ApiCall("POST", apiData, "getData")
       
            .then((res) => {

                if (res.ok) {
                    return res.json()
                } else if (res.status === 404) {
                    return Promise.reject('error 404')
                } else {
                    return Promise.reject('some other error: ' + res.status)
                }
            })

            .then((res) => {

                if (res && res.status === "success" && res.getData) {

                    this.setState({
                        legalData: res["getData"],
                        pdfPath: res["imagePath"],
                    });

                }    

                else {
                    this.setState({
                        emptyData: "No data available"
                    })
                }
              
            })
            .catch((error) => {
                this.setState({
                  emptyData: "No data available"
                });
               
            });
    };
    componentDidMount = () => {
        this.loadlegaldata();
    };

    handleViewPdf = (docname) => {
        const { pdfPath } = this.state;

        if (pdfPath) {
            const pdffile = API_URL + pdfPath + "/" + docname;
            window.open(pdffile);
        }
    };

    render() {
        const { classes } = this.props;

        const { legalData, pdfPath, emptyData } = this.state;
       
        return (
          <React.Fragment>
            <CssBaseline />
            <Topbar index={2}  />
            <div className={classes.root}>
              <Paper className={classes.officepaper}>
                {emptyData.length ? (
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography
                      gutterBottom
                      variant="h2"
                      style={{ marginLeft: "5px" }}
                    >
                      {emptyData}
                    </Typography>
                  </Grid>
                ) : (
                  ""
                )}
                
                  {
                    legalData.length ? (
                  legalData.map((value, index) => {
               
                  return (
                    <React.Fragment key={index}>
                      <Paper className={classes.officepaper}>
                        <Grid
                          container
                          style={{ marginTop: 10 }}
                        
                        >
                          <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.05)",
                              color: "black",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {" "}
                              <b>
                                <Titlize value={value.title} />
                              </b>
                            </Typography>
                            <Divider style={{ height: "3px" }} />
                          </Grid>

                          <Grid item md={12} sm={12} xs={12}>
                            <Typography
                              gutterBottom
                              component="div"
                              variant="body1"
                            >
                              {ReactHtmlParser(value.description)}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            // style={{ display: flex}}
                          >
                            <Button
                              children={false}
                              target="_"
                              href={
                                API_URL +
                                `${pdfPath}` +
                                "/" +
                                `${value.documentName}`
                              }
                              color="primary"
                              size="large"
                              //onClick={(e) => this.handleViewPdf(value.documentName)}
                              // style={{ alignContent: "flex-end" }}
                              startIcon={
                                <PictureAsPdfIcon style={{ color: "white" }} />
                              }
                            ></Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </React.Fragment>
                  );
                  })
                  ) : (
                <InfoComponent
                  variant="h4"
                  message="No Data available yet!!!"
                />
              )}
              </Paper>
            </div>
          </React.Fragment>
        );
    }
}
export default withRouter(withStyles(customStyles)(Legal));
