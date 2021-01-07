import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
//import playerlist from "../../formdata/playerlist";
import Topbar from "../landingPage/TopBar";
import Paper from "@material-ui/core/Paper";
import RefreshLoader from "../../commons/genricComponents/pageloader"
import Titlize from "../../commons/genricComponents/titlize"
import Container from '@material-ui/core/Container';
import { ApiCall } from "../../APIService";
import MaterialTable, { MTableToolbar } from "material-table";
import { selectButtons, tableIcons } from "../../formdata";
import ResponsiveListDailouge from "./responsiveListDilouge";
import Link from '@material-ui/core/Link';
import { playerval } from "../../formdata"
import { playerList } from "../../formdata"
import { commons } from "../../commons";





class ResponsivePlayerList extends React.Component {
    // const[alignment, setAlignment] = React.useState('left');

    constructor(props) {
        super(props);

        this.state = {
           // playerval: playerval,
            playerList: [],
            loading: false,
            open: false,
            playerName:""
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

    openDialog = (name) => {


                this.setState({
                    playerName:name,
                    open: true
                });
            
           

    }
    handleClose = () => {
        this.setState({
            open: false

        });
    };






    render() {
        const { classes } = this.props;
        const { value, playerval,playerList, open, loading,  playerName } = this.state;
console.log("dummy", JSON.stringify( playerval))
        return (
            <React.Fragment>
                <CssBaseline />
                <Topbar index={1} />

                <div>
                    <Container maxWidth="sm">

                        <MaterialTable
                            title=""
                            columns={[
                                {
                                    field: "userName", title: "Name",

                                    render: (rowData) => (
                                        <Typography component="div">
                                            <Link
                                                style={{ cursor: "pointer" }}
                                                onClick={() => this.openDialog(rowData.userName)}
                                            >
                                                <Titlize value={rowData.userName.trim()} />
                                            </Link>
                                           


                                        </Typography>
                                    ),

                                },
                              
                                { field: "academy", title: "Academy",
                              render: (rowData) => (
                                        <Typography component="div">
                                           
                                               
                                            
                                                <Titlize value={rowData.academy.trim()} />
                                           



                                        </Typography>
                                    ),
                                
                                
                                
                            
                                },
                             
                            ]}
                          data={playerList} 
                           // data={playerval}
                            icons={tableIcons}
                            isLoading={loading}
                            options={{
                                filtering: true,
                                rowStyle: {
                                    textAlign: "left",
                                },
                                filtering: true,
                               
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

                <ResponsiveListDailouge
                    
                    open={open}
                  
                    playerdata={playerList}
                    playername={playerName}
                    onClose={this.handleClose}
                />

            </React.Fragment>
        );
    }
}
export default (ResponsivePlayerList);