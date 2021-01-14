import React from "react";

import {  withRouter } from "react-router-dom";
import { ApiCall } from "../../../APIService";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import customStyles from "../../../styles/genricStyle";

import MaterialTable, { MTableToolbar } from "material-table";
import Titlize from "../../../commons/genricComponents/titlize";
import { selectButtons, tableIcons } from "../../../formdata";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { commons } from "../../../commons";

//compoent for viewing entries for each event category
class Viewentries extends React.Component {
  // const[alignment, setAlignment] = React.useState('left');

  constructor(props) {
    super(props);

    this.state = {
      //    tournamentId: this.props.location.myCustomProps,
      tournamentId: this.props.match.params.id,
      tableIcons: tableIcons,
      buttonArr: selectButtons,
      value: "Cadet Girl's Singles",
      ViewEntries: [],
      Contacts: [],
      loading: false,
    };
  }
//api call for the entries made in each category
  componentDidMount() {
    const { tournamentId, value } = this.state;
    var params = {};
    params.type = "viewEntries";
    params.tournamentId = tournamentId;
    params.eventId = value;

    

    //params.client_key = "ktta";
    this.setState({ loading: true });
    ApiCall("POST", params, "coreApi")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          ViewEntries: data,
        });
      })
      .catch((error) => {
        commons.errorLog(error)
      });
  }

  onChange = (event, value) => {
    const { tournamentId } = this.state;

    var params = {};
    params.tournamentId = tournamentId;
    params.eventId = value;
    params.caller = "caller";
    params.apiKey = "apikey";
    params.type = "viewEntries";
 

   
    this.setState({ value: value, loading: true });

    ApiCall("POST", params, "coreApi")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ViewEntries: data,
          loading: false
        });
      })
      .catch((error) => {
        commons.errorLog(error)
      });
  };

  render() {
    const { classes } = this.props;
    const {
      buttonArr,
      value,
      loading,
      ViewEntries,
     
      tableIcons,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
       
            <Grid container justify="center">
              <Paper>
                {buttonArr.map((item, index) => {
                  return (
                    <ToggleButtonGroup
                      style={{ margin: 5 }}
                      value={value}
                      exclusive
                      key={index}
                      onChange={this.onChange}
                      aria-label="text alignment"
                    >
                      <ToggleButton
                        classes={{
                          root: classes.buttonstyle, // class name, e.g. `root-x`

                          selected: classes.selected, // class name, e.g. `disabled-x`
                        }}
                        value={item.value}
                        aria-label="centered"
                      >
                        {item.name}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                })}

                <MaterialTable
                  title=""
                  columns={[
                    {
                      field: "playerName",
                      title: "Name",
                      filtering: false,

                      render: (rowData) => (
                        <Typography>
                          <Titlize value={rowData.playerName.trim()} />
                        </Typography>
                      ),
                    },
                    { field: "Academy", title: "Club", filtering: false },
                  ]}
                  isLoading={loading}
                  data={ViewEntries}
                  icons={tableIcons}
                  options={{
                    rowStyle: {
                      textAlign: "left",
                    },
                    filtering: true,
                    // headerStyle: {
                    //   backgroundColor: "#f44336a6",
                    //   color: "#FFF",
                    // },
                    // rowStyle: {
                    //   color: "#000000",
                    // },
                  }}
                  components={{
                    Toolbar: (props) => (
                      <div>
                        <MTableToolbar {...props} />
                        <div style={{ padding: "0px 10px", textAlign: "left" }}>
                          <Typography variant="h6" gutterBottom>
                            Player Entries
                          </Typography>
                        </div>
                      </div>
                    ),
                  }}
                />
              </Paper>
            </Grid>
      
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(customStyles)(Viewentries));
