import React from "react";

import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";

//import playerlist from "../../formdata/playerlist";
import Topbar from "../landingPage/TopBar"; 

import Titlize from "../../commons/genricComponents/titlize"
import Container from '@material-ui/core/Container';
import { ApiCall } from "../../APIService";
import MaterialTable, { MTableToolbar } from "material-table";
import {  tableIcons } from "../../formdata";

import { commons } from "../../commons";







class PlayerList extends React.Component {
    // const[alignment, setAlignment] = React.useState('left');

    constructor(props) {
        super(props);

        this.state = {
          playerList:[],
          loading: false,
        };
    }

 

  componentDidMount() {
    var params = {};
    params.type = "playerlist";
    params.caller = "caller";
    params.apiKey = "apiKey";
    params.filterData = "userId";
    params.filterBy = "Association";
    //params.client_key = "ktta";
    this.setState({ loading: true });
    ApiCall("POST", params, "core")
      .then(res => {
        if (!res["status"]) {
          console.log("api error" + res["status"])
        }
        return res;
      })
      .then((res) => res.json())
      // .then(res => {
      //   if (!res["status"]) {
      //     console.log("api error" + res["status"])
      //   }
      //   return res;
      // })
      .then((res) => {
        this.setState({
          loading: false,

         playerList: res,
        });
      })
      .catch((error) => {
        commons.errorLog(error)
      });
  }
  


   
    formatDate = (inputDate) => {
        inputDate = inputDate.substring(0, 10).split(/\D/g)
        inputDate = inputDate[2] + "-" + inputDate[1] + "-" + inputDate[0]
        return inputDate
    }



    render() {
        const { classes } = this.props;
      const {  playerList ,loading} = this.state;

        return (
          <React.Fragment>
            <CssBaseline />
            <Topbar index={1} />

            <div className={classes.root}>
              <Container maxWidth="lg">
                
                  <MaterialTable
                    title=""
                    columns={[
                      { field: "userName", title: "Name",
                       defaultSort:"asc",
                        render: (rowData) => (
                          <Typography component="div">

                            <Titlize value={rowData.userName.trim()} />


                          </Typography>
                        ),
                      
                      },
                      { field: "emailAddress", title: "Email" },
                      { field: "dateOfBirth", title: "DOB" ,
                        render: (rowData) => (
                          

                          this.formatDate(rowData.dateOfBirth) 


                         
                        ),
                      
                    },
                      { field: "gender", title: "Gender", defaultSort: "asc" },
                      { field: "academy", title: "Academy" },
                      { field: "affiliationId", title: "Affiliation Id" }
                    ]}
                  data={playerList}
                    icons={tableIcons}
                  isLoading={loading}
                  options={{
                    sorting: true,
                     filtering: true, 
                      rowStyle: {
                        textAlign: "left",
                      },
                    
                     
                  }}
                  
                  components={{
                    Toolbar: props => (
                      <div>
                        <MTableToolbar {...props} />
                        <div style={{ padding: "0px 10px", textAlign: "left" }}>
                          <Typography variant="h6" gutterBottom>
                           Players List
                              </Typography>
                        </div>
                      </div>
                    )
                  }}
                  
                  />
            </Container>
            </div>
          </React.Fragment>
        );
    }
}
export default (PlayerList);
