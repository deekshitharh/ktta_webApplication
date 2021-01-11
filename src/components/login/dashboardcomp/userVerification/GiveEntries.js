
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
import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";


import MaterialTable from "material-table";
import { tableIcons } from "../../../../formdata";
import { commons } from "../../../../commons";

let selectionFlag = false;
class subscribeEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subsciptionData: "",
      eventlist: [],
      order_id: {},
      checkedEvent: [],
      data: [],
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
      // fees: 0,
      displayName: "Event Details",
    };
  }

  updateData = () => {
    let loggeduser = sessioncommons.getUser();
    let tournamentdata = sessioncommons.getTournament();
    let params = {};

    params.type = "events";
    params.userId = loggeduser.userId;
    params.tournamentId = tournamentdata.tournamentId;
      params.apiKey = "apikey";
    params.caller = "caller";

    this.setState({ loading: true });
    ApiCall("POST", params, "core")
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
                // const z = feeList.push(e.eventfee);
                // feeTotal = feeList.reduce((accumulator, currentValue) => parseInt(accumulator) +parseInt(currentValue), 0)
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
              // checkedEvent: checkedEvent,
              // checkedFees: l
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
  }

  // subscribecalcultion = (ro, value) => {
  //
  //   const subsribedlist = []
  //   const feeList = [];
  //   let feeTotal;
  //   const row = [...this.state.eventlist];
  //   if (value === "limited") {
  //     row.forEach(ro => {
  //       if (ro._id === r._id) ro.subscibedEvent = e.target.checked;
  //       if (ro.subscibedEvent) {

  //         if (this.state.result.oldSubscribeId.includes(ro.abbName)) {
  //           const z = subsribedlist.push(ro.eventfee);
  //           feeTotal = "Already subscribed"
  //         }
  //         else {
  //           const z = feeList.push(ro.eventfee);

  //           feeTotal = JSON.stringify(feeList.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0))
  //         }
  //       }
  //     });

  //     }
  //   else if (value == "checkedAll")
  //   {
  //     row.forEach(ro => {
  //       const selectedAll = rows.length === this.state.eventlist.length;
  //       ro.subscibedEvent = selectedAll;
  //       if (selectedAll) {

  //         if (this.state.result.oldSubscribeId.includes(ro.abbName)) {
  //           const z = subsribedlist.push(ro.eventfee);
  //           feeTotal = "Already subscribed"
  //         }
  //         else {
  //           const z = feeList.push(ro.eventfee);

  //           feeTotal = JSON.stringify(feeList.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0))
  //         }
  //       }

  //     });

  //     }

  //   this.setState({
  //     eventlist: row,
  //     checkedFees: feeTotal
  //   });

  // }

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

  displayRazorpay = async () => {
  

    let loggeduser = sessioncommons.getUser();
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

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
          this.calculate(response.razorpay_payment_id);
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

  loadpaymentdata = async () => {
    let loggeduser = sessioncommons.getUser();
    let timeStamp = loggeduser.affiliationId + "_" + Math.floor(Date.now());
    let apiData = {};
    apiData.amount = (parseInt(this.state.checkedFees) * 100).toString();
      apiData.receipt = timeStamp;
    await ApiCall("POST", apiData, "payment")
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
        this.onSubmit(transactionID);
      }
    );
  };

  onSubmit = async (transactionID) => {
    const { result, checkedFees } = this.state;

    let loggeduser = sessioncommons.getUser();
    let tournamentdata = sessioncommons.getTournament();
    let params = {};

    params.type = "eventSubscribe";
      params.caller = "caller";
      params.apiKey = "apikey";
      params.data = {
      userId: loggeduser.userId,
      tournamentId: tournamentdata.tournamentId,
      subscribeID: result.subscribeId,
      unSubscribeID: result.unSubscribeId,
      transactionID: transactionID,
      transactionAmount: checkedFees,
      transactionType: "none",
      oldSubscribeID: result.oldSubscribeId,
    };

    this.setState({ loading: true });
    await ApiCall("POST", params, "core")
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          this.setState({ subsciptionData: res.message, loading: false });
        } else {
          // this.setState({ "pwdStatus": true, "dialogOpen": true, loading: false })
          // this.resetForm();
        }
      })

      .then((res) => {
        this.updateData();
      })

      .catch((error) => {
        commons.errorLog(error);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      eventlist,
     
      displayName,
      checkedFees,
      result,
      loading,
      subsciptionData,
     
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

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
                disabled: result.oldSubscribeId.indexOf(rowData.abbName) !== -1,
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
          {!loading ? (
            <React.Fragment>
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        Event Event Registration Fee (Non-Refundable)
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
