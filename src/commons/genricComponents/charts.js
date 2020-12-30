import Chartist from "chartist";
import Legend from "chartist-plugin-legend";

var delays2 = 80,
  durations2 = 500;

import { Link, withRouter, Router } from "react-router-dom";
import newsStyles from "../../styles/newsStyle";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Titlize from "../../commons/genricComponents/titlize";
import Container from "@material-ui/core/Container";
import Fontawsome from "../../commons/genricComponents/fontAwsomicon";
import { useEffect } from "react";

var delays2 = 80,
  durations2 = 500;

const playerStat = {
 
  data: {
    labels: ["MP", "FP", "T", "MM", "FM"],
    series: [1850, 1000, 1655, 1588, 1422],
  },
  
  options: {
    plugins: [
      Chartist.plugins.legend({
        legendNames: [
          "#Male Players",
          "#Female Players",
          "#Tournament",
          "#Male Matches",
          "#Female Matches",
        ],
        
      }),
    ],

        axisX: {
      showGrid: true,
      position: "end",
    },
    axisY: {
      showGrid: true,
      position: "end",
    },
   
    
       
        low:0,
      
    distributeSeries: true,
  },

  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};


const Graph = () => {
  useEffect(() => {
    const script = document.createElement("link");
    script.href = "//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css";
    script.rel = "stylesheet";
    script.type = "text/css";
    document.getElementsByClassName("ct-chart")[0].appendChild(script);

   new Chartist.Bar(
     ".ct-chart",
     playerStat.data,
     playerStat.options,
     playerStat.responsiveOptions,
     playerStat.animation
   );
  });
       return (
        
           <div className="ct-chart"/>
       
       );  
};

 class Statistics extends Component {
  render() {
    const { classes } = this.props;

    return (
    
        <Graph />
     
    );
  }
}
// const playerStat = {
//   data: {
//     labels: ["MP", "FP", "T", "MM", "FM"],
//     series: [1850, 1000, 1655, 1588, 1422],
//   },

//   options: {

//     plugins: [
//       Chartist.plugins.legend({
//         legendNames: ['#Male Players', '#Female Players', '#Tournament','#Male Matches','#Female Matches']
//       })
//     ],
//     axisX: {
//       showGrid: true,
//       position: "end",
//     },
//     axisY: {
//       showGrid: true,
//       position: "end",
//     },

//     low: 0,

//     chartPadding: {
//       right: 10,
//     },
//     distributeSeries: true,
//   },

//   responsiveOptions: [
//     [
//       "screen and (max-width: 640px)",
//       {
//         seriesBarDistance: 5,
//         axisX: {
//           labelInterpolationFnc: function (value) {
//             return value[0];
//           },
//         },
//       },
//     ],
//   ],
//   animation: {
//     draw: function (data) {
//       if (data.type === "bar") {
//         data.element.animate({
//           opacity: {
//             begin: (data.index + 1) * delays2,
//             dur: durations2,
//             from: 0,
//             to: 1,
//             easing: "ease",
//           },
//         });
//       }
//     },
//   },
// };

export default withRouter(withStyles(newsStyles)(Statistics));
//export default playerStat;
