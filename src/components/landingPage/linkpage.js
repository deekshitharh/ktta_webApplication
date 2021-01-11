import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import { Link} from "react-router-dom";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';


class ViewMorePage extends Component {


   

    componentDidMount() { }





    render() {

        const {  pathname, title ,index } = this.props;
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