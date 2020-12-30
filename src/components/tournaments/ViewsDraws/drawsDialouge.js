import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialTable, { Column } from "material-table";
import Grid from "@material-ui/core/Grid";
import { tableIcons } from "../../../formdata";
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import newsStyle from '../../../styles/newsStyle'
import playerDetails from "../../../formdata"
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ApiCall } from "../../../APIService";




class Downloadpdf extends Component {


    constructor(props) {
        super(props);
        this.state = {

            tournamentId: this.props.id,
            tounamentName:this.tounamentgroup,

        };


    }

    componentDidMount() {
     //   this.downloadFile()
    }



    

    // downloadFile = () => {
    //     window.location.href = "https://yoursite.com/src/assets/files/exampleDoc.pdf"
    // }

    // downloadFile = (event) => {

    //     const { tounamentName, tournamentId } = this.state
    //     var params = {};
       
    //     params.type = "downloadDraws";
    //     params.tournamentId = tournamentId;
    //     params.eventName = tounamentName;
    //     params.client_key = "ktta";
    //     params.withscore = false


    //     ApiCall("POST", params, "core")

    //         .then((response) => response.json())
    //         .then((data) => {
    //             this.setState({

    //                 ViewPdf: data,
    //             });
    //         })
    //         .catch((error) => {
    //             console.log("pdf error " + error);
    //         });
    // };
    




    render() {

        const { classes, ViewPdf, open, view, test, onClose, tounamentgroup} = this.props;
      //  const { tournamentId, ViewPdf, tounamentgroup } = this.state
    
     
        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='body'
                maxWidth="md"
            >
                {view ?
                    <React.Fragment>
                        <DialogTitle children="" id="alert-dialog-title"></DialogTitle>
                        {test ? <DialogContent>
                            <DialogContentText id="alert-dialog-description" />
                            <Typography>Do you want to download {tounamentgroup} PDF? </Typography>

                        </DialogContent> : <DialogContent>
                                <DialogContentText id="alert-dialog-description" />
                                <Typography>Do you want to download {tounamentgroup} Draws PDF? </Typography>

                            </DialogContent>
                        }
                       
                        <DialogActions>
                            {" "}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={onClose}
                            >
                                Back
                                     </Button>
                            <Button
                                href={test ? ViewPdf : `data:application/pdf;base64,${ViewPdf}`}
                              
                                download={`${tounamentgroup}` + ".pdf"}
                              
                            //onClick={this.downloadFile}
                            >
                                Download
                                     </Button>


                        </DialogActions>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <DialogTitle children="" id="alert-dialog-title">
                            <Typography color="error">No Data found for {tounamentgroup} </Typography>
                        </DialogTitle>

                    </React.Fragment>


                }

            </Dialog>

        )

    }
}

export default withStyles(newsStyle)(Downloadpdf);


