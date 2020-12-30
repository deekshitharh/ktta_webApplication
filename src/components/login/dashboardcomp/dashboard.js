import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import newsStyles from "../../../styles/newsStyle"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Topbar from "../../landingPage/TopBar";
import { borders } from '@material-ui/system';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logout from "../../login/dashboardcomp/logout"
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from "@material-ui/core/Grid";
import { ApiCall } from "../../../APIService";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { commons } from "../../../commons";
import formValidation from "../../../commons/formfunction"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import clsx from 'clsx';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import { fileCall } from "../../../APIService"
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { dashboardData } from "../../../formdata" 
import { steps } from "../../../formdata"
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';
import Downloadpdf from "../../tournaments/ViewsDraws/drawsDialouge";
import NotificationsIcon from '@material-ui/icons/Notifications';
import ViewUserEntries from "../dashboardcomp/userVerification/viewUserEntries"
import {
   
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
import SnackPopup from "../../../commons/genricComponents/snackbar"
import { sessioncommons } from "../../../commons"
import RefreshLoader from "../../../commons/genricComponents/pageloader"
import DescriptionIcon from '@material-ui/icons/Description';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logout: false,
            pdata: false,
            value: 0,
            name: "",
            activeStep: 0,
            uploadedFile: null,
            error: {},
            open: true,
            "message": '',
            playerDetails: [],
            requestStatus: "",
            uploadedstatus: {},
            iduploaded: null,
            loading: false,
            notup: false,
            uploaded: false,

            tournamentId: this.props.match.params.id,
            pdfopen: false,
            prosvalue:"Prospectus",
            download:false,
            ViewPdf: "",
            validPdf: false,
        };
    }


    handleDrawerOpen = () => {
        this.setState({ open: true })
    };
    handleDrawerClose = () => {
        this.setState({ open: false })
    };
    logout = () => {
        this.setState({ logout: !this.state.logout })
    }

    handleChange = (event, index) => {
        
       

        let Found = dashboardData.find(item => item.value === index);
        this.setState({
            value: Found.value,
         
            //activeIndex: index
        });
    };
    showComp = (index) => {


        let Found = dashboardData.find(item => item.value === index);

        if (Found) return <div><Found.component /></div>


        return false;
    };
    downloaddraws = () => {
        this.setState({
            download: true,

            //activeIndex: index
        });
    }
    // validate = async (e)  =>
    // {
    //     const { uploadedFile, error, requestStatus } = this.state;
    //     let validFile = await formValidation.validateFile(uploadedFile);
    //     this.setState({ error: validFile });
    // }
    onSubmit = (e) => {
        e.preventDefault();
      
        let { error }=this.state
        
        let loggeduser = sessioncommons.getUser();
        let fileVal = formValidation.validateFile(this.state.uploadedFile);
        this.setState({ message: fileVal });
        if (fileVal) {
            if (!fileVal.status) {
                this.setState({ "message": fileVal.msg })
            }
            else {
                this.setState({ "message": fileVal.msg })
                let loggeduser = sessioncommons.getUser()
                let params = {};
                // params.client_key = "ktta";
                params.playerName = loggeduser.userName;
                params.affiliationId = loggeduser.affiliationId;
                params.playerEmail = loggeduser.emailAddress;
                params.file = this.state.uploadedFile;

                let fData = new FormData();

                for (let key in params) {
                    fData.append(key, params[key]);
                }
                this.setState({ loading: true });
                fileCall("POST", fData, "playerupload")
                    .then((res) => res.json())
                    .then(res => {
                        if (res.recordAdded && res.message) {
                          

                            this.setState({
                                loading: false,

                                uploadedstatus: res.message
                            })

                           
                           
                        }

                        
                    })
                    .then((res) => {
                        setTimeout(() => {
                            this.onReset();
                        }, 1000);
                    })

                    // .then((res) => {
                    //     this.setState({
                    //         uploaded: true,
                    //         notup:false
                    //     });
                    // })
                    .catch((error)=>{
                        this.setState({
                            loading: false,
                            iduploaded: false,
                            message: "Please try after some  time",
                        });

                        console.log("upload error " + error);
                    });

              
            }
        }
    };


    onChange = (e) => {
        this.setState({
            uploadedFile: e.target.files[0],
           
        });
    };


    onReset() {
       // this.refs.file.value = "";
        this.setState({
            uploaded: true,
            notup: false
        });
    }

    checkidverification = () => {
    
        let loggeduser = sessioncommons.getUser()
        let playerdata = sessioncommons.getplayerDetails()

        if (loggeduser && playerdata) {
            let affiliationId = loggeduser.affiliationId;
            let userId = playerdata.find(
                (obj) => affiliationId === obj["player_affliation_id"]
            );

            if (userId) {
                this.setState(
                    {
                       
                        notup: true,
                    },
                 
                );
            } else {
                this.setState(
                    {

                        
                        uploaded:true,
                    },
                 
                );
            }
        }





    };
    

   
    handleClose = () => {
        this.setState({

            pdfopen: false,
        });
    };




    componentDidMount() {
        const { tournamentId } = this.state;
        this.setState({ pdfopen: false });
        let data = "http://karnatakatt.com/pdf/fp-prospectus.pdf"
       

        this.setState({
            loading: false,
            ViewPdf: data,
            pdfopen: true,
            validPdf: true,
        });
        //this.checkidverification()
        {
            let apiData = {};
            apiData.tableName = "playerdetails";
            //apiData.client_key = "ktta";
            apiData.type = "getData"
            this.setState({ pdata:true, loading: true });
            ApiCall("POST", apiData, "getData")

                .then(res => res.json())
                .then((res) => {
                    if (res && res.status == "success" && res.getData) {

                        this.setState({
                            loading: false,
                            pdata: false,
                            playerDetails: res["getData"],

                        });

                    }

                    // else
                    //     this.setState({
                            
                    //         message: res.message
                    //     })

                    sessioncommons.setplayerSession(res["getData"])
                 

                }).then((res) => {
                 
                 
                   
                        this.checkidverification();
                  

                })
                
                
                
                .catch(error => {
                    commons.errorLog(error)
                });

        }



    }

    render() {
        const { classes } = this.props;
        const { activeStep, download ,pdata, uploadedstatus, notup, uploaded, message, open, loading, name, requestStatus, error, iduploaded, stepperdata, idstatus, paymentstatus, value,
              pdfopen,
            validPdf,
            ViewPdf,
            prosvalue,
            tournamentId,} = this.state
      
      
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        const tname = sessioncommons.getTournament()
        return (
            <React.Fragment>
                <CssBaseline />
                <Topbar index={3} />
                <div className={classes.rootDashboard}>
                    {/* <Grid container justify="center"> */}
                
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        <div className={classes.toolbarIcon}>
                            {!open ? (<IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            >
                                <MenuIcon/>
                            </IconButton>) : <IconButton onClick={this.handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>}
                          
                           
                        </div>
                        <Divider/>
                        <List> {dashboardData.map((nestedItem, index) => {
                            return (
                                <ListItem
                                    className={classes.ListItemu}
                                    key={index}
                                    selected={value === index}
                                    button
                                    onClick={(e) =>
                                        this.handleChange(e, index)
                                    }
                                
                                  
                                   
                                >
                                    <ListItemIcon>{nestedItem.icon ? nestedItem.icon : ''}</ListItemIcon>
                                    <ListItemText primary={nestedItem.label} />
                                </ListItem>
                                
                            );
                        })}</List>
                        <Divider />
                    
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}>
                            <Grid container style={{ marginBottom: 15 }}>
                                <Grid style={{ flex: 1 }} >
                                    <Typography gutterBottom variant="h4" component="span">
                                        KTTA
                                            </Typography>
                                </Grid>
                              
                                <Grid>

                                    <Button onClick={this.downloaddraws}
                                        style={{ marginRight: 30 }}
                                        startIcon={<DescriptionIcon/>}
                                >
                                    Prospectus
                                            </Button>

                                </Grid>

                                <Grid>
                                    <Button onClick={this.logout}
                                        startIcon={<ExitToAppIcon />}
                                    >
                                        Logout
                                            </Button>
                                    {this.state.logout &&
                                        <Logout />
                                    }



                                </Grid>


                               


                            </Grid>
                            </div>
                        <Divider />
                        <Container maxWidth="md" >
                            <Grid
                                
                                alignItems="center"
                                justify="center"
                                container
                               
                            >
                                <Grid item xs={12} md={12}>
                                 
                                    <Paper className={classes.contentpaper}>

                                           
                                            {pdata &&
                                                <Grid align="center" justify="center" container >
                                                    <Grid>
                                                        <RefreshLoader style="normal" loading={loading} />
                                                    </Grid>
                                                </Grid>}

                                            <Grid  container>
                                                {uploaded &&
                                                    
                                                      

                                                      
                                                            <Grid container align="center">
                                                               
                                                                   
                                                                    <Grid item md={12} sm={10} xs={11}>

                                                                        <Typography gutterBottom variant="h4">
                                                                            {tname.tournamentName}
                                                                        </Typography>
                                                                    </Grid>

                                                                

                                                                <Grid item md={12}>
                                                                    {this.showComp(value)}
                                                                </Grid>
                                                            </Grid>



                                                        

                                                   



                                                }

                                                {notup ?
                                                    (<Card className={classes.card} style={{ margin: '10px' }}>
                                                        <CardHeader
                                                            title="DOB proof for verification"
                                                        />
                                                        <CardContent>


                                                            <RefreshLoader style="normal" loading={loading} />

                                                            <Grid item md={12} sm={12} xs={12}>

                                                                <input
                                                                    accept="image/*"
                                                                    ref="file"
                                                                    id="contained-button-file"
                                                                    type="file"
                                                                    onChange={this.onChange}
                                                                />

                                                                <label htmlFor="contained-button-file">
                                                                    <Button
                                                                        size="small"
                                                                        startIcon={<ArrowUpwardIcon />}
                                                                        component="span"
                                                                        onClick={this.onSubmit}
                                                                    >
                                                                        Upload
                    </Button>
                                                                </label>

                                                                <Typography variant="body1" color="error">
                                                                    {" "}
                                                                    {message.length ? message : ""}
                                                                </Typography>
                                                                {uploadedstatus.length ? (
                                                                    <SnackPopup
                                                                        message={uploadedstatus}
                                                                        type="success"
                                                                    />
                                                                ) : (
                                                                        ""
                                                                    )}
                                                            </Grid>

                                                        </CardContent>



                                                    </Card>
                                                    ) : ""}
                                            </Grid>
                                        </Paper>

                                    {download ? <Downloadpdf
                                        open={pdfopen}
                                        view={validPdf}
                                        ViewPdf={ViewPdf}
                                        tounamentgroup={prosvalue}
                                        onClose={this.handleClose}
                                        test={true}
                                    /> : ""}





                                    









                                </Grid>

                            </Grid>
                        
                        </Container>
                           
                     
                    </main>
                </div>
            </React.Fragment>
        );
    }
}


export default withRouter(withStyles(newsStyles)(Dashboard));
