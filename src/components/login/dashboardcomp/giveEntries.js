import Typography from "@material-ui/core/Typography";


import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import newsStyles from "../../../styles/newsStyle"
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from "@material-ui/core/Paper";



import Grid from "@material-ui/core/Grid";
import { ApiCall } from "../../../APIService";
import { commons } from "../../../commons";
import { Link, withRouter } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { sessioncommons } from "../../../commons"
import {steps} from "../../../formdata"


class ViewEntries extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
         
            stepperdata: steps,
            idstatus:null,
            paymentstatus:null,
            showentries:false,
           
            activeStep: 0,
        };
    }

    handleNext = () => {
    
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));




    };

    update = (type, val) => {
      
        if (type == "idverification")
        {
            this.setState({
                idstatus: val
            })
        }
        else if ((type == "paymentverification"))
        {
            this.setState ({
                paymentstatus:val
            });
            }
  }
      
    disable = (activeStep) => {
        const { idstatus, paymentstatus}= this.state
        if (activeStep == 0 && !idstatus ) {
            return true
        }
        else if (activeStep == 1 && !paymentstatus) {
            return true
        }
        
        
        
        else
return false

    }

       
        // let {stepperdata }= this.state
 
        // let logObj = stepperdata.find(obj => obj["activestep"] === activeStep)
        // if (logObj && logObj.component)
        //     return <div><logObj.component update={this.update} /></div>

    showdata = (activeStep) => {
        let { stepperdata } = this.state
        let logObj = stepperdata.find(obj => obj["activestep"] === activeStep);
        if (activeStep === 2) {
            if (this.state.idstatus && this.state.paymentstatus) {
                logObj = stepperdata.find(obj => obj['activestep'] === 2);
                if (logObj && logObj.component) {
                    return <div><logObj.component update={this.update}/></div>
                }
            }
        }
        if (activeStep === 0) {
          
            if (this.state.idstatus) { // if true we are returning null value so that it will child1 will not been  shown
                return <Typography vriant="h3">Id has uploaded</Typography>;
            } else {
                if (logObj && logObj.component) {
                    return <div><logObj.component update={this.update} /></div>
                }
            }
        } else if (activeStep === 1) {
            if (this.state.paymentstatus) { // if true we are returning null value so that it will child2 will not been  shown
                return <Typography vriant="h3">Payment has done</Typography>;
            } else {
                if (logObj && logObj.component) {
                    return <div><logObj.component update={this.update} /></div>
                }
            }
        }
    }


    



 

    componentDidMount() {
    
        {
            let apiData = {};
            apiData.tableName = "playerdetails";
            //apiData.client_key = "ktta";
            apiData.type = "getData"
            ApiCall("POST", apiData, "getData")

                .then(res => res.json())
                .then(res => {
                    if (!res["status"]) {
                        console.log("api error" + res["status"])
                    }

                    return res;
                })
                .then(res => {

                    this.setState({
                        playerDetails: res["getData"],

                    });


                       sessioncommons.setplayerSession(res["getData"])
                 
                   

                })
                .catch(error => {
                    console.log(" view entries error" + error);
                });

        }

            

}

    render() {
        const { classes } = this.props;
        const { activeStep, stepperdata, idstatus, paymentstatus} = this.state
        
        return (
            <React.Fragment>
                <CssBaseline />

                <div className={classes.root}>
                    {/* <Grid container justify="center"> */}
                  
                        <Paper elavation={10} square={false}>
                        <Grid container spacing={2} align="center">
                         
                            <Grid item md={12} sm={12} xs={12}>
                               
                                <div>
                                    
                                            <Stepper activeStep={activeStep} alternativeLabel>
                                        {stepperdata.map(steps => {
                                           
                                            return (
                                                <Step key={steps}>
                                                    <StepLabel>{steps.label}</StepLabel>
                                                </Step>
                                            );
                                        })} 
                                            </Stepper>
                                   
                                    
                                 
                                           
                                    <Paper className={classes.entriespaper}>
                                        
                                        {this.showdata(activeStep)}

                   



                                            </Paper>


                                           
                                     
                                       

                                    

                                    
                                           
                                        
                                        </div>
                                        
                              
 
                                
                                </Grid>
                                
                           
                            
                        </Grid>
                       
                        {(activeStep === 0 || activeStep == 1) ?

                            <Button
                                disabled={this.disable(activeStep)}
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                            >
                                Next
                </Button>


                            : ""}
                        

                        </Paper>
                  
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(ViewEntries);
