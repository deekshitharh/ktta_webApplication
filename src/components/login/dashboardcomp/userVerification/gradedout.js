let selectionFlag = false;
class ViewUserEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            subsciptionData: "",
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

    updateData = () => {
        let loggeduser = sessioncommons.getUser();
        let tournamentdata = sessioncommons.getTournament();
        let params = {};
        //params.client_key = "TSA";
        params.type = "events";
        params.userId = loggeduser.userId;
        (params.tournamentId = tournamentdata.tournamentId),
            (params.apiKey = "apikey");
        params.caller = "caller";
        (params.apiKey = "apikey"),
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
                let feeTotal = 0;
                const oldSubscribeId = [];
                res.data.forEach(e => {
                    if (e.subscribeBoolean) {
                        oldSubscribeId.push(e.abbName);
                    }
                });
                this.setState({
                    checkedFees: feeTotal,
                    loading: false,
                    eventlist: res["data"],
                    result: {
                        subscribeId: [],
                        unSubscribeId: [],
                        oldSubscribeId: oldSubscribeId
                    }
                    // checkedEvent: checkedEvent,
                    // checkedFees: l
                });
            })
            .catch((error) => {
                console.log("errror " + error);
            });
    }



    componentDidMount() {
        this.updateData()



    }

    // updateSelection = (e, r) => {

    //   const feeList = [];
    //   let feeTotal;
    //   selectionFlag = true;
    //   const row = [...this.state.eventlist];
    //   row.forEach(ro => {
    //     if (ro._id === r._id) ro.subscribeBoolean = e.target.checked;
    //     if (ro.subscribeBoolean && this.state.result.oldSubscribeId.indexOf(ro.abbName) === -1) {


    //       const z = feeList.push(ro.eventfee);

    //       feeTotal = JSON.stringify(feeList.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0))
    //     }
    //   });

    //   this.setState({
    //     eventlist: row,
    //     checkedFees: feeTotal
    //   });
    // };

    updateSelection = (e, r) => {

        let feeTotal = 0;
        let feeList = [];
        selectionFlag = true;
        const row = [...this.state.eventlist];
        row.forEach(ro => {
            if (ro._id === r._id) ro.subscribeBoolean = e.target.checked;
            if (ro.subscribeBoolean && this.state.result.oldSubscribeId.indexOf(ro.abbName) === -1) {

                feeTotal = feeTotal + (parseInt(ro.eventfee) || 0);
            }
        });
        this.setState({
            eventlist: row,
            checkedFees: feeTotal
        });
    };


    calculate = () => {

        const newSubId = [];
        const unSubId = [];
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
        const result = { ...this.state.result };
        result.unSubscribeId = unSubId;
        result.subscribeId = newSubId;

        this.setState(
            {
                result: result
            },
            () => {
              //  this.onSubmit()
            }

        );


    }

    onSubmit = () => {


        const { result, checkedFees } = this.state

        let loggeduser = sessioncommons.getUser();
        let tournamentdata = sessioncommons.getTournament();
        let params = {};
        // params.client_key = "TSA";
        params.type = "eventSubscribe",
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
            .then(res => res.json())
            .then((res) => {
                if (res.message === "success") {
                    this.setState({ subsciptionData: res.message, loading: false })


                }
                else {
                    // this.setState({ "pwdStatus": true, "dialogOpen": true, loading: false })
                    // this.resetForm();
                }



            })

            .then((res) => {
                this.updateData();
            })

            .catch((error) => {

                console.log("login error " + error);
            });



    };




    selectionChange = rows => {
        let feeTotal = 0;
        const feeList = [];
        if (selectionFlag) {
            selectionFlag = false;
            return;
        }
        if (rows.length === this.state.eventlist.length || rows.length === 0) {
            const row = [...this.state.eventlist];
            row.forEach(ro => {
                const selectedAll = rows.length === this.state.eventlist.length;
                const isDeFrozen = this.state.result.oldSubscribeId.indexOf(ro.abbName) === -1;
                if (isDeFrozen)
                    ro.subscribeBoolean = selectedAll;
                if (selectedAll && isDeFrozen) {
                    feeTotal = feeTotal + parseInt(ro.eventfee);
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
        const { eventlist, displayName, checkedFees, subsciptionData, result, loading, checkedEvent } = this.state;
      
        return (
            <React.Fragment>
                <CssBaseline />

                <div className={classes.root}>
                    {/* <Grid container justify="center"> */}

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
                                            disabled: result.oldSubscribeId.indexOf(rowData.abbName) !== -1,
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

                                {(subsciptionData.length) ? (<SnackPopup message={`${subsciptionData} Subsciption Done!!!!`} type="success" />) : ""}


                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(ViewUserEntries);
