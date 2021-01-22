import React from "react";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import customStyles from "../../../../styles/genricStyle";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import SnackPopup from "../../../../commons/genricComponents/snackbar";
import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import { fileCall } from "../../../../APIService";
import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Typography from "@material-ui/core/Typography";
import formValidation from "../../../../commons/formfunction";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../formdata";
import { commons } from "../../../../commons";

let selectionFlag = false;
//event subscription componet used in dashboard componet
class subscribeEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subsciptionData: "",
      eventlist: [],
      order_id: {},
      uploadedstatus: {},
      checkedEvent: [],
      data: [],
      message: "",
      userStatus: null,
      emptyuser: "",
      result: {
        oldSubscribeId: [],
        subscribeId: [],
        unSubscribeId: [],
      },
      checkedFees: [],
      subscibedEvent: [],
      showpayment: false,
      eventFeeslist: {},
      displayName: "Event Details",
    };
  }
  //api call to check if the user has uploded the dob proof data
  checkidverification = () => {
    let loggeduser = sessioncommons.getUser();
    let apiData = {};
    apiData.entity = "userDoc";
    apiData.userId = loggeduser.userId;

    ApiCall("POST", apiData, "fetchData")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          this.setState({
            pdata: false,
            userStatus: false,
          });
        } else if (res.status == "failure") {
          this.setState({
            pdata: false,
            userStatus: true,
          });
        }
      });
  };
  //submit file componet dob upload document
  onSubmitFile = (e) => {
    e.preventDefault();
    let fileVal = formValidation.validateFile(this.state.uploadedFile);
    this.setState({ message: fileVal });
    if (fileVal) {
      if (!fileVal.status) {
        this.setState({ message: fileVal.msg });
      } else {
        this.setState({ message: fileVal.msg });
        let loggeduser = sessioncommons.getUser();
        let params = {};
        params.entity = "userDoc";
        params.title = loggeduser.userName;
        params.file = this.state.uploadedFile;
        params.userId = loggeduser.userId;
        let fData = new FormData();

        for (let key in params) {
          fData.append(key, params[key]);
        }
        this.setState({ loading: true });
        fileCall("POST", fData, "createData")
          .then((res) => res.json())
          .then((res) => {
            if (res.status == "success") {
              this.setState({
                loading: false,

                uploadedstatus: "File uploaded successfully",
              });

              setTimeout(() => {
                this.onReset();
              }, 1000);
            } else if (res.status == "failure") {
              this.setState({
                loading: false,
                iduploaded: false,
                message: "Please try after some  time",
              });
            }
          })

          .catch((error) => {
            this.setState({
              loading: false,
              iduploaded: false,
              message: "Please try after some  time",
            });

            console.log("upload error " + error);
          });
      }
    }
  };
  //onchange for file handler
  onChange = (e) => {
    this.setState({
      uploadedFile: e.target.files[0],
    });
  };

  //reset file data
  onReset() {
    this.refs.file.value = "";
    this.setState({
      userStatus: false,
    });
  }

  //load the event list for the given userid
  updateData = () => {
    let loggeduser = sessioncommons.getUser();
    let tournamentdata = sessioncommons.getTournament();
    let params = {};

    params.type = "fetchEvents";
    params.userId = loggeduser.userId;
    params.tournamentId = tournamentdata.tournamentId;

    this.setState({ loading: true });
    ApiCall("POST", params, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (!res["status"]) {
          // console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((el) => {
            const index = res.eventFeeSettings.events.findIndex(
              (x) => x === el.abbName
            );
            el.eventfee = res.eventFeeSettings.eventFees[index];
          });

          let feeTotal;

          const oldSubId = [];
          res.data.forEach((e) => {
            if (e.hasOwnProperty("eventParticipants")) {
              if (e.eventParticipants.indexOf(loggeduser.userId) > -1) {
                e.subscibedEvent = true;
                oldSubId.push(e.abbName);
                feeTotal = 0;
              } else {
                e.subscibedEvent = false;
              }
            } else {
              e.subscibedEvent = false;
            }

            this.setState({
              checkedFees: feeTotal,
              loading: false,
              result: {
                oldSubscribeId: oldSubId,
              },
              eventlist: res["data"],
            });
          });
        } else if (res.message) {
          this.setState({
            loading: false,
          });
        }
      })

      .catch((error) => {
        commons.errorLog(error);
      });
  };

  componentDidMount() {
    this.updateData();
    this.checkidverification();
  }

  //selection function for checkbox selection based on row change
  selectionChange = (rows) => {
    const subsribedlist = [];
    let feeTotal;
    const feeList = [];
    if (selectionFlag) {
      selectionFlag = false;
      return;
    }
    if (rows.length === this.state.eventlist.length || rows.length === 0) {
      const row = [...this.state.eventlist];
      row.forEach((ro) => {
        const selectedAll = rows.length === this.state.eventlist.length;
        ro.subscibedEvent = selectedAll;
        if (selectedAll) {
          if (this.state.result.oldSubscribeId.includes(ro.abbName)) {
            subsribedlist.push(ro.eventfee);
            feeTotal = 0;
          } else {
            feeList.push(ro.eventfee);

            feeTotal = JSON.stringify(
              feeList.reduce(
                (accumulator, currentValue) =>
                  parseInt(accumulator) + parseInt(currentValue),
                0
              )
            );
          }
        }
      });

      this.setState({
        eventlist: row,
        checkedFees: feeTotal,
      });
    }
  };
  //update function for checkbox selection based on row selected
  updateSelection = (e, r) => {
    const subsribedlist = [];
    const feeList = [];
    let feeTotal;
    selectionFlag = true;
    const row = [...this.state.eventlist];
    row.forEach((ro) => {
      if (ro._id === r._id) ro.subscibedEvent = e.target.checked;
      if (ro.subscibedEvent) {
        if (this.state.result.oldSubscribeId.includes(ro.abbName)) {
          subsribedlist.push(ro.eventfee);
        } else {
          feeList.push(ro.eventfee);

          feeTotal = JSON.stringify(
            feeList.reduce(
              (accumulator, currentValue) =>
                parseInt(accumulator) + parseInt(currentValue),
              0
            )
          );
        }
      }
    });

    this.setState({
      eventlist: row,
      checkedFees: feeTotal,
    });
  };

  //function payment gateway(razor pay)
  displayRazorpay = async () => {
    let loggeduser = sessioncommons.getUser();
    const res = await commons.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    //function to get order_id to pass to options
    await this.loadpaymentdata();

    const options = {
      key: "rzp_test_ipbJ8OB0OUxB2u",
      currency: "INR",
      amount: (parseInt(this.state.checkedFees) * 100).toString(),
      order_id: this.state.order_id,
      name: "KTTA",
      description: "Subsciption amount",

      handler: (response) => {
        if (response.razorpay_payment_id) {
          this.calculate(response.razorpay_payment_id); //calculate the fees
        }
      },
      prefill: {
        name: loggeduser.userName,
        email: loggeduser.emailAddress,
        phone_number: "9899999999",
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
    let loggeduser = sessioncommons.getUser();

    let apiData = {};
    apiData.client_key = "KTTA1";
    apiData.amount = (parseInt(this.state.checkedFees) * 100).toString();
    apiData.type = "create_order";
    fetch("https://sports-whiz.herokuapp.com/sports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(apiData),
    })
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
  //fee calculation function
  calculate = (transactionID) => {
    const newSubId = [];
    let unSubId = [];

    this.state.eventlist.map((e) => {
      if (
        e.subscibedEvent &&
        this.state.result.oldSubscribeId.indexOf(e.abbName) === -1
      )
        newSubId.push(e.abbName);
    });
    this.state.eventlist.map((e) => {
      if (
        newSubId.indexOf(e.abbName) === -1 &&
        this.state.result.oldSubscribeId.indexOf(e.abbName) !== -1 &&
        !e.subscibedEvent
      )
        unSubId.push(e.abbName);
    });

    const result = { ...this.state.result };
    result.unSubscribeId = unSubId;
    result.subscribeId = newSubId;

    this.setState(
      {
        result: result,
      },
      () => {
        this.onSubmit(transactionID); //api call to sever to store the trnsaction id
      }
    );
  };

  //api call to sever to store the transaction id
  onSubmit = async (transactionID) => {
    const { result, checkedFees } = this.state;
    let loggeduser = sessioncommons.getUser();
    let tournamentdata = sessioncommons.getTournament();
    let params = {};
    params.type = "eventSubscribe";
    params.userId = loggeduser.userId;
    params.tournamentId = tournamentdata.tournamentId;
    params.subscribeID = result.subscribeId;
    params.unSubscribeID = result.unSubscribeId;
    params.transactionID = transactionID;
    params.transactionAmount = checkedFees;
    params.transactionType = "none";
    params.oldSubscribeID = result.oldSubscribeId;

    this.setState({ loading: true });
    await ApiCall("POST", params, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          this.setState({ subsciptionData: res.message, loading: false });
        } 
      })

      .then((res) => {
        this.updateData(); //call the event list api with the upated subscibed/unsubscibed events for the logged user.
      })

      .catch((error) => {
        commons.errorLog(error);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      eventlist,
      userStatus,
      displayName,
      checkedFees,
      result,
      message,
      loading,
      subsciptionData,
      uploadedstatus,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {userStatus ? (
            <Grid container className={classes.giveEntriesgrid} align="center">
              <Grid></Grid>
              <Card className={classes.card}>
                <CardHeader title="DOB proof for verification" />
                <CardContent>
                  <Grid item md={12} sm={12} xs={12}>
                    <input
                      accept="image/*"
                      ref="file"
                      id="contained-button-file"
                      type="file"
                      onChange={this.onChange}
                    />

                    <label htmlFor="contained-button-file">
                      <Button
                        size="small"
                        startIcon={<ArrowUpwardIcon />}
                        component="span"
                        onClick={this.onSubmitFile}
                      >
                        Upload
                      </Button>
                    </label>

                    <Typography variant="body1" color="error">
                      {" "}
                      {message.length ? message : ""}
                    </Typography>
                    {uploadedstatus.length ? (
                      <SnackPopup message={uploadedstatus} type="success" />
                    ) : (
                      ""
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <MaterialTable
              title={displayName}
              columns={[
                {
                  field: "eventName",
                  title: "EventName",
                },
                {
                  field: "eventfee",
                  title: "EventFees",
                },
                {
                  title: "Total",
                  align: "right",
                },
              ]}
              data={eventlist}
              isLoading={loading}
              icons={tableIcons}
              options={{
                toolbar: true,
                showTextRowsSelected: false,
                padding: "dense",
                maxBodyHeight: 600,
                search: false,
                selection: true,
                paging: false,
                filtering: false,

                headerStyle: {
                  backgroundColor: "#f44336a6",
                  color: "#FFF",
                },
                rowStyle: {
                  color: "#000000",
                },
                selectionProps: (rowData) => ({
                  disabled:
                    result.oldSubscribeId.indexOf(rowData.abbName) !== -1,
                  checked: rowData.subscibedEvent || false,
                  onClick: (e) => {
                    this.updateSelection(e, rowData);
                  },
                }),
              }}
              onSelectionChange={(rows) => {
                this.selectionChange(rows);
              }}
            />
          )}

          {!loading && !userStatus ? (
            <React.Fragment>
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        Event Registration Fee (Non-Refundable)
                      </TableCell>
                      <TableCell>{checkedFees}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                onClick={this.displayRazorpay}
                disabled={checkedFees && checkedFees.length ? false : true}
                className={classes.subsciptionbutton}
              >
                Submit
              </Button>
            </React.Fragment>
          ) : (
            ""
          )}

          {subsciptionData.length ? (
            <SnackPopup
              message={`${subsciptionData} Subsciption is active now`}
              type="success"
            />
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(customStyles)(subscribeEvent);
