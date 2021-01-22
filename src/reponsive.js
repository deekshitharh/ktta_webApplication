import { MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import AppRoutes from "./routes";
import Theme from "./styles/customTheme.js";
import { Desktop, Tablet, Mobile } from "./views";


import React, { useEffect } from "react";
//responsive  functionlity for displaying the views based on  Desktop, Tablet, Mobile,with props as theme
//based on theme setting the application will take theme settings style.
const Responsive = (props) => {
  const [themeState, setThemeState] = React.useState("dark");
 
  //initial theme setting on application load.
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
