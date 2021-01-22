import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import newsStyle from "../../../styles/genricStyle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//genic download pdf component used in dashboard js to download pdf of prospectus
//draws.js to download draws
//props recived are pdf file,"open" for opening of dialouge,onclose for closing functionality,
//tounamentgroup is tournamenet name to be dispalyed,onclose for closing dilaouge,download prop based on the vlue recieved by the componets.
class Downloadpdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: this.props.id,
      tounamentName: this.tounamentgroup,
    };
  }

  render() {
    const {
      ViewPdf,
      open,
      view,
      download,
      onClose,
      tounamentgroup,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="body"
        maxWidth="md"
      >
        {view ? (
          <React.Fragment>
            <DialogTitle children="" id="alert-dialog-title"></DialogTitle>
            {download ? (
              <DialogContent>
                <DialogContentText id="alert-dialog-description" />
                <Typography>
                  Do you want to download {tounamentgroup} PDF?{" "}
                </Typography>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogContentText id="alert-dialog-description" />
                <Typography>
                  Do you want to download {tounamentgroup} Draws PDF?{" "}
                </Typography>
              </DialogContent>
            )}

            <DialogActions>
              {" "}
              <Button variant="contained" color="secondary" onClick={onClose}>
                Back
              </Button>
              <Button
                href={
                  download ? ViewPdf : `data:application/pdf;base64,${ViewPdf}`
                }
                download={`${tounamentgroup}` + ".pdf"}
              >
                Download
              </Button>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogTitle children="" id="alert-dialog-title">
              <Typography color="error">
                No Data found for {tounamentgroup}{" "}
              </Typography>
            </DialogTitle>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}

export default withStyles(newsStyle)(Downloadpdf);
