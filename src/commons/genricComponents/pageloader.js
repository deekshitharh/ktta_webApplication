import LinearProgress from "@material-ui/core/LinearProgress";

import CircularProgress from '@material-ui/core/CircularProgress';

import React from "react";



import customStyles from "../../styles/genricStyle"


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

    showloader = (display ,loading) =>
    {
   
        if ( display ==="overlay" && loading)
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

      
        
      
        
        else if (display === "normal" && loading)
        {
            return <div>

                <CircularProgress  /></div>

        }

    }
    
    showlinear = (type,loading) => {

        if (type=== "linear" && loading) {
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
        const {loading,type,display } = this.props;



        return (
            <React.Fragment>
                <CssBaseline />
                {display && loading ?
                    <div
                       
                    >
                        {this.showloader(display,loading)}
                    
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

export default withStyles(customStyles)(RefreshLoader);

