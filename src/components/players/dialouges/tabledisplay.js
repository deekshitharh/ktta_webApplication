import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import BaseDialog from "./baseDialouge";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import customStyles from "../../../styles/genricStyle";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../formdata";
import { playerDetailscol } from "../../../formdata";
import CloseIcon from "@material-ui/icons/Close";

//dialouge compnoent for detiling view of player details used in player rank component
//props:data is playerarray,playename,"onclose" dialouge close.
class TableDialog extends Component {
  render() {
    const { data, playername, classes, loading, onClose } = this.props;

    return (
      <BaseDialog {...this.props}>
        <div>
          <MaterialTable
            title=""
            isLoading={loading}
            columns={playerDetailscol}
            data={data}
            icons={tableIcons}
            options={{
              headerStyle: {
                backgroundColor: "#f44336a6",
                color: "#FFF",
              },
              rowStyle: {
                color: "#000000",
              },
            }}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <Grid container direction="row" alignItems="center">
                    <Grid>
                      <Typography gutterBottom variant="h6">
                        {playername}
                      </Typography>
                    </Grid>

                    <Grid>
                      <IconButton
                        className={classes.tableicon}
                        onClick={onClose}
                      >
                        <CloseIcon className={classes.closeicon} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              ),
            }}
          />
        </div>
      </BaseDialog>
    );
  }
}
export default withRouter(withStyles(customStyles)(TableDialog));
