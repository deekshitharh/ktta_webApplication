import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from '@material-ui/icons/Copyright';
import withStyles from "@material-ui/core/styles/withStyles";
import customStyles from "../../styles/genricStyle";
import { withRouter } from "react-router-dom";
class Footer extends Component {
    render() {
       
        return (
            <div >
                <Grid
                    container
                    style={{
                        backgroundColor: "#303030", color: 'white', padding: '10px'
                    }}
                >
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography variant="subtitle1">
                            <span> <CopyrightIcon fontSize="small" /></span>

                            Copyright whizdata, All rights reserved
                  </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'right' }}>
                        <Typography variant="subtitle1" >
                            Developed & Managed by Whizdata
              </Typography>
                    </Grid>

                </Grid>
            </div>
        );
    }
}


export default withRouter( withStyles(customStyles)(Footer));

