import React from "react";
import { withRouter } from "react-router-dom";
import Downloadpdf from "../../../tournaments/ViewsDraws/drawsDialouge";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
//import Titleize from 'react-titleize';
import customStyles from "../../../../styles/genricStyle";

class viewProspectus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
            tournamentId: this.props.match.params.id,
            open: false,
         
            value: "Prospectus",
            ViewPdf: "",
            validPdf: false,
        };
    }

    componentDidMount() { 

   
        this.setState({open: false });
        let data= "http://karnatakatt.com/pdf/fp-prospectus.pdf"
        const { tournamentId } = this.state;
       
                this.setState({
                    loading: false,
                    ViewPdf: data,
                    open: true,
                    validPdf: true,
                });
            
            
    };

    validatepdf = (pdf) => {
        const base64Rejex = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/;
        const check = base64Rejex.test(pdf); // base64Data is the base64 string
        return check;
    };

    handleClose = () => {
        this.setState({
          
            open: false,
        });
    };

    render() {
        const { classes } = this.props;
        const {
          
            value,
            open,
            validPdf,
            ViewPdf,
           
        } = this.state;

       

        return (
            <React.Fragment>
                <CssBaseline />

                <div className={classes.root}>
                   

                    <Downloadpdf
                        open={open}
                        view={validPdf}
                        ViewPdf={ViewPdf}
                        tounamentgroup={value}
                        onClose={this.handleClose}
                        test={true}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(customStyles)(viewProspectus));
