import React from 'react';
import BaseDialog from "../../players/dialouges/baseDialouge"
import Login from '../login';
import { withStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import newsStyles from "../../../styles/newsStyle"
import { Link, withRouter, Router } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { sessioncommons} from "../../../commons"
class Logout extends React.Component {
    constructor(props) {
        super(props)
        // localStorage.clear();
        // this.props.history.push('/login');
        this.state = {
            open: true,

       
        };
    }

    handlelogout = () => {
        
      
        sessioncommons.removeUserSession();
        this.props.history.push('/tornamentlist');
    }

    handleClose = () => {
        this.setState({
            open: false

        });
    };

  

    render()    {
        const { classes  } = this.props;
        const {  open, } = this.state;
        return (
            <BaseDialog
                open={open}
                onClose={this.handleClose}
                value={this.handlelogout}
            >
             
                   
                <Typography 
                    variant="subtitle2"
                    style={{
                        verticalAlign: 'middle',
                        display: 'inline-flex'}}
                
                
                >Do you really wish to Logout?</Typography>
                <span> <SentimentVeryDissatisfiedIcon style={{fontSize: 20 }} /></span>  
     
                     
     
            </BaseDialog>
        );
    }
}


export default withRouter(withStyles(newsStyles)(Logout));