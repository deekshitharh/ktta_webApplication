import React from "react";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import customStyles from "../../styles/genricStyle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import { sessioncommons } from "../../commons";
import { clients } from "../../config/clientConfig";
class LeagueInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "ranking",
    };
  }

  componentDidMount() {
    sessioncommons.setApiKey("api_key", clients["ranking"]);
  }

  //change handler for togglebutton
  onChange = (event, value) => {
    sessioncommons.setApiKey("api_key", clients[value]);
    this.props.loadtdata();

    this.setState({ value: value }, () => {
      this.props.handleChildUpdate(value);
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container align="center">
          <ToggleButtonGroup
            className={classes.textclass}
            value={value}
            exclusive
            selected
            onChange={this.onChange}
            aria-label="text alignment"
          >
            <ToggleButton
              disabled={value === "ranking"}
              value="ranking"
              aria-label="centered"
            >
              Ranking
            </ToggleButton>
            <ToggleButton
              disabled={value === "league"}
              value="league"
              aria-label="centered"
            >
              League
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(customStyles)(LeagueInfo));
