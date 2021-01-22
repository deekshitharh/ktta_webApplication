import React from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import Titlize from "../../commons/genricComponents/titlize";
import Container from "@material-ui/core/Container";
import { ApiCall } from "../../APIService";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../formdata";
import { commons } from "../../commons";
//player list component for navigation menu playerlist in player menu
class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerList: [],
      loading: false,
    };
  }

  //api call for player list
  componentDidMount() {
    var params = {};
    params.type = "assocPlayers";
    this.setState({ loading: true });
    ApiCall("POST", params, "coreApi")
      .then((res) => {
        if (!res["status"]) {
          console.log("api error" + res["status"]);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,

          playerList: res,
        });
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  }

  //function call for dob formating
  formatDate = (inputDate) => {
    inputDate = inputDate.substring(0, 10).split(/\D/g);
    inputDate = inputDate[2] + "-" + inputDate[1] + "-" + inputDate[0];
    return inputDate;
  };

  render() {
    const { classes } = this.props;
    const { playerList, loading } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={1} />

        <div className={classes.root}>
          <Container maxWidth="lg">
            <MaterialTable
              title=""
              columns={[
                {
                  field: "userName",
                  title: "Name",
                  defaultSort: "asc",
                  render: (rowData) => (
                    <Typography component="div">
                      <Titlize value={rowData.userName.trim()} />
                    </Typography>
                  ),
                },
                { field: "emailAddress", title: "Email" },
                {
                  field: "dateOfBirth",
                  title: "DOB",
                  render: (rowData) => this.formatDate(rowData.dateOfBirth),
                },
                { field: "gender", title: "Gender", defaultSort: "asc" },
                {
                  field: "academy",
                  title: "Academy",
                  render: (rowData) => <Titlize value={rowData.academy} />,
                },
                { field: "affiliationId", title: "Affiliation Id" },
              ]}
              data={playerList}
              icons={tableIcons}
              isLoading={loading}
              options={{
                sorting: true,
                filtering: true,
                rowStyle: {
                  textAlign: "left",
                },
              }}
              components={{
                Toolbar: (props) => (
                  <div>
                    <MTableToolbar {...props} />
                    <div className={classes.root}>
                      <Typography variant="h6" gutterBottom>
                        Players List
                      </Typography>
                    </div>
                  </div>
                ),
              }}
            />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default PlayerList;
