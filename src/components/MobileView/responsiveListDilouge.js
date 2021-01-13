import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import BaseDialog from "../players/dialouges/baseDialouge"

import LocationCityIcon from '@material-ui/icons/LocationCity';
import Grid from "@material-ui/core/Grid";
import newsStyle from '../../styles/genricStyle'

import CardContent from "@material-ui/core/CardContent";

import CardHeader from '@material-ui/core/CardHeader';

import Card from "@material-ui/core/Card";

import Fontawsome from "../../commons/genricComponents/fontAwsomicon"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Titlize from "../../commons/genricComponents/titlize";
import EventIcon from '@material-ui/icons/Event';
import {commons} from "../../commons"
//dilouge component for mobile view to display additionl fields 
class ResponsiveListDailouge extends Component {
    render() {
        const { playername, playerdata } = this.props;
      
        let playerInfo = playerdata.find(item => item.userName === playername);
     
        return (
            <BaseDialog {...this.props}>
                <div>

                    <Grid container >
                        <Grid
                            item
                            sm={12}
                            xs={12}
                            style={{

                                marginBottom: 20,

                            }}

                        >
                            <Card
                                
                            >
                                <CardHeader
                                    title=
                                    {playerInfo
                                        ? <Titlize value={playerInfo.userName} />
                                        : ""}
                                    style={{ textAlign: "center" }}
                                />

                                <CardContent>
                                   
                                    
                                    
                                   
                                    <Grid container direction="row">
                                        <Grid item xs={1} sm={1}>
                                            <MailOutlineIcon/>
                                        </Grid>
                                        <Grid item xs={11} sm={11}>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                style={{ paddingLeft: "12px" }}
                                            >
                                                {playerInfo
                                                    ? playerInfo.emailAddress
                                                    : ""}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                   
                                    <Grid container direction="row">
                                        <Grid item xs={1} sm={1}>
                                            <EventIcon />
                                        </Grid>
                                        <Grid item xs={11} sm={11}>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                style={{ paddingLeft: "10px" }}
                                            >
                                                {playerInfo
                                                    ? commons.formatterDate(playerInfo.dateOfBirth)
                                                    : ""}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item xs={1} sm={1}>
                                            <LocationCityIcon />
                                        </Grid>
                                        <Grid item xs={11} sm={11}>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                style={{ paddingLeft: "10px" }}
                                            >
                                                {playerInfo
                                                    ? <Titlize value={playerInfo.affiliationId} />
                                                    : ""}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                     
                                       
                                            
                                    {playerInfo ?
                                       
                                             
                                                playerInfo.gender==="Male"
                                                        ?
                                                        
                                                    <React.Fragment>
                                                    <Grid item xs={1} sm={1}>
                                                        <Fontawsome
                                                            name="male"
                                                            size="2x"
                                                            style={{ width: "0.9em" }} />
                                                    </Grid>
                                                    <Grid item xs={11} sm={11}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle1"
                                                            style={{ paddingLeft: "10px" }}
                                                        >Male</Typography>
                                                    </Grid>
                                                            
                                                           
                                                             </React.Fragment>
                                                       
                                                        :
                                                        <React.Fragment>
                                                    <Grid item xs={1} sm={1}>
                                                        <Fontawsome
                                                            name="female"
                                                            size="2x"
                                                            style={{ width: "0.9em" }} />
                                                    </Grid>
                                                    <Grid item xs={11} sm={11}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle1"
                                                            style={{ paddingLeft: "10px" }}>Female</Typography>
                                                    </Grid>
                                                        </React.Fragment>
                                                       
                                                    
                                                    
                                             
                                                  
                                            : ""}
                                                                   
                                       
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
           

                </div>

            </BaseDialog>
        );
    }
}

export default withRouter(withStyles(newsStyle)(ResponsiveListDailouge));
