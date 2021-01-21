
import React from "react";
import moment from "moment";
import InfoComponent from "../../../../commons/genricComponents/infoComponent";

import customStyles from "../../../../styles/genricStyle";
import MaterialTable, { MTableToolbar } from "material-table";

import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import { commons } from "../../../../commons";

import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";


import { tableIcons } from "../../../../formdata";

import { schedule } from "../../../../formdata";
class SceduleTournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus:"",
      loading: false,
      eventSchedule: schedule,
      eventData: [],
    };
  }

  componentDidMount() {
    let tournamentdata = sessioncommons.getTournament();

     var apiData={};
    apiData.client_key="KTTA1";
    apiData.type="fetchEventSchedule",
    apiData.tournamentId =  tournamentdata.tournamentId;

    this.setState({ loading: true });
    fetch('https://sports-whiz.herokuapp.com/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(apiData)
    }) .then((res) => res.json())
    .then((res) => {
    if (res.status === "success") {
        this.setState({
          eventData:res.data,
          loading: false
         
        });
      } else if (res.status == "failure") {
        this.setState({
          loading: false,
          userStatus: res.message,
         
        });
      }
    })



    
  }
//api call for fetching match schedule based on tounamnet ID
 
  

  render() {
    const { classes } = this.props;
    const {
    
      eventData,
      userStatus,
      loading,
     
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <Paper elavation={10} square={false}>
            {userStatus.length?<InfoComponent
                  variant="h4"
                  message={userStatus}
                />:<Grid container align="center">
                <Grid item md={12} sm={12} xs={12}>
                  <MaterialTable
                    title=""
                    columns={[
                      {
                        field: "scheduleDate",
                        title: "Date",
                        render: (rowData) =>  moment(rowData.scheduleDate).format('l'),
                       
                      },
                      {
                        field: "eventName",
                        title: "Event Name",
                     
                      },
                      {
                        field: "startTime",
                        title: "Start Time",
                       
                      },
                      {
                        field: "endTime",
                        title: "endTime",
                       
                      },
                      {
                        field: "roundNo",
                        title: "round No",
                        
                      },
                    ]}
                    localization={{
                      pagination: {
                        labelDisplayedRows: '4-6 of 10',
                        labelRowsPerPage:'{4,10,20}'
                      },
                
                    }}
                    data={eventData}
                    isLoading={loading}
                    icons={tableIcons}
                    options={{
                      toolbar: false,
  
                      padding: "dense",
  
                      search: false,
  
                      paging: false,
                      filtering: false,
                     
                      paging:true,
                      pageSize:5, // make initial page size
                       //to make page size fix in case of less data rows
                      pageSizeOptions:[6,12,20,50],
                      headerStyle: {
                        backgroundColor: "#f44336a6",
                        color: "#FFF",
                      },
                      rowStyle: {
                        color: "#000000",
                      },
                    }}
                  />
                </Grid>
              </Grid>}
            
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(SceduleTournament);
