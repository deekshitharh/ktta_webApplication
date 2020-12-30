import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from "@material-ui/core/styles";

import { Link, withRouter } from "react-router-dom";
import newsStyles from "../../styles/newsStyle";
class SnackPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "open": true
        }
    }
    handleClose = (event, reason) => {
      
        this.setState({ "open": false })
    };

    render() {
        const { message, classes ,type } = this.props;
        return (
     <Snackbar
        
           
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
        >
            <SnackbarContent
                className={(type === "success") ? classes.successbar : classes.errorbar}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar">
                        {message}
                    </span>
                }

            />
        </Snackbar>
        )
    }

}

export default withRouter(withStyles(newsStyles)(SnackPopup));


