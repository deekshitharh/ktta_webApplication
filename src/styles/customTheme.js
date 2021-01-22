import { createMuiTheme } from "@material-ui/core/styles";
import { darkTheme } from "./themefile/darktheme";
import { lightTheme } from "./themefile/lightTheme";
const drawerWidth = 200;
//theme configuration for light and dark themes based theme ie light/dark as param
const Theme = (themeStatus) => {
  const themeSettings = themeStatus === "light" ? lightTheme : darkTheme;
  const theme1 = createMuiTheme({
    typography: {
      fontFamily: ["Arial", "sans-serif"].join(","),
      subtitle1: {
        fontSize: 14,
      },
      body1: {
        fontWeight: 500,
      },
    },
    overrides: {
      MuiDrawer: {
        paper: {
          width: drawerWidth,
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: themeSettings.divider,
        },
      },
      MuiCheckbox: themeSettings.checkbox,
      MuiAvatar: themeSettings.avatar,
      MuiButton: {
        root: themeSettings.button,
      },
      MuiCard: {
        root: {
          border: "3px solid whitesmoke",
        },
      },

      MuiStepConnector: themeSettings.connector,

      MuiStepIcon: themeSettings.StepIcon,

      MuiCardHeader: {
        root: {
          backgroundColor: themeSettings.cardHeader,
        },
        title: {
          color: "black",
          fontSize: "18px",
          lineHeight: "1em",
        },
        subheader: {
          color: "black",
        },
      },

      MuiTextField: {
        root: {
          borderRadius: 0,
          fontSize: "18px",
        },
      },
      MuiListItem: themeSettings.ListItem,
      MuiTableHead: themeSettings.tableHeader,
      MuiTableRow: themeSettings.tableRow,
      MuiInputLabel: {
        root: {
          fontSize: "16px",
        },
      },
      MuiIcon: themeSettings.icon,
      MuiTab: themeSettings.tab,
      MuiCircularProgress: themeSettings.CircularProgress,

      MuiTabs: themeSettings.tabs,

      MuiMenuItem: themeSettings.MenuItem,
      MuiTable: {
        backgroundColor: "grey",
      },
      MuiLinearProgress: themeSettings.LinearProgress,

      MuiToggleButton: {
        root: themeSettings.toggleButton,
      },
    },
  });
  return theme1;
};

export default Theme;
