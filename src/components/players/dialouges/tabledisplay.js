import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BaseDialog from "./baseDialouge"
import IconButton from '@material-ui/core/IconButton';

import Grid from "@material-ui/core/Grid";
import newsStyle from '../../../styles/genricStyle'
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../formdata";
import {playerDetailscol}  from "../../../formdata"
import CloseIcon from '@material-ui/icons/Close';





class TableDialog extends Component {
    render() {
        const { classes, data, playername, loading, onClose} = this.props;

        return (
            <BaseDialog {...this.props}>
                <div>
                    <MaterialTable
                        title=""
                        isLoading={loading}
                        columns={playerDetailscol}
                        data={data}
                        icons={tableIcons}
                        options={{
                            // filtering: true,
                            
                             // filtering: true,
                              headerStyle: {
                        backgroundColor: '#f44336a6',
                    color: '#FFF'
                  },
                              rowStyle: {
                     
                    color: '#000000'
                  }
             
            }}

                        components={{
                            Toolbar: props => (
                                <div>
                                    <MTableToolbar {...props} />
                                    <Grid container direction="row" alignItems="center">
                                        <Grid  >
                                            <Typography gutterBottom variant="h6">
                                                {playername}
                                            </Typography>
                                        </Grid>

                                        <Grid>
                                             
                                            <IconButton style={{ backgroundColor: "red", margin :10 ,padding:5}}  onClick={onClose}>
                                                <CloseIcon style={{color:"white"  }} />
                                            </IconButton>
                                           

                                        </Grid>



                                    </Grid>
                                </div>
                            )
                        }}

        />

                            
                   </div>

            </BaseDialog>
        );
    }
}

export default withRouter(withStyles(newsStyle)(TableDialog));
