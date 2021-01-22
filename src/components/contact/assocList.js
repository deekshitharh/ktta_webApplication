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
//gridlist component to display the district association data which is used in map.js component
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
            
            
            <GridList cellHeight="auto"  className={classes.gridList} cols={1} >
                {DaData.map((tile) => {
                  return (
                      <GridListTile >
                        <Grid container align="strech">
                            <Grid item className={classes.flexView}>
                                  <Card className={classes.assocCard} variant="outlined">
                                      <CardContent >
                                          <Grid item  md={12} className={classes.asscocgrid}>
                                              <Link
className={classes.assocLink}
                                               
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
                                                  <Divider className={classes.assocdiv}/>

                                              </Link>

                                          </Grid>
                                                         
                                          <Grid md={12} className={classes.asscocgrid}>
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
