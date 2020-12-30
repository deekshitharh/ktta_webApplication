import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { commons } from "../../commons";
import { registred_association} from '../../formdata';
import Paper from '@material-ui/core/Paper';
import newsStyles from '../../styles/newsStyle'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import Titlize from "../../commons/genricComponents/titlize";
import { withRouter } from "react-router-dom";
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import { ApiCall } from "../../APIService";
import Fontawsome from "../../commons/genricComponents/fontAwsomicon"

 class SingleLineGridList extends Component {
     constructor(props) {
         super(props);
         this.state = {
            DaData:[]
         };
     }

     loadDaData = () => {
         let apiData = {};
         apiData.tableName = "contact";
        // apiData.client_key = localStorage.getItem("api_key")
         apiData.type = "getData";

         ApiCall("POST", apiData, "getData")
             .then((res) => res.json())
             .then((res) => {
                 this.setState({
                     DaData: res["getData"],
                    
                 });
             })
             .catch((error) => {
                 commons.errorLog(error)
             });
     };
     componentDidMount = () => {
         this.loadDaData();
     };
     
     
    render() {
        const { classes,  } = this.props;
        const { DaData } = this.state
        const style = { width: "1.1em", color: "black" }
        return (
            <div className={classes.gridroot}>
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

                                                          <Titlize value={tile.locationName} />

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
                                                  
                                                {tile.contactMobile}

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
export default withStyles(newsStyles)(SingleLineGridList);
