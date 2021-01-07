import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BaseDialog from "../players/dialouges/baseDialouge"
import IconButton from '@material-ui/core/IconButton';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Grid from "@material-ui/core/Grid";
import newsStyle from '../../styles/genricStyle'
import MaterialTable, { MTableToolbar } from "material-table";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import ScoreIcon from '@material-ui/icons/Score';
import RoomIcon from '@material-ui/icons/Room';
import Container from '@material-ui/core/Container';

import Titlize from "../../commons/genricComponents/titlize";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
const columns = [
 
    {
        field: "tournamentName", title: "Tournament Name" ,cellStyle: {
            width: "100%",

        }},
    {
        field: "points", title: "Points", cellStyle: {
            width: "100%",

        } }
]


class ResponsiveDailouge extends Component {
    render() {
        const { classes, playername, detaildata, playerdata, icons,loading } = this.props;
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
                                        <RoomIcon />
                                            </Grid>
                                        <Grid item xs={11} sm={11}>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            {playerInfo
                                                ? <Titlize value={playerInfo.stateName} />
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
                                                ? <Titlize value={playerInfo.academy} />
                                                : ""}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row">
                                        <Grid item xs={1} sm={1}>
                                        <ScoreIcon/>
                                    </Grid>
                                        <Grid item xs={11} sm={11}>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            {playerInfo
                                                ?playerInfo.totPoints
                                                : ""}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                    
                                    </CardContent>
                                </Card>
                            </Grid>
                    </Grid>
                 
                    <Grid container >
                        <Grid
                            item
                            sm={12}
                            xs={12}
                            style={{


                            }}

                        >
                        <MaterialTable
                            title=""
                            isLoading={loading}
                            columns={columns}
                            data={detaildata}
                            icons={icons}
                            options={{
                                // filtering: true,
                                searchFieldAlignment: "left",
                             
                             

                            }}



                        />
                  
                        </Grid>
                 </Grid>

                </div>

            </BaseDialog>
        );
    }
}

export default withRouter(withStyles(newsStyle)(ResponsiveDailouge));
