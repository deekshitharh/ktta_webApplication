import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { formFileds } from "../../formdata";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import customStyles from "../../styles/genricStyle";
import Topbar from "../../components/landingPage/TopBar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { sessioncommons } from "../../commons";
import { ApiCall } from "../../APIService";
import formValidation from "../../commons/formfunction";
import Container from "@material-ui/core/Container";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FieldIcon from "../../commons/genricComponents/fieldIcon";
import { changePasswordForm } from "../../formdata";
import FormGenerator from "../../commons/genricComponents/formGenerator";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { DialogActions } from "@material-ui/core";
import { commons } from "../../commons";
import RefreshLoader from "../../commons/genricComponents/pageloader";
class FogotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      otpStatus: false,
      pwdStatus: false,
      otpbutton: false,
      otpMessage: "",
      pwdMessage: "",
      loading: false,
      dialogOpen: false,
      otpcode: 0,
    };
    this.verifyForm = this.verifyForm.bind(this);

    this.handleDialog = this.handleDialog.bind(this);
  }

  componentDidMount() {
    let formDataControl = [...JSON.parse(JSON.stringify(changePasswordForm))];
    // const formDataControl = [...changePasswordForm];

    this.setState({
      formData: formDataControl,
    });
  }

  resetForm = () => {
    let formDataControl = [...JSON.parse(JSON.stringify(changePasswordForm))];
    // const formDataControl = [...changePasswordForm];

    this.setState({
      formData: formDataControl,
      otpStatus: false,
    });
  };
  handleDialog = () => {
    this.setState({ dialogOpen: false });
    this.props.history.push("/login");
  };

  showotpval = async () => {
    const { formData } = this.state;
    let filteredata = [formData.find((item) => item.id === "email")];

    let formInputDataValid = await formValidation.genricFromValidation(filteredata);
    let result = formInputDataValid.find((item) => {
      if (item.error.length) return item;
      // this.setState({ "otpbutton": false, });
    });

    this.setState({ otpbutton: false, otpMessage: "", pwdMessage: "" });

    if (result == undefined) {
      this.setState({ otpbutton: true });
    }
  };

  generateOtp = () => {
    this.setState({
      otpStatus: false,
      otpMessage: "",
      pwdStatus: false,
      pwdMessage: false,
    });
    const data = {};
    const formvalues = [...this.state.formData];
    formvalues.map((obj) => {
      data[obj.key] = obj.value;
    });

    let apiData = {};
    apiData.type = "forgot";
    //apiData.client_key = "ktta";
    apiData.caller = "caller";
     apiData.apiKey = "apikey";
    apiData.emailId = data.email;
     this.setState({ loading: true });
    ApiCall("POST", apiData, "core")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "failure"){

        
          this.setState({
            otpbutton: false,
            loading: false,
            otpMessage: res.message,
          });
        }
        if (res.status === "success") {
          this.setState({
            otpbutton: false,
            otpStatus: true,
            loading: false,
            otpMessage: res.message,
            otpcode: res.verificationCode,
          });
        } else if (res.errors) {
          this.setState({ otpMessage: res.errors.toString() })
        }
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  verifyForm = async (e) => {
    e.preventDefault();
    this.setState({ pwdMessage: "" });
    let formData = this.state.formData;

    formData = await formValidation.genricFromValidation(
      formData,
      this.state.otpcode
    );

    let result = formData.find((item) => {
      if (item && item.error.length) return item;
    });

    this.setState({ formData: formData });

    if (result === undefined) {
      const data = {};
      const formvalues = this.state.formData;
      formvalues.map((obj) => {
        data[obj.id] = obj.value;
      });

      let apiData = {};
      apiData.type = "newpass";
      //apiData.client_key = "ktta";
      apiData.caller = "caller"; 
      apiData.apiKey = "apikey";
      apiData.verificationCode = data.otp;
        apiData.userId = data.email;
        apiData.password = data.confirmPassword;

      this.setState({ loading: true });
      ApiCall("POST", apiData, "core")
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            this.setState({ pwdMessage: res.message });
            this.resetForm();
          }
          if (res.status === "success") {
            this.setState({
              pwdStatus: true,
              loading: false,
              dialogOpen: true,
            });
            this.resetForm();
          }
        })
        .catch((error) => {
          commons.errorLog(error);
        });
    }
  };

  onChange = (e) => {
    let formDataInput = [...this.state.formData];
    this.setState({ otpMessage: "" });
    formDataInput.find((item) => {
      if (item.key === e.target.name) {
        item.type === "number"
          ? (item.value = parseInt(e.target.value))
          : (item.value = e.target.value);

        if (item.key === e.target.name && item.type !== "string")
          item.value = e.target.value;
        if (item.type === "date") {
          //  let formatDate = moment(e.target.value).format('DD-MM-YYYY');
          //  item.value = formatDate
        }
        if (item.key === e.target.name && item.type === "string") {
          item.value = e.target.value;
          this.setState({ formData: formDataInput });
          this.showotpval();
        }
      }
    });
    this.setState({ formData: formDataInput });
  };

  render() {
    const { classes, sideBar } = this.props;
    const {
      formData,
      otpStatus,
      pwdStatus,
      otpMessage,
      loading,
      otpbutton,
      pwdMessage,
      dialogOpen,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3} />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <RefreshLoader style="overlay" loading={loading} />
            <Grid
              justify="center"
              alignItems="center"
              container
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
           
            >
              <Avatar
                style={{
                  margin: 8,
                  backgroundColor: "red",
                }}
              >
                <LockOpenIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
            </Grid>

            <Container maxWidth="xs">
              <form>
                <FormGenerator
                  formList={this.state.formData}
                  onChange={this.onChange}
                  xx={123}
                />
                {/* {formData.map((item, index) => {
                                    const styleObj = {};
                                    if (item.hidden) styleObj["display"] = "none";

                                    return (<TextField
                                        key={index}
                                        variant='outlined'
                                        type={item.type}
                                        disabled={item.disabled ? true : false}
                                        hidden={item.hidden ? true : false}
                                        label={item.hidden ? '' : item.displayName}
                                        name={item.key}
                                        fullWidth
                                        margin="normal"
                                        value={item.value}
                                        onChange={this.onChange}
                                        error={item.error.length ? true : false}
                                        helperText={item.error}
                                        autoComplete="off"
                                        style={styleObj}
                                    />)

                                })} */}
                {otpbutton ? (
                  <Button
                    style={{ marginBottom: 10 }}
                    size="small"
                    onClick={this.generateOtp}
                  >
                    Request OTP
                  </Button>
                ) : (
                  ""
                )}

                <Button
                  onClick={this.verifyForm}
                  fullWidth
                  disabled={otpStatus ? false : true}
                >
                  Submit
                </Button>

                {otpStatus ? (
                  <span className={classes.success}>{otpMessage}</span>
                ) : (
                  <span className={classes.error}> {otpMessage}</span>
                )}

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Dialog
                      open={dialogOpen}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Password Reset
                      </DialogTitle>
                      {pwdStatus ? (
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {pwdMessage} successfully. Please login again
                          </DialogContentText>
                        </DialogContent>
                      ) : (
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {pwdMessage}
                          </DialogContentText>
                        </DialogContent>
                      )}
                      <DialogActions>
                        <Button
                          color="primary"
                          autoFocus
                          onClick={this.handleDialog}
                        >
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </form>
            </Container>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(customStyles)(FogotPassword));
