import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";

import Hidden from "@material-ui/core/Hidden";
import newsStyles from "../../styles/newsStyle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
class Mobileview extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //     menulist: aboutMenu
    // };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes, menulist } = this.props;
    // const { menulist } = this.state;

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

export default withRouter(withStyles(newsStyles)(Mobileview));
