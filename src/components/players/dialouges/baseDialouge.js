import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import newsStyle from '../../../styles/genricStyle'

import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";





//geniric dilouge component
class BaseDialog extends Component {


  

    componentDidMount() { }

 



    render() {

        const {  open, fullscreen,value , onClose} = this.props;
        return (
            <Dialog
               // fullscreen={fullscreen ? true: false}
                    open={open}
                    onClose={onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                     scroll='body'
                      maxWidth="md"
                >

             

                    <DialogTitle children="" id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" />

                    {this.props.children}

                       

                </DialogContent>
                {value ?
                    <DialogActions>
                        {" "}
                        <Button

                            onClick={value}
                        >
                            Yes
                                     </Button>
                        <Button

                            onClick={onClose}
                        >
                            No
                                     </Button>
                    </DialogActions>
                    :

                    <DialogActions>
                        {" "}
                        <Button

                            onClick={onClose}
                        >
                            Close
                                     </Button>

                    </DialogActions>

                }
                </Dialog>
                  
    )

       
    }
}

export default withStyles(newsStyle)(BaseDialog);


 