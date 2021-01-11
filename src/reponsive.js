import { MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import AppRoutes from "./routes";

import Theme from "./styles/customTheme.js";
import { Desktop, Tablet, Mobile } from "./views";

// import { sessioncommons } from "./commons"
// import {clients} from "./config/clientConfig"
import React, { useEffect } from "react";

const Responsive = (props) => {
  const [themeState, setThemeState] = React.useState("dark");
 
  
  useEffect(() => {
    localStorage.setItem("theme", "dark");
    setThemeState("dark");
  }, []);

  const handlechange = (themeColor) => {
    setThemeState(themeColor);

    
  };

 

  return (
    <div>
      <Desktop>
        <MuiThemeProvider theme={Theme(themeState)}>
          <AppRoutes type="Desktop" handlechange={handlechange} />
        </MuiThemeProvider>
      </Desktop>
      <Tablet>
        <MuiThemeProvider theme={Theme(themeState)}>
          <AppRoutes />
        </MuiThemeProvider>
      </Tablet>

      <Mobile>
        <MuiThemeProvider theme={Theme(themeState)}>
          <AppRoutes />
        </MuiThemeProvider>
      </Mobile>
    </div>
  );
};

export default Responsive;
