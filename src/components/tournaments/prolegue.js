import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import switchbox from "../../formdata/switchvalues";
import { sessioncommons } from "../../commons"
import { clients } from "../../config/clientConfig"
import RefreshLoader from "../../commons/genricComponents/pageloader"
class LeagueInfo extends React.Component {
  // const[alignment, setAlignment] = React.useState('left');

  constructor(props) {
    super(props);

    this.state = {
      value: "ranking",
    
    };
  }


  // parentupdate = (value) => {
  //   handleChildUpdate(value)
  // }


  componentDidMount() {
    sessioncommons.setLocalStorage("api_key", clients["ranking"]);
  }

  onChange = (event, value) => {

    sessioncommons.setLocalStorage("api_key", clients[value]);
    this.props.loadtdata()
    
    
      this.setState({ value: value },
        () => {
          this.props.handleChildUpdate(value);
      }
      );
    
     
    

     
  };

  render() {
    const { classes ,loading} = this.props;
    const { value } = this.state;
   
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container align="center">
          <ToggleButtonGroup
            style={{ margin: 10 }}
            value={value}
            exclusive
            selected
            onChange={this.onChange}
            aria-label="text alignment"
          >
            <ToggleButton disabled={value==="ranking"}
              value="ranking" aria-label="centered">
              Ranking
            </ToggleButton>
            <ToggleButton
              disabled={value === "league"}
              value="league" aria-label="centered">
              League
            </ToggleButton>
          </ToggleButtonGroup>
        
        </Grid>
      </React.Fragment>
    );
  }
}
export default (LeagueInfo);
