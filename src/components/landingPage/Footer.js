import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from '@material-ui/icons/Copyright';


class Footer extends Component {
    render() {
        const { classes } = this.props;
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



export default Footer;
