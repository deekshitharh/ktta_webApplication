import React from "react";
import BaseDialog from "../../players/dialouges/baseDialouge";
import { withStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import customStyles from "../../../styles/genricStyle";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { sessioncommons } from "../../../commons";
//logout component used in dashboard.js
class Logout extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      open: true,
    };
  }
//remove logged in session details in dashboard component
  handlelogout = () => {
    sessioncommons.removeUserSession();
    this.props.history.push("/tornamentlist");
  };
// handle onclose 
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <BaseDialog
        open={open}
        onClose={this.handleClose}
        value={this.handlelogout}
      >
        <Typography variant="subtitle2" className={classes.logoutText}>
          Do you really wish to Logout?
        </Typography>
        <span>
          {" "}
          <SentimentVeryDissatisfiedIcon className={classes.logoutTextfont} />
        </span>
      </BaseDialog>
    );
  }
}

export default withRouter(withStyles(customStyles)(Logout));
