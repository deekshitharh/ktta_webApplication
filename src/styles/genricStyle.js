//genric style setting for the all the component
const d2 = 240;

const customStyles = (theme) => ({
  ctLegend: {
    position: "relative",
    zIndex: 10,
    listStyle: "none",
    textAlign: "center",

    li: (props) => ({
      position: "relative",
      paddingLeft: 23,
      marginRight: 10,
      marginBottom: 3,
      cursor: "pointer",
      display: "inline-block",

      "&::before": {
        width: 12,
        height: 12,
        position: "absolute",
        left: 0,
        content: "",
        border: "3px solid transparent",
        borderRadius: 2,
      },
      "li.inactive::before": {
        background: "transparent",
      },

      " &:nth-child(1)::before": {
        backgroundColor: "#d70206",
      },

      "&:nth-child(2)::before": {
        backgroundColor: "#f05b4f",
      },

      "&:nth-child(3)::before": {
        backgroundColor: "#f05b4f",
      },
      "&:nth-child(1n+4)::before": {
        backgroundColor: "#f05b4f",
      },
    }),
  },

  divider: {},
  newsCard: {
    display: "flex",
    margin: 5,
  },
  infostyle: {
    marginLeft: "5px",
    textAlign: "center",
  },
  overlaycircular: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  overlayloader: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    zIndex: 10,
    top: 0,
    left: 0,
    position: "fixed",
  },
  drawsContainer: {
    height: "100%",
  },
  drawsChildren: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  root: {
    flexGrow: 1,

    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
  },
  loginsubmit: {
    margin: theme.spacing(3, 0, 2),
  },
  statistics: {
    flex: 1,
  },

  homegrid: {
    padding: 10,
  },
  commitieicon: {
    width: "2em",
    color: "black",
  },
  commitiecard: {
    justifyContent: "flex-end",
  },
  commitiegrid: {
    marginLeft: "5px",
  },
  clubCard: {
    paddingLeft: "5px",
  },
  errorInfo: {
    margin: "5px",
    width: "500px",
    overflowWrap: "break-word",
  },

  drawsAppbar:{
    backgroundColor: "#e50606e3"
  },
  drawsboder:{
    borderBottom: "3px solid #32407b"
  },
responsiveDailouge:{
  marginBottom: 20,
},
  drawspaper:{
    padding: 20,
    margin: 10,
  },
  regclubs: {
    flex: 1,
  },
  assocdiv: {
    margin: 4,
  },
  assocLink: {
    cursor: "pointer",
  },
  sponserimg: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
  sponsergid: {
    marginTop: 10,
  },
  textclass: {
    margin: 10,
  },
  gridIcon: {
    width: "1.2em",
    color: "black",
  },
responsivepadding:{
  paddingLeft: "10px"
},
responsiveicon:{
  width: "0.9em"
},
  drawstext: {
    whiteSpace: "nowrap",

    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  commitiedata: {
    margin: 5,
  },
  textcentre:{
    textAlign: "center",
  },
  textright: {
    textAlign: "right",
  },

  asscocgrid: {
    padding: 5,
  },
  gridpaper: {
    height: "100%",
  },
  divider: {
    height: 2,
  },
  viewClubs: {
    justifyContent: "left",
  },

  flexView: {
    display: "flex",
  },

  assocCard: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  infocomponent: {
    marginLeft: "5px",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#303030",
    color: "white",
    padding: "10px",
  },
  drawstable: {
    width: "25%",
    marginTop: "30px",
    borderSpacing: "0 5px",
    borderCollapse: "separate",
  },

  appBar: {
    position: "relative",
    boxShadow: "none",

    paddingBottom: "10px",
  },
  inline: {
    display: "inline",
  },
  errorbar: {
    backgroundColor: "red",
  },
  selectedcell: {
    border: "1px solid red",
  },
  basicard: {
    flexDirection: "column",
    display: "flex",
    height: 100,
    border: "3px solid whitesmoke",

    justifyContent: "space-between",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  cellstyle: {
    width: 20,
    maxWidth: 20,
  },
  headerstyle: {
    width: 20,
    maxWidth: 20,
  },

  basicheader: {
    height: 100,
  },
  successbar: {
    backgroundColor: "green",
  },

  swipeableDrawer: {
    backgroundColor: "#cccccc",
  },
  height: {
    height: "100%",
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  },

  error: {
    color: "red",
  },
  success: {
    color: "green",
  },

  link: {
    textDecoration: "none",
    color: "inherit",
    marginTop: "15px",
  },
  iconContainer: {
    display: "none",

    [theme.breakpoints.only("xs")]: {
      display: "block",
      color: "black",

      position: "relative",
    },
    [theme.breakpoints.only("sm")]: {
      display: "block",
      color: "black",

      position: "relative",

      left: "12px",
    },
  },
  iconButton: {
    float: "right",
    [theme.breakpoints.only("xs", "sm")]: {
      position: "relative",
    },
  },
  logo: {
    [theme.breakpoints.only("xs")]: {
      width: 180,

      position: "relative",
      top: 9,
    },
  },

  tabContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  successstatus: {
    color: "green",
  },

  highlightscore: {
    color: "green",
    paddingRight: 0,
    marginRight: 6,
  },

  spacing: {
    paddingRight: 0,
    marginRight: 6,
  },
  winner: {
    color: "green",
  },
  dasboardtabs: {
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  subsciptionbutton: {
    float: "right",
    marginLeft: "auto",
    margin: "10px",
  },
  tabItem: {
    padding: "7px 30px",
    minWidth: "auto",

    fontSize: 15,

    "&$selected": {},
  },

  assoccard: {
    height: "100%",
    border: "3px solid whitesmoke",
    justifyContent: "space-between",
  },
  officepaper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
  drawtable: {
    borderBottom: "none",
  },
  card: {
    marginBottom: 30,
    padding: 20,
  },
  horiCard: {
    display: "flex",
    margin: 2,
    height: 100,
  },
  newsfont: {
    fontSize: 18,
  },

  horiCardMedia: {
    //flex:1,
    flexDirection: "column",
    width: "40%",

    margin: 10,
  },
  horiCardContent: {
    flex: "1 ",
  },
  newsGridMedia: {
    height: 100,
  },
  media: {
    height: 100,
    width: 100,
    padding: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  description: {
    textAlign: "left",
    padding: 20,
  },
  newsInfoheader: {
    padding: 20,
  },

  newscardaction: {
    justifyContent: "flex-end",
  },

  mapgrid: {
    position: "relative",

    height: "250px",
  },
  formclass: {
    padding: 24,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(3),
    height: "100%",
  },

  entriespaper: {
    padding: theme.spacing(3),
    height: "100%",
    margin: 10,
  },

  dashboardpaper: {
    padding: theme.spacing(4),
    // background: "linear-gradient(to right, #ff0000a3 50%, black 50%)" ,

    background: "#69779bf5",
  },
  grid: {
    marginTop: 14,
  },

  tornamentcard: { marginBottom: 10 },

  buttonend: {
    justifyContent: "flex-end",
  },

  label: {
    color: "#000000",
    "&$cssFocused": {
      color: "#000000 ",
    },
  },

  imagecard: {
    width: 400,
    display: "flex",
    flexDirection: "column",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#000000 !important`,
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: " #000000 !important",
  },
  actionButton: {
    margin: 10,
  },

  selected: {
    backgroundColor: "#ff000047",
    fontSize: "18px ! important ",
  },
  dashboardtabs: {
    border: "2px solid red",
    color: "#000000! important",
    fontSize: 16,
    margin: 10,
  },
  bigIndicator: {
    display: "none !important",
  },
  listgrid: {
    marginTop: 10,
    border: "2px solid red",
  },
  dashboardtitle: {
    padding: theme.spacing(2),
    marginTop: 20,
  },

  expandIcon: {
    order: -1,
    edge: "start",
  },

  bannergrid: {
    position: "relative",
  },
  liststyle: {
    paddingLeft: 10,
  },

  bannertext: {
    position: "absolute",
    bottom: "40%",
    left: 16,
    fontSize: 30,
    color: "#ffffff",
  },

  fontIcon: {
    width: "1.1em",
    color: "black",
  },

  textpath: {
    textAlign: "left",
  },

  tourpaper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%",
  },

  gridroot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  gridtitle: {
    color: theme.palette.primary.light,
  },
  gridtitleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },

  rootDashboard: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBarDashboard: {
    top: 64,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: d2,
    width: `calc(100% - ${d2}px)`,
    height: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 10,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },

  loginpaper: {
    padding: theme.spacing(3),
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: d2,
    minHeight: "100vh",
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: { margin: 10 },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  contentpaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "100%",
  },

  image5: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default customStyles;
