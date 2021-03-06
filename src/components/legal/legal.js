import React from "react";
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
import InfoComponent from "../../commons/genricComponents/infoComponent";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Titlize from "../../commons/genricComponents/titlize";
//legal component of navigation bar displays legal informtion which allows the user to downlod pdf(legal info pdf)
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
       
    
        apiData.entity = "legal";
      
        ApiCall("POST",  apiData, "fetchData")
       
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

                if (res && res.status === "success" && res.data) {

                    this.setState({
                        legalData: res["data"],
                        
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
        
                
                  {
                    legalData.length ? (
                  legalData.map((value, index) => {
               
                  return (
                    <React.Fragment key={index}>
                      <Paper className={classes.officepaper}>
                        <Grid container className={classes.legalgrid}>
                          <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            className={classes.legalstyle}
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
                            <Divider className={classes.divider} />
                          </Grid>

                          <Grid item md={12} sm={12} xs={12}>
                            <Typography
                              gutterBottom
                              component="div"
                              variant="body1"
                            >
                              {ReactHtmlParser(value.desc)}
                            </Typography>
                          </Grid>

                          <Grid item md={12} sm={12} xs={12}>
                            <Button
                              children={false}
                              
                              href={value.url}
                              size="large"
                              startIcon={
                                <PictureAsPdfIcon
                                  className={classes.closeicon}
                                />
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
