import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { standingData } from "../../formdata"
import ViewMorePage from "./linkpage"
import Titlize from "../../commons/genricComponents/titlize";

import Fontawsome from "../../commons/genricComponents/fontAwsomicon"
export default class StandingContent extends Component {
    render() {
        const { classes } = this.props;
      

        return (
          <div className={classes.root}>
            <Paper elevation={3}>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" component="h6" style={{ flex: 1 }}>
                  Top Rank Players
                </Typography>
                <ViewMorePage pathname="/player_ranking" title="VIEW ALL" />
              </div>
              <Divider />
              <TableContainer component={Paper}>
                <Table
                //  style={{flex:1}}
                //  className={classes.table}
                
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "30%" }}>Event </TableCell>
                      <TableCell 
                       style={{ width: "40%" }}
                        align="left">
                        Boys{" "}
                        <Fontawsome
                          name="male"
                          size="2x"
                          style={{ width: "0.9em" }}
                        />
                       
                      </TableCell>
                      <TableCell
                       style={{ width: "40%" }}
                         align="left">
                        Girls{" "}
                        <Fontawsome
                          name="female"
                          size="2x"
                          style={{ width: "0.9em" }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    {standingData.map((row, index) => (
                  
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.category}
                        </TableCell>
                        <TableCell align="left">   <Titlize value={row.mEvent.player} />
                        
                        </TableCell>
                        <TableCell  align="left">
                          <Titlize value={row.fEvent.player} />
                       
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        );
    }
}



