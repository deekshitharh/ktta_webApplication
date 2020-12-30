import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import { Link, withRouter } from "react-router-dom";
import Icon from '@material-ui/core/Icon';

import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clubAssociation from "../about/ClubAsscoc"

class ViewMorePage extends Component {


    constructor(props) {
        super(props);



    }

    componentDidMount() { }





    render() {

        const { classes, pathname, title ,index } = this.props;
        return (
           
                    
      
                    
            <Button  component={Link}
                    to={{
                        pathname: pathname,
                       asssocval:index? 1:null
                }}
                endIcon={<ChevronRightIcon/>}
                    style={{

                        textDecoration: "none",
                          borderRadius:0,
                      
                    
                }}>
                
                {title} 
                 
             
            </Button>
            
            
            
            
            
            
            
            
            
         
              

          
            

        )

    }
    
}

export default ViewMorePage;