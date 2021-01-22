import Typography from "@material-ui/core/Typography";
import React from "react";

//genric api message display component
//props for typography varient,and relevant api message
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
