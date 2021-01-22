import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customStyles from "../../styles/genricStyle";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import Titlize from "../../commons/genricComponents/titlize";
import Container from "@material-ui/core/Container";
import { ApiCall } from "../../APIService";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../formdata";
import ResponsiveListDailouge from "./responsiveListDilouge";
import Link from "@material-ui/core/Link";

import { commons } from "../../commons";

//mobile view component for PlayerList used in playerlistView.js

class ResponsivePlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerList: [],
      loading: false,
      open: false,
      playerName: "",
    };
  }

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

  openDialog = (name) => {
    this.setState({
      playerName: name,
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { playerList, open, loading, playerName } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={1} />

        <div>
          <Container maxWidth="sm">
            <MaterialTable
              title=""
              columns={[
                {
                  field: "userName",
                  title: "Name",

                  render: (rowData) => (
                    <Typography component="div">
                      <Link
                        className={classes.assocLink}
                        onClick={() => this.openDialog(rowData.userName)}
                      >
                        <Titlize value={rowData.userName.trim()} />
                      </Link>
                    </Typography>
                  ),
                },

                {
                  field: "academy",
                  title: "Academy",
                  render: (rowData) => (
                    <Typography component="div">
                      <Titlize value={rowData.academy.trim()} />
                    </Typography>
                  ),
                },
              ]}
              data={playerList}
              // data={playerval}
              icons={tableIcons}
              isLoading={loading}
              options={{
                filtering: true,
                rowStyle: {
                  textAlign: "left",
                },
              }}
              components={{
                Toolbar: (props) => (
                  <div>
                    <MTableToolbar {...props} />
                    <div className={classes.logoutTextfont}>
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

        <ResponsiveListDailouge
          open={open}
          playerdata={playerList}
          playername={playerName}
          onClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}
export default withStyles(customStyles)(ResponsivePlayerList);
