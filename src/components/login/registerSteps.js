import Typography from "@material-ui/core/Typography";

import React  from "react";
import Button from "@material-ui/core/Button";
import FormGenerator from "../../commons/genricComponents/formGenerator";
import { formFileds } from "../../formdata"
import Container from '@material-ui/core/Container';
import formValidation from "../../commons/formfunction";
import customStyles from "../../styles/genricStyle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Topbar from "../../components/landingPage/TopBar";
import Grid from "@material-ui/core/Grid";
import { ApiCall } from "../../APIService";
import { commons } from "../../commons";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { steps } from "../../formdata";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from "@material-ui/core/Avatar";

class registerSteps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stepperdata: steps,
      "otpStatus": false,
      "pwdStatus": false,
      "otpbutton": false,
      "otpMessage": "",
      "pwdMessage": "",
      "checked": false,
      otpcode: 0,
      activeStep: 0,
    };
  }

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleChange = (event) => {
    this.setState((state) => ({
      checked: !state.checked,
    }));
    
  };
//email veification
  validateEmail = async () => {
    const { formData } = this.state
    let filteredata = [formData.find(item => item.id === "email")]

    let formInputDataValid = await formValidation.genricFromValidation(filteredata);
    let result = formInputDataValid.find((item) => {

      if (item.error.length)
        return item;
      // this.setState({ "otpbutton": false, });
    })


    this.setState({ "otpbutton": false, "otpMessage": "", "pwdMessage": "" },



    );


    if (result === undefined) {

      this.setState({ "otpbutton": true, },


      );





    }
  }

//otp generation
  generateOtp = () => {


    this.setState({

      "otpStatus": false, "otpMessage": "", "pwdStatus": false, "pwdMessage": false
    })
    const data = {};
    const formvalues = [...this.state.formData];
    formvalues.map((obj) => {

     
      data[obj.key] = obj.value

    });

    let apiData = {};
    apiData.type = "regOtp";
  
    apiData.emailId = data.emailAddress;
      this.setState({ loading: true });
    ApiCall("POST", apiData, "coreApi")
      .then(res => res.json())
      .then(res => {
        if (res.status === "failure") {
          this.setState({ otpbutton: false, loading: false, "otpMessage": res.registerStatus })
          this.resetForm();
        }



        if (res.status === "success") {
          this.setState({ otpbutton: false, loading: false, "otpStatus": true, "otpMessage": res.message, "otpcode": res.verificationCode })
          setTimeout(() => {
            this.setState((state) => ({
              otpMessage:"",
              activeStep: state.activeStep + 1,
            })
          
            );
           
          }, 2000);
        }
        else if (res.errors) {
          this.setState({ loading: false, "otpMessage": res.errors.toString() })
        }
      }).catch(error => {
        commons.errorLog(error)
      });
  }




  onChange = (e) => {

    let formDataInput = [...this.state.formData];
    this.setState({ otpMessage: "", });
    formDataInput.find((item) => {


      

        if (item.key === e.target.name && item.id === "email") {
          item.value = e.target.value;
          this.setState({ formData: formDataInput });
          this.validateEmail()
        }



    })
    this.setState({ formData: formDataInput });


  }
//handle change for stepper
  changeStep = (activeStep) => {
   
    let { stepperdata}=this.state
    let logObj = stepperdata.find(obj => obj["activestep"] === activeStep)
    if (logObj && logObj.component)
      return <div><logObj.component update={this.state.formData} otp={this.state.otpcode} /></div>

  }
  

 

  componentDidMount() {
    const value = formFileds.filter(word => word.id ==="email")
    let formDataControl = [...JSON.parse(JSON.stringify(value))];
  

    this.setState({
      "formData": formDataControl,

    })
  }

  render() {
    const { classes, orientation } = this.props;

    const { activeStep, checked, stepperdata, otpStatus,otpbutton, otpMessage } = this.state;

    

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3}  />
        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <Paper elavation={10} square={false}>
            <Grid container spacing={2} align="center">
              <Grid item md={12} sm={12} xs={12}>
                <div>
                  <Stepper activeStep={activeStep}
                    orientation={orientation ? "vertical" :"horizontal"}
                    alternativeLabel>
                    {stepperdata.map((steps,index) => {
                      return (
                        <Step key={index}>
                          <StepLabel>{steps.label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
               
                  {(activeStep === 1) ? this.changeStep(1) :
                   
                    
                      <Container maxWidth="sm">
                  

                      <Card className={classes.card}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe" style={{
                              margin: 8,
                            }}>
                              R
          </Avatar>
                          }

                          title="EMAIL VERIFICATION"

                        />
                        <CardContent>
                          <Grid container style={{ marginBottom: 20 }}>
                            <Grid item  justifyContent="space-between" sm={12} xs={12} md={8}>
                              <FormControlLabel
                                control={<Checkbox checked={this.state.checked} />}
                                onChange={this.handleChange}
                                style={{ margin: 0 }}
                              />
                              <Typography variant="subtitle1" component="span">
                                KTTA Registration for 2020-2021
                                            </Typography>
                            </Grid>

                            <Grid item sm={12} xs={12} md={4}>

                              <Typography variant="subtitle1" style={{ padding: 8 }} >
                                Rs 500/-
                                            </Typography>

                            </Grid>







                          </Grid>


                          <FormGenerator
                            formList={this.state.formData}

                            onChange={this.onChange} />

                        </CardContent>

                        {(otpbutton && checked)? <Button
                          style={{ marginTop: 15 }}
                          size="small"
                          onClick={this.generateOtp}>Generate OTP</Button> : ""}

                        {otpStatus ? <span className={classes.success}>
                          {otpMessage}
                        </span> :
                          <span className={classes.error}> {otpMessage}</span>}

                      </Card>
                      </Container>
                    
                  
                  
                 
                   }
                 
                 
              
                 

                </div>
              </Grid>
            </Grid>

          
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(registerSteps);
