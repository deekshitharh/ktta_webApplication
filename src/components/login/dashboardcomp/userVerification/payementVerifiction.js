import Typography from "@material-ui/core/Typography";

import { sessioncommons } from "../../../../commons"
import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import newsStyles from "../../../../styles/newsStyle"


import Paper from "@material-ui/core/Paper";


import Grid from "@material-ui/core/Grid";




import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";




class Payementverification extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            paymentdata: sessioncommons.getUser(),
             paymentstatus:null
        };
    }

   
    parentupdate = (idstatus) => {
        this.props.update("paymentverification", idstatus);
    }

            

    

    componentDidMount() {
        const { paymentdata}=this.state
        
        if (paymentdata.paymentstatus) {

            this.setState(
                {
                    paymentstatus: true
                },
                () => {
                    this.parentupdate(this.state.paymentstatus)
                }
            );

           

        }

        else
        {
            this.setState(
                {
                    paymentstatus: false
                },
                () => {
                    this.parentupdate(this.state.paymentstatus)
                }
            );
            }
            
        this.props.update("paymentverification", this.state.paymentstatus)
        
        
    }
         

            



    render() {
        const { classes } = this.props;
        const { paymentstatus} = this.state
     
        return (
            <React.Fragment>
                <CssBaseline />

                <div className={classes.root}>
                    {/* <Grid container justify="center"> */}
                  
                        <Paper elavation={10} square={false}>
                        <Grid container spacing={2} align="center">
                           
                            {!paymentstatus?
                         
                                (<Grid item md={12} sm={12} xs={12}
                                >
                                
                                        
                                    <Typography variant="h6">
                                 Subscription Renewal pending
                                            </Typography>
                                            
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        onClick={this.onSubmit}
                                    >
                                        Pay
                    </Button>
                                            
                                </Grid>) : ""}
                                
                            
                              
                            



                            
                            </Grid>

                        </Paper>
                  
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(Payementverification);
