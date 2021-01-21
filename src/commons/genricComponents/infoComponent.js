import Typography from "@material-ui/core/Typography";
import React from "react";
import customStyles from "../../styles/genricStyle";

//genric api message display component
// props:varient,and relevant api message
function InfoComponent(props) {
  return (
    <Typography
      variant={props.variant}
      style={{ marginLeft: "5px", textAlign: "center" }}
    >
      {props.message}
    </Typography>
  );
}

export default InfoComponent;
