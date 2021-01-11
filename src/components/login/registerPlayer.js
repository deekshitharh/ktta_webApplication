import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import {  withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import customStyles from "../../styles/genricStyle";
import Paper from "@material-ui/core/Paper";
import { sessioncommons } from "../../commons";
import { ApiCall } from "../../APIService";
import formValidation from "../../commons/formfunction";
import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { commons } from "../../commons";
import { registration, registred_clubs } from "../../formdata";
import FormGenerator from "../../commons/genricComponents/formGenerator";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import RefreshLoader from "../../commons/genricComponents/pageloader";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { DialogActions } from "@material-ui/core";
class playerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      emailfield: this.props.update,
      otpcode: this.props.otp,
      otpStatus: false,
      pwdStatus: false,
      otpbutton: false,
      otpMessage: "",
      pwdMessage: "",
      order_id: {},
      registredClub: [],
      dialogOpen: false,
      loading: false,
      regfees: "1",
      paymentid: "",
      registredClubdu: registred_clubs,
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
    //this.loadClubData();
    let emailvalue = this.state.emailfield;

    let formDataControl = [...JSON.parse(JSON.stringify(registration))];
    // const formDataControl = [...changePasswordForm];

    formDataControl.map((item, index) => {
      if (item.key === "emailAddress") {
        item["value"] = emailvalue[0].value;
      }
    });

    this.setState({
      formData: formDataControl,
    });
  }

  resetForm = () => {
    let emailvalue = this.state.emailfield;

    let formDataControl = [...JSON.parse(JSON.stringify(registration))];
    // const formDataControl = [...changePasswordForm];

    formDataControl.map((item, index) => {
      if (item.key === "emailAddress") {
        item["value"] = emailvalue[0].value;
      }
    });

    this.setState({
      formData: formDataControl,
      otpStatus: false,
    });
  };
  handleDialog = () => {
    this.setState({ dialogOpen: false });
    this.props.history.push("/login");
  };



  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  displayRazorpay = async (formdata) => {
    let loggeduser = sessioncommons.getUser();
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    await this.loadpaymentdata();

    // console.log(data)

    const options = {
      key: "rzp_live_kApuBzXGZuYXGG",
      currency: "INR",
      amount: (parseInt(this.state.regfees) * 100).toString(),
      order_id: this.state.order_id,
      name: "PLAYER REGISTRATION",
      description: "Registration amount",

      handler: (response) => {
        alert(response.razorpay_payment_id);
        if (response.razorpay_payment_id) {
          this.setState({ paymentid: response.razorpay_payment_id });
          this.submitfom(response.razorpay_payment_id, this.state.regfees);
        }
      },
      prefill: {
        name: formdata.name,
        email: formdata.email,
        phone_number: formdata.phoneNo,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.description);
    });
    paymentObject.open();
  };

  loadpaymentdata = async () => {
    const formvalues = this.state.formData;
    let data = commons.displayfileds(formvalues);

    let timeStamp = data.email + "_" + Math.floor(Date.now());
    let apiData = {};
    apiData.amount = (parseInt(this.state.regfees) * 100).toString();
      apiData.receipt = timeStamp;
    await ApiCall("POST", apiData, "playreg")
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          this.setState({ order_id: res.orderId });
        }
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  submitfom = async (id, amount) => {
    const formvalues = this.state.formData;

    let data = commons.displayfileds(formvalues);

    let apiData = {};
    apiData.type = "playerreg";

    apiData.caller = "caller";
    apiData.apiKey = "apikey";
    apiData.userName = data.name;
    apiData.verificationCode = data.otp;
    apiData.emailAddress = data.email;
    apiData.password = data.password;
    apiData.clubNameId = data.clubNameId;
    apiData.regOverride = true;
    apiData.transactionID = id;
      apiData.transactionAmount = amount;
      apiData.approvalCode = "TSA";
    apiData.role = "Player";
    apiData.academy = "none";
    apiData.associationId = "";
    //apiData.phoneNumber = data.phoneNo
    apiData.dob = data.DOB;
    this.setState({ loading: true });
    await ApiCall("POST", apiData, "core")
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data) {
          if (res.data.status == "failure") {
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
        }
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };

  verifyForm = async (e) => {
    debugger
    e.preventDefault();
    this.setState({ pwdMessage: "" });
    let formData = this.state.formData;
    let data = commons.displayfileds(formData);
    formData = await formValidation.genricFromValidation(
      formData,
      this.state.otpcode
    );
    console.log("cnjdk", formData);
    let result = formData.find((item) => {
      if (item && item.error.length) return item;
    });

    this.setState({ formData: formData });

    if (result === undefined) {
      this.displayRazorpay(data);
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
          //let formatDate = moment(e.target.value).format('DD MMM YYYY');
          item.value = e.target.value;

          //console.log("mokme", moment(e.target.value).format('DD MMM YYYY'))
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
    const { classes } = this.props;
    const {
      formData,
     
      registredClubdu,
      pwdStatus,
     
      pwdMessage,
      dialogOpen,
      loading,
    } = this.state;

    let role_groups = formValidation.chunkArray(2, formData);

    console.log(formData);

    return (
      <React.Fragment>
        <CssBaseline />

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
              
            >
              <RefreshLoader display="overlay" loading={loading} />
            </Grid>

            <Container maxWidth="sm">
              <Card style={{ margin: "10px" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      style={{
                        margin: 8,
                        backgroundColor: "red",
                      }}
                    >
                      R
                    </Avatar>
                  }
                  title="Player Registration"
                />
                <CardContent>
                  <FormGenerator
                    data={registredClubdu}
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

                  <Button
                    onClick={this.verifyForm}
                    style={{ marginTop: 10 }}
                    fullWidth
                  >
                    Register
                  </Button>

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
export default withRouter(withStyles(customStyles)(playerRegister));
