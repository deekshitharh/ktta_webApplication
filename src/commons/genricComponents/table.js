import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import newsStyle from '../../styles/newsStyle'
import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../formdata"




class TableDisplay extends Component {
    render() {
        const { classes, data, displayname,columdata,} = this.props;

        return (
        
                <div>
                    <MaterialTable
                        title={displayname}
                       columns={columdata}
                        data={data}
                        icons={tableIcons}
                        options={{

                            // filtering: true,

                            // filtering: true,
                            headerStyle: {
                                backgroundColor: '#f44336a6',
                                color: '#FFF'
                            },
                            rowStyle: {
                                backgroundColor: 'rgba(97, 97, 97, 0.2)',
                                color: '#000000'
                            }

                        }}



                    />


                </div>

         
        );
    }
}

export default withRouter(withStyles(newsStyle)(TableDisplay));
