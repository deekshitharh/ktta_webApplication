import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import newsStyles from "../../../../styles/newsStyle";

import SnackPopup from "../../../../commons/genricComponents/snackbar"
import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { eventsuscriptionlist } from "../../../../formdata";
import TableDisplay from "../../../../commons/genricComponents/table";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../formdata";
import RefreshLoader from "../../../../commons/genricComponents/pageloader"
import { commons } from "../../commons";
let selectionFlag = false;
class ViewUserEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            eventlist: [],
            checkedEvent: [],
            data: [],
            result: {
                oldSubscribeId: [],
                subscribeId: [],
                unSubscribeId: []
            },
            checkedFees: [],
            subscibedEvent: [],

            eventFeeslist: {},
            // fees: 0,
            displayName: "Event Details",
        };
    }





    componentDidMount() {

        let loggeduser = sessioncommons.getUser();
        let tournamentdata = sessioncommons.getTournament();
        let params = {};
        //params.client_key = "TSA";
        params.type = "events";
        params.userId = loggeduser.userId;
        params.tournamentId = tournamentdata.tournamentId,
            params.apiKey = "apikey"
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

                    res.data.forEach(el => {
                        const index = res.eventFeeSettings.events.findIndex(x => x === el.abbName);
                        el.eventfee = res.eventFeeSettings.eventFees[index];
                    })
                }

                let feeTotal;
                const feeList = [];
                const oldSubId = [];
                res.data.forEach(e => {

                    if (e.subscribeBoolean) {

                        oldSubId.push(e.abbName);
                        const z = feeList.push(e.eventfee);

                        feeTotal = feeList.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0)



                    }

                    this.setState({
                        checkedFees: feeTotal,
                        loading: false,
                        result: {
                            oldSubscribeId: oldSubId
                        },
                        eventlist: res["data"],
                        // checkedEvent: checkedEvent,
                        // checkedFees: l
                    });
                });





            })
            .catch((error) => {
                commons.errorLog(error)
            });


    }

    updateSelection = (e, r) => {
        
        const feeList = [];
        let feeTotal;
        selectionFlag = true;
        const row = [...this.state.eventlist];
        row.forEach(ro => {
            if (ro._id === r._id) ro.subscribeBoolean = e.target.checked;
            if (ro.subscribeBoolean) {


                const z = feeList.push(ro.eventfee);

                feeTotal = JSON.stringify(feeList.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0))
            }
        });

        this.setState({
            eventlist: row,
            checkedFees: feeTotal
        });
    };


    calculate = () => {

        const newSubId = [];
        let unSubId = [];

        this.state.eventlist.map(e => {
            if (
                e.subscribeBoolean &&
                this.state.result.oldSubscribeId.indexOf(e.abbName) === -1
            )
                newSubId.push(e.abbName);

        });
        this.state.eventlist.map(e => {
            if (
                newSubId.indexOf(e.abbName) === -1 &&
                this.state.result.oldSubscribeId.indexOf(e.abbName) !== -1 &&
                !e.subscribeBoolean
            )
                unSubId.push(e.abbName);
        });

        // this.state.eventlist.map(e => {
        //   let x = this.state.result.oldSubscribeId.filter(val => unSubId.includes(val))
        //   unSubId.filter(item => !x.includes(item))
        //   unSubId = unSubId.filter(item => !x.includes(item))
        // });



        const result = { ...this.state.result };
        result.unSubscribeId = unSubId;
        result.subscribeId = newSubId;

        this.setState(
            {
                result: result
            },
            // () => {
            //   this.onSubmit()
            // }

        );


    }

    onSubmit = () => {


        const { result, checkedFees } = this.state

        let loggeduser = sessioncommons.getUser();
        let tournamentdata = sessioncommons.getTournament();
        let params = {};
        params.client_key = "TSA";
        params.type = "events",
            params.caller = "caller",
            params.apiKey = "apikey"
        params.data = {

            caller: "caller",
            apiKey: "apikey",
            userId: loggeduser.userId,
            tournamentId: tournamentdata.tournamentId,
            subscribeID: result.subscribeId,
            unSubscribeID: result.unSubscribeId,
            transactionID: "none",
            transactionAmount: checkedFees,
            transactionType: "none",
            oldSubscribeID: result.oldSubscribeId
        }


        this.setState({ loading: true });
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
                    loading: false,
                    data: res["data"],
                });
            })
            .catch((error) => {
                console.log("errror" + error);
            });

    };




    selectionChange = rows => {
        
        let feeTotal;
        const feeList = [];
        if (selectionFlag) {
            selectionFlag = false;
            return;
        }
        if (rows.length === this.state.eventlist.length || rows.length === 0) {

            const row = [...this.state.eventlist];
            row.forEach(ro => {
                const selectedAll = rows.length === this.state.eventlist.length;
                ro.subscribeBoolean = selectedAll;
                if (selectedAll) {

                    const z = feeList.push(ro.eventfee);
                    feeTotal = JSON.stringify(feeList.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0))
                }
            });

            this.setState({
                eventlist: row,
                checkedFees: feeTotal
            });
        }
    };



    render() {
        const { classes } = this.props;
        const { eventlist, displayName, checkedFees, result, loading, checkedEvent } = this.state;
        //console.log("fees data", eventlist)

      

        return (
            <React.Fragment>
                <CssBaseline />

                <div className={classes.root}>
                    {/* <Grid container justify="center"> */}
                    {checkedFees}
                    <Paper elavation={10} square={false}>
                        <Grid container spacing={2} align="center">
                            <Grid item md={12} sm={12} xs={12}>

                                <MaterialTable
                                    title={displayName}
                                    columns={[
                                        {
                                            field: "eventName", title: "EventName"

                                        },
                                        {
                                            field: "eventfee",
                                            title: "EventFees",
                                            // render: (rowData) => this.handlefee(rowData.abbName),
                                        },
                                    ]}
                                    localization={{
                                        toolbar: {
                                            nRowsSelected: `Amount to be paid: ${checkedFees}`,
                                            color: "green"
                                        }
                                    }}

                                    data={eventlist}
                                    isLoading={loading}
                                    icons={tableIcons}
                                    options={{
                                        maxBodyHeight: 600,
                                        search: false,
                                        selection: true,
                                        paging: false,
                                        filtering: false,
                                        // filtering: true,

                                        // filtering: true,
                                        headerStyle: {
                                            backgroundColor: "#f44336a6",
                                            color: "#FFF",
                                        },
                                        rowStyle: {

                                            color: "#000000",
                                        },
                                        selectionProps: rowData => ({
                                            checked: rowData.subscribeBoolean,
                                            onClick: e => {
                                                this.updateSelection(e, rowData);
                                            }
                                        })
                                    }}


                                    onSelectionChange={(rows) => {


                                        this.selectionChange(rows);

                                    }
                                    }


                                />

                                <Button
                                    onClick={this.calculate}
                                    disabled={checkedFees ? false : true}
                                    style={{ float: 'right', marginLeft: 'auto', margin: '10px', }}
                                >
                                    Submit
                </Button>




                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(ViewUserEntries);