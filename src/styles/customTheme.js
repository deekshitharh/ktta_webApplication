
import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { red} from "@material-ui/core/colors";
import { orange, pink, green } from "@material-ui/core/colors";
import { darkTheme } from "./themefile/darktheme";
import { lightTheme } from "./themefile/lightTheme"
// import {Theme} from "./themefile/lightTheme"
const drawerWidth = 200;


// const darkTheme = {
//     'cardHeader': "black"

// }

// const lightTheme = {
//     'cardHeader': "#e0e0e0"
// }


const Theme = (themeStatus) => {
    console.log("hello1", themeStatus)
    const themeSettings = (themeStatus == "light") ? lightTheme : darkTheme;
    const theme1 =
        createMuiTheme({
       
            typography: {
                fontFamily: [
                    'Arial',
                    'sans-serif',
                ].join(','),
                subtitle1: {
                    fontSize: 14,
                },
                body1: {
                    fontWeight: 500,
                },

            },
            overrides: {
                MuiDrawer: {
                    // root: {
                    //     backgroundColor: '#202020',
                    //     width: drawerWidth,

                    // },
                    paper: {
                        //  backgroundColor: '#202020',
                        width: drawerWidth,
                    },
                },
                MuiDivider: {
                    root: {
                        backgroundColor: themeSettings.divider
                    }
                
                },
                MuiCheckbox:themeSettings.checkbox,
                MuiAvatar: themeSettings.avatar,
                MuiButton: {
                    root: themeSettings.button
                    // root: {
                    //     // backgroundColor: "#fffff"
                    //     backgroundColor: "#ff0000",
                    //     color: "#ffffff",
                    //     "&:hover": {
                    //         backgroundColor: "#ff0000 !important",
                        
                    //     }
                    // },
              
                },
                MuiCard: {
                    root: {
                        border: "3px solid whitesmoke"

                    }
                },

                MuiStepConnector:  themeSettings.connector,
        
                MuiStepIcon: themeSettings.StepIcon,
                    
                         

                  
MuiCardHeader: {
                    root: {
                        backgroundColor: themeSettings.cardHeader

                    },
                    title: {
                        color: 'black',
                        fontSize: '18px',
                        lineHeight: '1em'
                    },
                    subheader: {
                        color: 'black'
                    }

                },

                MuiTextField: {
                    root: {
                        borderRadius: 0,
                        fontSize: '18px',
                    },


                
                },
                MuiListItem: themeSettings.ListItem,
                MuiTableHead: themeSettings.tableHeader,
                MuiTableRow:themeSettings.tableRow,
                MuiInputLabel: {
                    root: {
                        fontSize: '16px'
                    },

                },
                MuiIcon:themeSettings.icon,
                MuiTab: themeSettings.tab,
                MuiCircularProgress: themeSettings.CircularProgress,

                MuiTabs:themeSettings.tabs,

                MuiMenuItem: themeSettings.MenuItem,
                MuiTable: {

            
                   
                       
                backgroundColor: "grey"

                    
                     
                },
                MuiLinearProgress: themeSettings.LinearProgress,
         
                MuiToggleButton: {
                    root: themeSettings.toggleButton
                    // root: {
                    //     color: "#0000000",
                    //     backgroundColor: "#17151536",
                    //     "&$selected": {
                    //         color: "#ffffff",
                    //         backgroundColor: "#ff0000",
                    //     },
                        // "&$disabled": {
                        //     color: '#ffffff',
                           
                        // }
                    
            
                }
            
            }
            



        
        
    });
    return (
        theme1

    )
    }


export default Theme;