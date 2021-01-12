//theme setting for darkTheme
export const darkTheme = {
    'cardHeader': "#32407b1c",
    "divider": "#e43f5a",
    "checkbox": {
        colorSecondary: {
            color: '#162447',
            '&$checked': {
                color: '#162447',
            },
        },
    },
    avatar: {
        colorDefault: {
            backgroundColor: "#162447",
        }
    },

    StepIcon: {
        active: {

            color: "#54123b !important ",

        },
        completed: {
            color: "#54123b !important "
        }
    },
    
    button: {
        // backgroundColor: "#fffff"
        backgroundColor: "#162447",
        color: "white",
        "&:hover": {
            backgroundColor: "#162447",

        },
        "&$disabled": {

            color: '#A9A9A9',

        }
    },

    connector: {
        line: {
            borderColor:"#162447"
        },
      

    },
    toggleButton: {
      
  
        color: "#000000",
        backgroundColor: "#17151536",
        
        "&$selected": {
            color: "#ffffff",
            backgroundColor: "#1f4287 !important",
        },
        "&$disabled": {
          
                            color: '#ffffff',

            
                        }

        
       
    },

    LinearProgress: {
        barColorPrimary: {

            backgroundColor: "#54123b",

        }
    },
    CircularProgress: {
        
    colorPrimary: {
        color: "#54123b",
                       

                    },

    },

    MenuItem: {
        root: {
            "&:hover": {
                backgroundColor: "#32407b52",

            },
        }
    },
    tableHeader: {
        root: {
            background: "#17151536"
        },
    },
    tableRow: {
        root: {

            backgroundColor: "#2b6b9f14"
        }
    },
    tab: {
        root: {

            "&$selected": {
                fontSize: 15,
             
            },
            "&:hover": {
                backgroundColor: "#32407b52",
                
               

            },

        }
    },
    ListItem: {
        root: {

            "&$selected": {
                backgroundColor: "#D85B6D",

            },
            "&$selected:hover": {
                backgroundColor: "#ca2e55ab",
                color: "white"
            }
        },

            button:{
                "&:hover": {
                    backgroundColor: "#e41f7b24",

                }

                },

            
        
        
    },
    tabs: {

     


        //backgroundColor: "grey"


        indicator: {

            backgroundColor: "#32407b",
            height: 3
        }
    },
    
    icon: {
        color:"#54123b"
    }
}