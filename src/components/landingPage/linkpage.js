import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import customStyles from "../../styles/genricStyle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link, withRouter } from "react-router-dom";
//view more page component for linking for registered clubs,association,top rankplyers news,officebearers detailing page 
class ViewMorePage extends Component {
  componentDidMount() {}

  render() {
    const { pathname, title, classes, index } = this.props;
    return (
      <Button
        component={Link}
        to={{
          pathname: pathname,
          asssocval: index ? 1 : null,
        }}
        endIcon={<ChevronRightIcon />}
        className={classes.viewmorelink}
      >
        {title}
      </Button>
    );
  }
}
export default withRouter(withStyles(customStyles)(ViewMorePage));
