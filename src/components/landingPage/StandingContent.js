import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { standingData } from "../../formdata"
import ViewMorePage from "./linkpage"
import MaterialTable, { MTableToolbar } from "material-table";
import {tableIcons } from "../../formdata";

import Titlize from "../../commons/genricComponents/titlize";

import { ApiCall } from "../../APIService";
import { commons } from "../../commons";
import Fontawsome from "../../commons/genricComponents/fontAwsomicon"
export default class StandingContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      standings: [],
    
    };
  }


  loadStandingData = () => {
    let apiData = {};
    apiData.type = "fetchStandings";
    
   

    ApiCall("POST", apiData, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (!res["status"]) {
          console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => {
        this.setState({
          standings: res["data"],
        
        });
      })
      .catch((error) => {
        commons.errorLog(error)
      });
  };

  componentDidMount = () => {
    this.loadStandingData();
  };





    render() {
        const { classes } = this.props;
      const {standings}=this.state

        return (
          <div className={classes.root}>
            <Paper elevation={3}>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" component="h6" style={{ flex: 1 }}>
                  Top Rank Players
                </Typography>
                <ViewMorePage pathname="/player_ranking" title="VIEW ALL" />
              </div>
              <Divider />
              <MaterialTable
                  columns={[
                    {
                      field: "eventName",
                      title: "Event Name",
                      filtering: false,
                      sorting:false,

                      render: (rowData) => (
                        <Typography component="p">
                        {rowData.eventName} 
                        </Typography>
                      ),
                    },
                    { field: "playerName", title: "Player Name", sorting:false, filtering: false ,
                    render: (rowData) => (
                      <Typography component="p">
                        {rowData.playerName} 
                      </Typography>
                    ),
                  
                  },
                    { field: "totalPoints", title: "Points", sorting:false, filtering: false },
                  ]}
                
                  localization={{
                    pagination: {
                      labelDisplayedRows: '4-6 of 10',
                      labelRowsPerPage:'{4, 4, 25,100}'
                    },
              
                  }}
                  data={standings}
                  icons={tableIcons}
                  options={{
                    search:false,
                    toolbar:false,
                    rowStyle: {
                      textAlign: "left",
                    },
                    filtering: false,
                    paging:true,
                    pageSize:4,       // make initial page size
                     //to make page size fix in case of less data rows
                    pageSizeOptions:[6,12,20,50],    // rows selection options
                  }}
                
                />
            </Paper>
          </div>
        );
    }
}



