import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
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
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { commons } from "../../commons";
import { registration } from "../../formdata";
import FormGenerator from "../../commons/genricComponents/formGenerator";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import RefreshLoader from "../../commons/genricComponents/pageloader";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { DialogActions } from "@material-ui/core";
class Emailverification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      otpStatus: false,
      pwdStatus: false,
      otpbutton: false,
      otpMessage: "",
      pwdMessage: "",
      registredClub: [],
      dialogOpen: false,
      loading: false,
    };
    this.verifyForm = this.verifyForm.bind(this);

    this.handleDialog = this.handleDialog.bind(this);
  }

  loadClubData = () => {
    let params = {};

    //params.client_key = "ktta";
    params.type = "academylist";

    params.apiKey = "apikey";
    params.caller = "caller";
    params.data = { stateAssociationId: "userid" };

    ApiCall("POST", params, "core")
      .then((res) => res.json())
      .then((res) => {
        if (!res["status"]) {
          console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => {
        this.setState({
          registredClub: res["data"],
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  componentDidMount() {
    this.loadClubData();
    let formDataControl = [...JSON.parse(JSON.stringify(registration))];
    // const formDataControl = [...changePasswordForm];

    this.setState({
      formData: formDataControl,
    });
  }

  resetForm = () => {
    let formDataControl = [...JSON.parse(JSON.stringify(registration))];
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

    let formInputDataValid = await formValidation.validatelogin(filteredata);
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
      // {
      //     data[obj.key] = obj.dvalue;
      // }
      data[obj.key] = obj.value;
    });

    let apiData = {};
    apiData.type = "regotp";
    // apiData.client_key = "ktta";
    apiData.caller = "caller";
     apiData.apiKey = "apikey";
    apiData.emailId = data.emailAddress;
         this.setState({ loading: true });
    ApiCall("POST", apiData, "core")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "failure") {
          this.setState({
            otpbutton: false,
            loading: false,
            otpMessage: res.registerStatus,
          });
          this.resetForm();
        }

        if (res.status === "success") {
          this.setState({
            otpbutton: false,
            loading: false,
            otpStatus: true,
            otpMessage: res.message,
          });
        } else if (res.errors) {
          this.setState({ loading: false, otpMessage: res.errors.toString() });
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

    formData = await formValidation.validatePasswodData(formData);

    let result = formData.find((item) => {
      if (item && item.error.length) return item;
    });

    this.setState({ formData: formData });

    if (result === undefined) {
      const data = {};
      const formvalues = this.state.formData;
      formvalues.map((obj) => {
        if (obj.id == "DOB")
          data[obj.id] = moment(obj.value).format("DD MMM YYYY");
        else {
          data[obj.id] = obj.value;
        }
      });

      let apiData = {};
      apiData.type = "playerreg";
      // apiData.client_key = "TSA";
      apiData.caller = "caller";
       apiData.apiKey = "apikey";
      apiData.userName = data.name;
      apiData.verificationCode = data.otp;
      apiData.emailAddress = data.email;
      apiData.password = data.password;
      apiData.clubNameId = "none";
      apiData.regOverride = true;
      apiData.transactionID = "";
      apiData.transactionAmount = "";
      apiData.approvalCode = "TSA";
      apiData.role = "Player";
      apiData.academy = "none";
      apiData.associationId = "";
      apiData.phoneNumber = data.phoneNo;
      apiData.dob = data.DOB;
      this.setState({ loading: true });
      ApiCall("POST", apiData, "core")
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "failure") {
            this.setState({ pwdMessage: res.message, loading: false });
            this.resetForm();
          } else {
            this.setState({
              pwdStatus: true,
              dialogOpen: true,
              loading: false,
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
          item.value = e.target.value;
        }

        if (item.key === e.target.name && item.id === "email") {
          item.value = e.target.value;
          this.setState({ formData: formDataInput });
          this.showotpval();
        } else if (item.key === e.target.name && item.type == "string")
          item.value = e.target.value;
      }
    });
    this.setState({ formData: formDataInput });
  };

  render() {
    const { classes, sideBar } = this.props;
    const {
      formData,
      otpStatus,
      registredClub,
      pwdStatus,
      otpMessage,
      otpbutton,
      pwdMessage,
      dialogOpen,
      loading,
    } = this.state;

    let role_groups = formValidation.chunkArray(2, formData);

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3} />
        <div className={classes.root}>
          <Paper className={classes.paper}>
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
              // className={classes.grid}
            >
              <RefreshLoader style="overlay" loading={loading} />
            </Grid>

            <Container maxWidth="sm">
              <Card className={classes.card} style={{ margin: "10px" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      style={{
                        margin: 8,
                      }}
                    >
                      R
                    </Avatar>
                  }
                  title=" PLAYER REGISTRATION"
                />
                <CardContent>
                  <FormGenerator
                    data={registredClub}
                    groups={role_groups}
                    groupBy={2}
                    onChange={this.onChange}
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
                      style={{ marginTop: 15 }}
                      variant="contained"
                      color="primary"
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
                    style={{ marginTop: 10 }}
                    fullWidth
                    disabled={otpStatus ? false : true}
                  >
                    Register
                  </Button>
                  {otpStatus ? (
                    <span className={classes.success}>{otpMessage}</span>
                  ) : (
                    <span className={classes.error}> {otpMessage}</span>
                  )}

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {pwdStatus ? (
                      <div>
                        <span
                          style={{ float: "left" }}
                          className={classes.success}
                        >
                          {pwdMessage}
                        </span>
                        <Dialog
                          open={dialogOpen}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Player Registation{" "}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Registation Completed.Please login
                            </DialogContentText>
                          </DialogContent>
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
                    ) : (
                      <span style={{ float: "left" }} className={classes.error}>
                        {pwdMessage}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Container>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(customStyles)(Emailverification));
