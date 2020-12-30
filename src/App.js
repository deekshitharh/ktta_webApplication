import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Routes from "./routes";
import { blue, indigo } from "@material-ui/core/colors";
import Responsive from "./reponsive";
import { clients } from "./config/clientConfig";
import { sessioncommons } from "./commons";

import clientConfig from "./config/clientConfig.js";
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900],
    },
    primary: {
      main: indigo[700],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    useNextVariants: true,
    fontFamily: ['"Lato"', "sans-serif"].join(","),
  },
});

class App extends Component {
  componentDidMount = () => {
    if (!localStorage.getItem("api_key")) {
      localStorage.setItem("api_key", clients["ranking"]);
    }
  };

 

  render() {
    return (
      <div>
        <Responsive>
          <MuiThemeProvider>
            <Routes />
          </MuiThemeProvider>
        </Responsive>
      </div>
    );
  }
}

export default App;
