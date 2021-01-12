import Typography from "@material-ui/core/Typography";

import React from "react";
import Button from "@material-ui/core/Button";

import customStyles from "../../../../styles/genricStyle";

import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";


import { sessioncommons } from "../../../../commons";
import formValidation from "../../../../commons/formfunction";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { fileCall } from "../../../../APIService";

import SnackPopup from "../../../../commons/genricComponents/snackbar";

class Idverification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      uploadedFile: null,
      error: {},
      requestStatus: "",
      uploadedstatus: {},
      iduploaded: null,
    };
  }


    parentupdate = (idstatus)=>{
        this.props.update("idverification", idstatus);
    }
//check if  the user uplaoded documents, based on  the affiliationId of the logged user.
  checkidverification = () => {
    let loggeduser = sessioncommons.getUser()
    let playerdata =  sessioncommons.getplayerDetails()

    if(loggeduser  && playerdata)
    {
      let affiliationId = loggeduser.affiliationId;
      let userId = playerdata.find(
        (obj) => affiliationId === obj["player_affliation_id"]
      );

      if (userId) {
        this.setState(
          {
            iduploaded: true,
          },
          () => {
            this.parentupdate(this.state.iduploaded)
          }
        );
      } else {
        this.setState(
          {
            iduploaded: false,
          },
          () => {
            this.parentupdate(this.state.iduploaded)

          }
        );
      }
    }


    

   
  };
//reset function if file validation fails.
  onReset() {
    //this.refs.file.value = "";
    this.setState({
      uploadedFile: null,
      error: {},
    });
  }
//file upload function 
  onSubmit = (e) => {
    e.preventDefault();
    const { uploadedFile, error } = this.state;
    let validFile = formValidation.validateFile(uploadedFile);
    this.setState({ error: validFile });

    let loggeduser = sessioncommons.getUser()

    if (error.status) {
      let params = {};
      params.client_key = "ktta";
      params.playerName = loggeduser.userName;
      params.affiliationId = loggeduser.affiliationId;
      params.playerEmail = loggeduser.emailAddress;
      params.file = uploadedFile;

      let fData = new FormData();

      for (let key in params) {
        fData.append(key, params[key]);
      }

      fileCall("POST", fData, "playerupload")
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            iduploaded: true,
            uploadedstatus: res,
          });
        })
        .catch((error) => {
          this.setState({
            iduploaded: false,
            requestStatus: "Please try after some  time",
          });

          console.log("upload error " + error);
        });

      this.onReset();
    }
  };
  onChange = (e) => {
    this.setState({
      uploadedFile: e.target.files[0],
    });
  };

  componentDidMount() {
    this.checkidverification();
  }

  render() {
    const { classes } = this.props;
    const { error, iduploaded, uploadedstatus, requestStatus } = this.state;
   

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <Paper elavation={10} square={false}>
            <Grid container spacing={2} align="center">
              {!iduploaded ? (
                <Grid item md={12} sm={12} xs={12}>
                  <Typography variant="h6">
                    Please Upload DOB proof for verification.
                  </Typography>
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
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={this.onSubmit}
                    >
                      Upload
                    </Button>
                  </label>

                  <Typography variant="body1" color="error">
                    {" "}
                    {error.msg ? error.msg : requestStatus}{" "}
                  </Typography>
                  {uploadedstatus.recordAdded ? (
                    <SnackPopup
                      message={uploadedstatus.message}
                      type="success"
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(Idverification);
