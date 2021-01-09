import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SnackPopup from "../../commons/genricComponents/snackbar"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import SubjectIcon from "@material-ui/icons/Subject";
import MessageIcon from "@material-ui/icons/Message";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import fields from "../../formdata/formvalues";
import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import MapContainer from "../typo/map";
import formValidation from "../../commons/formfunction";
import Container from '@material-ui/core/Container';
import FieldIcon from "../../commons/genricComponents/fieldIcon"
import { ApiCall } from "../../APIService";
import { commons } from "../../commons";
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: [], 
      reqmsg: false, 
      requestStatus: "",
      asscoc: this.props.location.state
    };
  }

  componentDidMount() {
    let data = [...JSON.parse(JSON.stringify(fields))];
    this.setState({ formdata: data });
  }

  resetForm = () => {
    let data = [...JSON.parse(JSON.stringify(fields))];
    this.setState({ formdata:data });
  };

  handleChange = e => {

    const formvalues = [...this.state.formdata];

    formvalues.find(el => {
      if ( el && el.id === e.target.id) el.value = e.target.value;
    });


    this.setState({ formdata: formvalues });
  };

  handleFormSubmit = async (e) => {
    const formvalues = [...this.state.formdata];
 
    let formInputDataValid =  await formValidation.genricFromValidation(formvalues);
  
    let result = formInputDataValid.find((item) => {
      
      if (item.error.length) return item;
    })
   this.setState({ formdata: formInputDataValid });
    if (result == undefined) {
      const data = {};
      const formvalues = [...this.state.formdata];
      formvalues.map((obj) => {
        data[obj.id] = obj.value;
      });
      var params = {};

     
        params.emailId =data.email;
        params.subject = data.subject;
      params.description = data.Messege;

      // params.tableName = "officebearers";
      // //params.client_key = "ktta";
      // params.type = "getData";

      ApiCall("POST", params, "contactus")
        .then(response => response.json())
        .then(data => {
          // console.log("data .. " + JSON.stringify(data));
          if (data.mailStatus) {

            this.setState({
              // emailresponse: "Mail sent",
              reqmsg: true,
              requestStatus: data.mailStatus
            });

            this.resetForm();
          }

          else
          {
            this.setState({
              reqmsg: false,
              requestStatus: "Error occured.Please try after sometime!!!"
            });
            
            }
        })

        .catch(error => {
          
          console.error(error);
          this.setState({
            reqmsg: false,
            requestStatus: "Error occured.Please try after sometime!!!"
          });

          this.resetForm();
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { formdata, requestStatus, reqmsg } = this.state;
    

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={4}  />

        <div className={classes.root}>
          <Container maxWidth="lg">
     
            <Paper className={classes.paper}>

           
                  <MapContainer />
               
               
          
             
            
                
           
             
  
                <Paper className={classes.formclass}>
                  <Grid
                   
                  
                    
                    container
                    
                 
                 >
                <Grid item md={6}>
                  <form noValidate autoComplete="off">
                    {formdata.map((formval, index) => {
                      return (
                        <TextField
                          key={index}
                          style={{ margin: 10 }}
                          variant="outlined"
                          fullWidth
                          required={
                            formval.required ? formval.required:false
                           
                          }
                          multiline={
                            formval.multiline ? formval.multiline : false
                          }
                          error={formval.error ? true : false}
                          helperText={formval.error}
                          id={formval.id}
                          rows={formval.rows ? formval.rows : ""}
                          value={formval.value}

                          onChange={this.handleChange}
                          label={formval.label}
                          type={formval.type}
                          InputLabelProps={{
                         
                            classes: {
                              root: classes.label,
                              focused: classes.cssFocused
                            }
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                              input: classes.input
                            },
                              startAdornment: (
                                <FieldIcon name={formval.adorment} size="" style={{}} type="mat"/>
                              )
                          }}
                        />
                      );
                    })}
                      {(requestStatus.length) ? (<SnackPopup message={`${requestStatus} Response Recorded!!!!`} type="success" />) : ""}

                   
                 
                  </form>
                    </Grid>
                  </Grid>
                     <Button
                      onClick={this.handleFormSubmit}
                   
                      type="submit"
                      className={classes.actionButton}
                    >
                      Submit
                      </Button>
              </Paper>

            </Paper>
       
          
            </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default (Contact);
