import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Routes from "./routes";
import Responsive from "./reponsive";
import { clients } from "./config/clientConfig";



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
