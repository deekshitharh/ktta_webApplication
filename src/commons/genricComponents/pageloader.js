import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';

import React, { Component } from "react";
import Button from "@material-ui/core/Button";


import newsStyles from "../../styles/newsStyle"


import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";

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

    showloader = (style,loading) =>
    {
   
        if ( style=="overlay" && loading)
        {
            return <div style={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.07)",
                zIndex: 10,
                top: 0,
                left: 0,
                position: "fixed"
            }}>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        //width: "100%",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}
                > <CircularProgress /></div>
            </div>
          
        }

      
        
      
        
        else if (style == "normal" && loading)
        {
            return <div>

                <CircularProgress  /></div>

        }

    }
    
    showlinear = (type,loading) => {

        if (type== "linear" && loading) {
            return <div>
                <div>
                    <LinearProgress variant="determinate" value={this.state.completed} /></div>
            </div>

        }
         else {
            return false

        }

    }
   

    render() {
        const { classes,loading,type,value,style } = this.props;



        return (
            <React.Fragment>
                <CssBaseline />
                {style && loading ?
                    <div
                       
                    >
                        {this.showloader(style,loading)}
                    
                    </div> :

                    <div

                    >
                        {this.showlinear(type, loading)}

                    </div>
                    
                    
                    
                    
                    
                    }
                    
            </React.Fragment>
        );
    }
}

export default withStyles(newsStyles)(RefreshLoader);

