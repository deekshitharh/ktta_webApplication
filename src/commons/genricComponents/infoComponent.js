

import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";







function InfoComponent(props) {

    return (
      <Typography variant={props.variant} style={{ marginLeft: "5px", textAlign:"center" }}>
        {props.message}
      </Typography>
    );
}


export default InfoComponent