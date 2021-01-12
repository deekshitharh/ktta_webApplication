import Typography from "@material-ui/core/Typography";
import React from "react";
import { registred_association } from "../../formdata";
import {  withRouter } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";



import withStyles from "@material-ui/core/styles/withStyles";
import customStyles from "../../styles/genricStyle";


import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { commons } from "../../commons";


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
   
//abbravation for registred_association
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
export default withRouter(withStyles(customStyles)(RegisteredAssoc));
