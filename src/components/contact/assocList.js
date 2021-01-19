import React, { Component } from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import { commons } from "../../commons";

import customStyles from "../../styles/genricStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Titlize from "../../commons/genricComponents/titlize";

import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

import { ApiCall } from "../../APIService";
import Fontawsome from "../../commons/genricComponents/fontAwsomicon";
import InfoComponent from "../../commons/genricComponents/infoComponent";
class SingleLineGridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DaData: [],
      message:""
    };
  }
  //api call district association
  loadDaData = () => {
    let apiData = {};

    apiData.client_key = "APTTA";
    apiData.type = "getDAListForGivenAssoc";

    ApiCall("POST",  apiData, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          this.setState({
            DaData: res["data"],
          });
        } else if (res.status == "failure") {
          this.setState({
            message: res.message
          });
        }
      })

      .catch((error) => {
        commons.errorLog(error);
      });
  };
  componentDidMount = () => {
    this.loadDaData();
  };

  render() {
    const { classes,  } = this.props;
    const { DaData,message } = this.state
    const style = { width: "1.1em", color: "black" }
    return (
        <div className={classes.gridroot}>
               {/* {!DaData.length &&  
                <Grid container align="strech">
   <InfoComponent variant="h4" message={message}/>

                </Grid>} */}
            
            <GridList cellHeight="auto"  className={classes.gridList} cols={1} >
                {DaData.map((tile) => {
                  return (
                      <GridListTile >
                        <Grid container align="strech">
                            <Grid item style={{ display: 'flex' }}>
                                  <Card style={{ height: "100%",display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} variant="outlined">
                                      <CardContent >
                                          <Grid item  md={12} style={{ padding: 5}}>
                                              <Link

                                                  style={{ cursor: "pointer" }}
                                                  onClick={() => this.props.handleMapshow(tile)}
                                              >
                                                  <Typography  gutterBottom>
                                                      <Fontawsome
                                                          name="route"
                                                          size="lg"

                                                          style={style}
                                                      />

                                                      <Titlize value={tile.associationName} />

                                                  </Typography>
                                                  <Divider style={{ margin: 4 }} />

                                              </Link>

                                          </Grid>
                                                         
                                          <Grid md={12} style={{ padding: 5 }}>
                                              <Typography gutterBottom >
                                                  <Fontawsome
                                                      name="contact"
                                                      size="lg"

                                                      style={style}
                                                  />
                                                  <Titlize value={tile.contactPerson} />

                                              </Typography>
                                          </Grid>
                                          <Grid>
                                              <Typography gutterBottom>
                                              <Fontawsome
                                                  name="phone"
                                                  size="lg"

                                                      style={style}
                                              />
                                              
                                            {tile.phoneNumber}

                                          </Typography>
                                          </Grid>
                                        
                            </CardContent>
                           
                        </Card>
                        </Grid>
                        </Grid>
                      </GridListTile>
                    );
                })}
            </GridList>
         
        </div>
    );
}
}
export default withStyles(customStyles)(SingleLineGridList);
