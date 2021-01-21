import Typography from "@material-ui/core/Typography";
import Slide from '@material-ui/core/Slide';

import React from "react";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import RefreshLoader from "../commons/genricComponents/pageloader";


import Paper from "@material-ui/core/Paper";



import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import customStyles from "../styles/genricStyle";
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from "@material-ui/icons/Room";

import CardHeader from '@material-ui/core/CardHeader';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Titlize from "../commons/genricComponents/titlize";
import withStyles from "@material-ui/core/styles/withStyles";


import Divider from "@material-ui/core/Divider";
import ViewMorePage from "../components/landingPage/linkpage";

import { uiCommons } from "../commons";
import { ApiCall } from "../APIService";

import { commons } from "../commons";
const transitionDuration = 1000;
const gridColumns = 4;
const gridRows = 2;

//genric component for dispalying the data in landing page  and detailing page of Registeredassociation component

class GenicRegisteredAssoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
            registredAssoc: [],
            loading: false,
            
        };
    }


//api to get registered club data
    loadAssocData = () => {
     
        let params = {};

       
        params.type = "getAcademyListForGivenAssoc";

      
        this.setState({ loading: true });
        ApiCall("POST", params, "coreApi")
            .then((res) => res.json())
            .then((res) => {
                if (res && res.status === "success" && res.data) {
              
                    this.setState({
                        loading: false,
                        registredAssoc: res["data"],
                    });

                    }
                  
                    else
                    this.setState({
                         loading: false,
                        message: res.message
                    })
                
           
           
            })
            .catch((error) => {
                commons.errorLog(error)
            });
    };

    componentDidMount = () => {
        // this.timer = setTimeout(() => this.progress(5), 1000);
        this.loadAssocData();
    };

  

    render() {
        const { classes, type } = this.props;
        const { message, loading,registredAssoc} = this.state

        const clubData = commons.genricGrid(registredAssoc, gridRows, gridColumns)
        var random = commons.sortArray(registredAssoc, "assoc");

        return (

            <div className={classes.root}>

                {type === "landing" ?
                    <React.Fragment>
                        <div  className={classes.flexView}>
                            <Typography variant="h6" component="h6" className={classes.statistics}>
                                {" "}
                                Registered Associations
                                </Typography>
                                <ViewMorePage pathname="/registreredclubs_Assoc" title="MORE" index={true}/>
                        </div>
                        <Divider />

                        <Grid align="center" justify="center" container>
                            <Grid>
                                <RefreshLoader display="normal" loading={loading} />
                            </Grid>

                            {clubData.map((clubRow, clubIndex) => {

                                let clubs = commons.shuffleArray(clubRow.colums);
                                let sorted = commons.sortArray(clubs, "assoc");
                                return (<Grid container

                                    key={clubIndex}
                                    alignItems="stretch">
                                    { sorted.length?
                                        
                                        sorted.map((newsRow, newsIndex) => {
                                        let gridColumnData = uiCommons.getGrid(gridColumns);
                                        return (
                                            <Grid
                                                item
                                                md={gridColumnData.md}
                                                xs={gridColumnData.xs}
                                                key={newsIndex}
                                                style={{}}
                                            >
                                                <Card className={classes.basicard}>
                                                    <CardHeader
                                                        className={classes.basicheader}

                                                        title={newsRow.abbrevationAcademy ? (newsRow.abbrevationAcademy).toUpperCase() : commons.abrrevatedData(newsRow.clubName)}

                                                    />
                                                </Card>
                                            </Grid>
                                        );

                                        }) : (<Typography
                                            color="error" variant="subtitle2" style={{ margin: '5px', width: '500px', overflowWrap: 'break-word' }}>
                                        {message}</Typography>)}

                                </Grid>
                                )
                            })}

                        </Grid>
                    </React.Fragment>


                    :


                    <React.Fragment>

                        <RefreshLoader type="linear" loading={loading} variant="determinate" />

                        <div className={classes.root}>
                          

                            <Slide direction="down" in={true} timeout={transitionDuration} mountOnEnter unmountOnExit>

                                <Paper elavation={10} square={false}>


                                    <Grid container spacing={2}>
                                        {random.map((value, index) => {
                                            return (
                                                <Grid item md={3} sm={6} xs={12} key={index}

                                                >
                                                    <Card
                                                        className={classes.assoccard}

                                                    >
                                                        <CardHeader
                                                            title={value.abbrevationAcademy ? (value.abbrevationAcademy).toUpperCase() : commons.abrrevatedData(value.clubName)}
                                                            style={{ textAlign: "center" }}
                                                        />

                                                        <CardContent>
                                                            <Grid container direction="row">
                                                                <Grid item md={1} xs={1} sm={1}>
                                                                    <LocationCityIcon />
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    md={11}
                                                                    xs={11}
                                                                    sm={11}
                                                                    style={{ paddingLeft: "5px" }}
                                                                >
                                                                    <Typography
                                                                        gutterBottom
                                                                        variant="subtitle1"
                                                                    >
                                                                        {value.clubName
                                                                            ? <Titlize value={value.clubName} />
                                                                            : ""}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>



                                                            <Grid container direction="row">
                                                                <Grid item md={1} xs={1} sm={1}>
                                                                    <MailOutlineIcon />
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    md={11}
                                                                    xs={11}
                                                                    sm={11}
                                                                    style={{ paddingLeft: "5px" }}
                                                                >
                                                                    <Typography
                                                                        gutterBottom
                                                                        variant="subtitle1"
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








                }
            </div>
        );
    }
}

export default withStyles(customStyles)(GenicRegisteredAssoc);
