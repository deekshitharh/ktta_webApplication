import LinearProgress from "@material-ui/core/LinearProgress";

import CircularProgress from "@material-ui/core/CircularProgress";

import React from "react";

import customStyles from "../../styles/genricStyle";

import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
//page loader component
class RefreshLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
    };
  }

  componentDidMount = () => {
    this.timer = setTimeout(() => this.progress(5), 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  showloader = (display, classes, loading) => {
    if (display === "overlay" && loading) {
      return (
        <div className={classes.overlayloader}>
          <div className={classes.overlaycircular}>
            {" "}
            <CircularProgress />
          </div>
        </div>
      );
    } else if (display === "normal" && loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
  };
 showlinear = (type, classes, loading) => {
    if (type === "linear" && loading) {
      return (
        <div>
          <div>
            <LinearProgress
              variant="determinate"
              value={this.state.completed}
            />
          </div>
        </div>
      );
    } else {
      return false;
    }
  };

  render() {
    const { loading, type, classes, display } = this.props;

    //props: loding,type of loader and  display type of loader
    return (
      <React.Fragment>
        <CssBaseline />
        {display && loading ? (
          <div>{this.showloader(display, classes, loading)}</div>
        ) : (
          <div>{this.showlinear(type, classes, loading)}</div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(customStyles)(RefreshLoader);
