import Typography from "@material-ui/core/Typography";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import customStyles from "../../../../styles/genricStyle";
import Fontawsome from "../../../../commons/genricComponents/fontAwsomicon"
import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { commons } from "../../../../commons";
import RefreshLoader from "../../../../commons/genricComponents/pageloader"
import moment from "moment";
import { drawresults, mresults} from "../../../../formdata"
import { editData } from "../../../../formdata"
import { withRouter } from "react-router-dom";
import { Route, Redirect } from 'react-router-dom';
import { sessioncommons } from "../../../../commons"
class displaydraws extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            matchresults: [],
            status: false,
            message: "",
            loading: false,
            emessage:"",
            data: {}
        }
  
    }







    handleClick =(x) => {
       

          
        
     
       if (Object.keys(this.state.data).length)
        {
         sessioncommons.setdrawData(this.state.data)
        }
        this.props.history.push(`/showdraws/${x}`);
       
    
    //    
    //     let loggeduser = sessioncommons.getTournament();
    //     let params = {};

      
    //     params.type ="matchresults"

    //     params.apiKey = "apikey";
    //     params.caller = "caller";
        
       
    //     params.data= {
    //         "tournamentId": loggeduser.tournamentId,
    //             "eventName": x


    //     }
    //     this.setState({ loading: true });
    //     ApiCall("POST", params, "core")
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.status === "success" && res.result) {
                 
               


    //                 this.setState({ "matchresults":res, loading: false, })
                
    //             }
    //             else if (res.status === "failure") {

    //                 this.setState({


    //                     "emessage": res.response, loading: false 

    //                 });
    //             }



    //         }).catch(error => {
    //             commons.errorLog(error)
    //         });



     
    };

  
    


    componentDidMount() {
        this.setState({ data: mresults })
        //this.loadshowResults()
      
       
}

   
  


   


   
  

    render() {
        const { classes, sideBar } = this.props;
        const { userProfile, loading, message, emessage } = this.state;

    

      


        return (
            <React.Fragment>
                <CssBaseline />
           
                <div className={classes.root}>
                  
                        <Table
                             style={{width:"50%",
                        borderSpacing: "0 5px",
                       borderCollapse: "separate"
                    
                    }}
                            //  className={classes.table}
                            size="small"
                            aria-label="simple table"
                        >
                          
                            <TableBody>

                            {drawresults.map((row, index) => {
                               
                                return (
                                    <TableRow key={index}
                                      
                                    >
                                        <TableCell component="th" scope="row"
                                            onClick={() => this.handleClick(row.fEvent.event)}
                                        >
                                            <Fontawsome
                                                name={row.fEvent.icon}
                                                size="2x"
                                                style={{ width: "0.9em", color: "#D85B6D" }}
                                            />
                                          
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.category}
                                        </TableCell>
                                        <TableCell align="left"
                                            onClick={() => this.handleClick(row.mEvent.event)}
                                        >
                                       
                                           
                                            <Fontawsome
                                                name={row.mEvent.icon}
                                                size="2x"
                                                style={{ width: "0.9em", color: "#D85B6D" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                   
                          
                </div>
            </React.Fragment>
























        )
    }

}
export default withRouter( withStyles(customStyles)(displaydraws));
