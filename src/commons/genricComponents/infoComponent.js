import Typography from "@material-ui/core/Typography";
import React from "react";

//genric api message display component
//props for typography varient, and relevant api message as typogaphy children
// used in register.js, forgotpassword.js,fogotpassword.js,registerPlayer.js,registerSteps.js,userProfile.js,
// legal.js,detailednews.js,tournment.js,officebeareres.js, for displaying the api related if recieved data is empty 
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
