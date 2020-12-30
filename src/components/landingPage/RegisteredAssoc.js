import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { registred_association } from "../../formdata";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from '@material-ui/core/Avatar';

import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import newsStyles from "../../styles/newsStyle";

import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Titlize from "../../commons/genricComponents/titlize";
import CssBaseline from "@material-ui/core/CssBaseline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { commons } from "../../commons";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ViewMorePage from "./linkpage"

import Divider from "@material-ui/core/Divider";
import { uiCommons } from "../../commons";
const gridColumns = 3;
const gridRows = 2;

 class RegisteredAssoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // officeData: []
    };
   }
   

   abrrevatedData = (val) => {
     const data = val.substring(0, 4)
     return data.toUpperCase()
   }

  render() {
    const { classes } = this.props;
    var assocData = commons.genricGrid(registred_association, gridRows, gridColumns)
   
    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* <Grid container justify="center"> */}

          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="h6" style={{ flex: 1 }}>
              {" "}
              Registered Associations
            </Typography>
            <ViewMorePage pathname="/registreredclubs_Assoc" title="MORE" index={true}/>
          </div>
          <Divider />

          <Grid container align="center" >
         
            {assocData.map((assocRow, clubIndex) => {
              
              let assoc = commons.shuffleArray(assocRow.colums);
              let sorted = commons.sortArray(assoc, "assoc");
            
              return (<Grid container
              key={clubIndex}
               
                alignItems="stretch">
                {sorted.map((assocval, newsIndex) => {
                  let gridColumnData = uiCommons.getGrid(gridColumns);
                  return (
                    <Grid
                      item
                      md={gridColumnData.md}
                      xs={gridColumnData.xs}
                      key={newsIndex}
                      style={{}}
                    >
                      <Card className={classes.basicard}>
                        <CardHeader
                          className={classes.basicheader}
                          title={assocval.abbrevationAssociation ? (assocval.abbrevationAssociation).toUpperCase() : this.abrrevatedData(assocval.associationName) }
                        />
                      </Card>
                    </Grid>
                  );

                })}

              </Grid>)
            })}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(newsStyles)(RegisteredAssoc));
