import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {  withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import customStyles from "../../styles/genricStyle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
class Mobileview extends Component {


  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {  menulist } = this.props;
    

    return (
  
        <Container maxWidth="sm">
          {menulist.map((item, index) => {
            return (
              
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    {" "}
                    <item.component/>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </Container>
     
    );
  }
}

export default withRouter(withStyles(customStyles)(Mobileview));
