import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import customStyles from "../../styles/genricStyle";
import Paper from "@material-ui/core/Paper";
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
//player registration component
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
    };
    this.verifyForm = this.verifyForm.bind(this);

    this.handleDialog = this.handleDialog.bind(this);
  }
  //api call for club data  which is used in dropdown  in registration form
  loadClubData = () => {
    let params = {};
    params.type = "academylist";
    ApiCall("POST", params, "coreApi")
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
    //registration change fields
    this.loadClubData();
    let emailvalue = this.state.emailfield;
    let formDataControl = [...JSON.parse(JSON.stringify(registration))];
    formDataControl.map((item, index) => {
      if (item.id === "emailAddress") {
        item["value"] = emailvalue[0].value;
      }
    });
    this.setState({
      formData: formDataControl,
    });
  }

  //clear fileds if registration fails
  resetForm = () => {
    let emailvalue = this.state.emailfield;
    let formDataControl = [...JSON.parse(JSON.stringify(registration))];
    formDataControl.map((item) => {
      if (item.id === "emailAddress") {
        item["value"] = emailvalue[0].value;
      }
    });

    this.setState({
      formData: formDataControl,
      otpStatus: false,
    });
  };

  //dialog for  registration completion message
  handleDialog = () => {
    this.setState({ dialogOpen: false });
    this.props.history.push("/login");
  };

  //displaying payement modal
  displayRazorpay = async (formdata) => {
    const res = await commons.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    //function to get order_id to pass to options of razorpay modal
    await this.loadpaymentdata();
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
  //api call for  oder_id for payment
  loadpaymentdata = async () => {
    const formvalues = this.state.formData;
    let data = commons.displayfileds(formvalues);

    // let timeStamp = data.email + "_" + Math.floor(Date.now());
    let apiData = {};
    apiData.type = "create_order";
    apiData.amount = (parseInt(this.state.regfees) * 100).toString();

    await ApiCall("POST", apiData, "coreApi")
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

  //api call to server to store the transaction_id/form fileds
  submitfom = async (id, amount) => {
    const formvalues = this.state.formData;
    let data = commons.displayfileds(formvalues);
    let apiData = {};
    apiData.type = "playerReg";
    apiData.userName = data.name;
    apiData.verificationCode = data.otp;
    apiData.emailAddress = data.email;
    apiData.password = data.password;
    apiData.clubNameId = data.clubNameId;
    apiData.transactionID = id;
    apiData.transactionAmount = amount;
    apiData.approvalCode = "TSA";
    apiData.dob = data.DOB;
    this.setState({ loading: true });
    await ApiCall("POST", params, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data) {
          if (res.data.status === "failure") {
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
  //function for form validation
  verifyForm = async (e) => {
    debugger;
    e.preventDefault();
    this.setState({ pwdMessage: "" });
    let formData = this.state.formData;
    let data = commons.displayfileds(formData);
    formData = await formValidation.genricFromValidation(
      formData,
      this.state.otpcode
    );

    let result = formData.find((item) => {
      if (item && item.error.length) return item;
    });

    this.setState({ formData: formData });

    if (result === undefined) {
      this.displayRazorpay(data);
    }
  };

  //change handler for input fileds of form.
  onChange = (e) => {
    let formDataInput = [...this.state.formData];
    this.setState({ otpMessage: "" });
    formDataInput.find((item) => {
      if (item.id === e.target.name) {
        item.type === "number"
          ? (item.value = parseInt(e.target.value))
          : (item.value = e.target.value);

        if (item.id === e.target.name && item.type !== "string")
          item.value = e.target.value;
        if (item.type === "date") {
          item.value = e.target.value;
        }

        if (item.id === e.target.name && item.id === "emailAddress") {
          item.value = e.target.value;
          this.setState({ formData: formDataInput });
          this.showotpval();
        } else if (item.id === e.target.name && item.type === "string")
          item.value = e.target.value;
      }
    });
    this.setState({ formData: formDataInput });
  };

  render() {
    const { classes } = this.props;
    const {
      formData,
      pwdStatus,
      registredClub,
      pwdMessage,
      dialogOpen,
      loading,
    } = this.state;

    let role_groups = formValidation.chunkArray(2, formData);

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid
              justify="center"
              alignItems="center"
              container
              className={classes.fogotGrid}
            >
              <RefreshLoader display="overlay" loading={loading} />
            </Grid>

            <Container maxWidth="sm">
              <Card className={classes.loginCard}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  title="Player Registration"
                />
                <CardContent>
                  <FormGenerator
                    data={registredClub}
                    groups={role_groups}
                    groupBy={2}
                    onChange={this.onChange}
                  />
                  <Button
                    onClick={this.verifyForm}
                    className={classes.sponsergid}
                    fullWidth
                  >
                    Register
                  </Button>

                  <div className={classes.fogotdialougegrid}>
                    {pwdStatus ? (
                      <div>
                        <span className={classes.success}>{pwdMessage}</span>
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
                      <span className={classes.error}>{pwdMessage}</span>
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
