import React from "react";

import Container from '@material-ui/core/Container';
import customStyles from "../../../../styles/genricStyle";
import Divider from '@material-ui/core/Divider';
import Titlize from "../../../../commons/genricComponents/titlize";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { commons } from "../../../../commons";
import Fontawsome from "../../../../commons/genricComponents/fontAwsomicon"
import { uiCommons } from "../../../../commons";

//import { drawresults, mresults, } from "../../../../formdata"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import { sessioncommons } from "../../../../commons"
const gridColumns = 3;


class showdraws extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      value: "round1",
      drawinfo: this.props.match.params.id,
      //drawdata: mresults,
      rowdata: sessioncommons.getdrawData().roundDetails,
      rowmatchdata: sessioncommons.getdrawData().roundMatchDetails,
      drawmatchRecords: sessioncommons.getdrawData().matchRecords,
      matchresults: [],
      datainitil: []
    }

  }

  getDots = (x) => {
    let icon = <Fontawsome
      name="circle"
      size="2x"
      style={{ width: "0.3em", padding: "1px" }} />
    return Array(x).fill(icon)


  }
  getg = (val) => {

    return Array(val).fill("-")

  }

  groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {});

  };

 

  showdatval = (xs, key) => {
    return xs.reduce((rv, x) => {
      rv["round" + x.col] = this.getDots(x.dots);
      rv.row = x.row;
      rv.matchNo = x.matchNo
      rv.round = x.round
      return rv;
    }, {});
  };



 






  componentDidMount() {

    let update = [...this.state.drawmatchRecords]


    const clubData = commons.gridData(this.state.rowdata)
    this.setState({
      datainitil: clubData
    })

    update.forEach(el => {

      Object.keys(el.players).forEach((key) => {
        const val = el.players[key];
        if (val === "()") {
          el.players[key] = ""
        }
      });



    })

    // this.state.drawmatchRecords.forEach(el => {
    //     Object.keys(el.scores).forEach(key=> {
    //         const val = el.scores[key];
    //        val.forEach(x =>{
    //            if (x === "0")

    //            {
    //                val[x]="-"
    //               }

    //         })
    //         (this.state.drawmatchRecords)
    //         })

    //  })



    const containsAll = (a1, a2) => {
      return a1.every(arr2Item => a2.includes(arr2Item))
    }


    update.map(el => {
      let a1 = el.scores.setScoresA
      let a2 = el.scores.setScoresB
      let y = containsAll(a1, a2)
      if (y) {
        Object.keys(el.scores).map((key) => {
          el.scores[key] = this.getg(el.scores[key].length)

        });
      }


    })





    this.setState({
      drawmatchRecords: update
    })

  }


  handleClick = (r,index) => {
   
  
    let allResult = [];
    let filterdata = [];
    for (let index = r.roundNumber; index < r.roundNumber + 3; index++) {
      let result = this.state.drawmatchRecords.filter(
        (word) => word.roundNumber === index
      );
      let xresult = this.state.rowdata.filter(
        (x) => x.roundNumber === index
      );
      allResult = [...allResult, ...result];
      filterdata = [...filterdata, ...xresult];
    }



 

this.setState({
      matchresults: allResult,
      datainitil: filterdata,
  selected:index
    });
  }

  showdata = (outerElement) => {

    let result = this.state.drawmatchRecords.filter(word => word.roundNumber === outerElement.roundNumber);
    return result
  }


  showinner = (winner, players) => {

    if (winner.length) {
      var found = Object.values(players).find((key) => {
        return key === winner;
      });
    }
    return found
  }


  // handleClick=(x)=>{
  //     alert(JSON.stringify(x))
  // }


  render() {
    const { classes,  } = this.props;
    let gridColumnData = uiCommons.getGrid(gridColumns);
    const {  drawinfo, datainitil, rowdata,  selected, rowmatchdata} = this.state;
    const personGroupedByColor = this.groupBy(rowmatchdata, 'row');
    const ELEMENT_DATA = Object.values(personGroupedByColor).map(rowItem => {
      return this.showdatval(rowItem, "row");
    });

  
    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <AppBar style={{ backgroundColor:"#e50606e3"}} position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                {drawinfo}
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Table
             
              style={{ flex: 1 }}
              size="small"
              aria-label="a dense table"
           
            >
             
              <TableHead  >
                <TableRow >
                  {rowdata.map((outerElement,index) => {

                    return (
                    
                        <TableCell
                          align="center"
                          style={{cursor:"pointer"}}
                          onClick={() => this.handleClick(outerElement, index)}
                      >
                        <Box borderColor={selected === index ? "#1f4287" : ""}  border={selected === index ? 2 : ""}>{outerElement.roundName}</Box>
                       
                        </TableCell>
                      
                     
                     
                    );
                  })}
                    </TableRow>
                  </TableHead>
               
              <TableBody>
                {ELEMENT_DATA.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      classes={{ root: classes.drawtable }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.round1}
                    </TableCell>
                    <TableCell
                      classes={{ root: classes.drawtable }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.round2}
                    </TableCell>

                    <TableCell
                      classes={{ root: classes.drawtable }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.round3}
                    </TableCell>
                    <TableCell
                      classes={{ root: classes.drawtable }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.round4}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>

          <Grid container   align="center">
            {datainitil.map((outerElement) => {
              let displayDraws = this.showdata(outerElement);

              return (
                <Grid
                  item
                  sm={12}
                  md={gridColumnData.md}
                  xs={12}
                >
                  <Grid container >
                    <Grid item md={12} sm={8} xs={8}>
                      <Typography>
                        <span style={{ borderBottom: "3px solid #32407b" }}>
                          {outerElement.roundName}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.drawsContainer}>
                    <Grid
                      item
                      md={12}
                      sm={8}
                      xs={8}
                      className={classes.drawsChildren}
                    >
                      {displayDraws.map((x) => {
                        let showWinner = this.showinner(
                          x.winner,
                          x.players
                        );

                        return (
                          <Paper
                            style={{
                              padding: 20,
                              margin: 10,
                            }}
                          >
                            <Grid container >
                              <Grid container ></Grid>
                              <Grid xs={1} sm={1} md={1}>{x.matchNumber}</Grid>
                              
                                {showWinner === x.players.playerA ? (
                                  <React.Fragment>
                                    <Grid
                                      className={classes.winner}
                                      xs={1} sm={1} md={1}
                                    >
                                      <Fontawsome
                                        name="winner"
                                        size="md"
                                        style={{
                                          width: "2em",
                                          color: "#00000",
                                        }}
                                      />
                                  </Grid>
                                  
                                    <Grid xs={3} sm={3} md={4} style={{
                                      whiteSpace: "nowrap",

                                      overflow: "hidden",
                                      textOverflow: "ellipsis",

                                    }}>
                                      
                                        <Titlize value={showWinner} />
                                      
                                    </Grid>



                                  </React.Fragment>
                                ) : (
                                    <Grid xs={3} sm={3} md={4} style={{
                                      whiteSpace: "nowrap",

                                      overflow: "hidden",
                                      textOverflow: "ellipsis",

                                    }}>
                                     
                                        <Titlize value={x.players.playerA} />
                                      

                                    </Grid>
                                  )}
                              
                            
                                 
                                
                            

                              <Grid xs={7} sm={7} md={6} >
                                <Grid container>
                                  {x.scores.setScoresA.map((scoreA, i) => {
                                    const eq =
                                      parseInt(scoreA) >
                                      parseInt(x.scores.setScoresB[i]);

                                    return (
                                      <Grid
                                        className={
                                          eq
                                            ? classes.highlightscore
                                            : classes.spacing
                                        }
                                        xs={1} sm={1}   md={1}
                                      >
                                        {scoreA}
                                      </Grid>
                                    );
                                  })}
                                </Grid>
                              </Grid>
                            </Grid>

                            
                            <Divider />
                            <Grid container >

                              <Grid xs={1} sm={1} md={1}></Grid>
                              {showWinner === x.players.playerB ? (
                                <React.Fragment>
                                  <Grid
                                    className={classes.winner}
                                    xs={1} sm={1} md={1}
                                  >
                                    <Fontawsome
                                      name="winner"
                                      size="md"
                                      style={{
                                        width: "2em",
                                        color: "#00000",
                                      }}
                                    />
                                  </Grid>
                                  <Grid xs={3} sm={3} md={4} style={{
                                    whiteSpace: "nowrap",

                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  
                                  }}>
                                   
                                      <Titlize value={showWinner} />
                                   
                                  </Grid>



                                </React.Fragment>
                              ) : (
                                  <Grid xs={3} sm={3} md={4} style={{
                                    whiteSpace: "nowrap",

                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                
                                  }}>
                                   
                                      <Titlize value={x.players.playerB} />


                                  </Grid>
                                )}



                              <Grid xs={7} sm={7} md={6} >
                                <Grid container>
                                  {x.scores.setScoresB.map((scoreB, i) => {
                                    const eq =
                                      parseInt(scoreB) >
                                      parseInt(x.scores.setScoresA[i]);

                                    return (
                                      <Grid
                                        className={
                                          eq
                                            ? classes.highlightscore
                                            : classes.spacing
                                        }
                                        xs={1} sm={1} md={1}
                                      >
                                        {scoreB}
                                      </Grid>
                                    );
                                  })}
                                </Grid>
                              </Grid>
                            </Grid>

                          </Paper>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </React.Fragment>
    );
  }

}
export default withStyles(customStyles)(showdraws);