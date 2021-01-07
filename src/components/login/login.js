import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Route, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { formFileds } from "../../formdata";
import { Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import newsStyles from "../../styles/newsStyle";
import Topbar from "../../components/landingPage/TopBar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { sessioncommons } from "../../commons";
import { ApiCall } from "../../APIService";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import formValidation from "../../commons/formfunction";
import SnackPopup from "../../commons/genricComponents/snackbar";
import moment from "moment";
import { commons } from "../../commons";
import FieldIcon from "../../commons/genricComponents/fieldIcon";

function cloneArray(arrayToClone) {
  let clonedArray = arrayToClone.map((item) => ({ ...item }));
  return clonedArray;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: [],

      loading: false,
      requestStatus: "",
      loginData: {},
    };
  }

  componentDidMount() {
    if (sessioncommons.getUser()) {
      this.props.history.push({
        pathname: "/dashboard",
      });
      // <Redirect to={{ pathname: '/dashboard' }} />
    } else {
      let data = cloneArray(formFileds);
      this.setState({ formdata: data });
    }
  }

  handleSuccessfulAuth() {
    this.props.history.push({
      pathname: "/dashboard",
    });
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const formvalues = [...this.state.formdata];
    let formInputDataValid = await formValidation.validatelogin(formvalues);

    let result = formInputDataValid.find((item) => {
      if (item.error.length) return item;
    });

    this.setState({ formdata: formInputDataValid });
    if (result == undefined) {
      const data = {};
      const formvalues = [...this.state.formdata];
      formvalues.map((obj) => {
        data[obj.id] = obj.value;
      });

      let apiData = {};
      apiData.type = "userLogin";
      //apiData.client_key = "ktta";
      apiData.caller = "caller";
       apiData.apiKey = "apikey";
      apiData.userName = data.email;
        apiData.userPassword = data.password;
        apiData.emailOrPhoneFlag = 1;
        apiData.loginRole = "Player";
      apiData.paymentValid = "yes";

      ApiCall("POST", apiData, "core")
        .then((response) => response.json())
        .then((data) => {
          if (typeof data === "object") {
            this.setState({ loginData: data });
            sessioncommons.setUserSession(data);
            this.handleSuccessfulAuth();
          } else if (typeof data === "string") {
            this.setState({
              requestStatus: data,
            });
          }
        })
        .catch((error) => {
          commons.errorLog(error);
        });
    }
  };

  handleChange = (e) => {
    const formvalues = [...this.state.formdata];

    formvalues.find((el) => {
      if (el && el.id === e.target.id) el.value = e.target.value;
    });

    this.setState({
      formdata: formvalues,
    });
  };

  render() {
    const { classes } = this.props;
    const { formdata, loginData, reqmsg, requestStatus, loading } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={3} />

        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid
              justify="center"
              alignItems="center"
              container
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              // className={classes.grid}
            >
              <Avatar
                style={{
                  margin: 8,
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>

              <Grid
                item
                xs={12}
                sm={8}
                md={6}
                className={classes.loginpaper}
                component={Paper}
                elevation={10}
                square
              >
                <form noValidate className={classes.form} autoComplete="off">
                  {formdata.map((formval, index) => {
                    return (
                      <TextField
                        key={index}
                        variant="outlined"
                        autoFocus={formval.id == "email" ? true : false}
                        margin="normal"
                        required={formval.required ? formval.required : false}
                        multiline={
                          formval.multiline ? formval.multiline : false
                        }
                        error={formval.error ? true : false}
                        helperText={formval.error}
                        id={formval.id}
                        rows={formval.rows ? formval.rows : ""}
                        value={formval.value}
                        fullWidth
                        onChange={this.handleChange}
                        label={formval.label}
                        type={formval.type}
                        InputLabelProps={{
                          classes: {
                            root: classes.label,
                            focused: classes.cssFocused,
                          },
                        }}
                        InputProps={{
                          classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                            input: classes.input,
                          },
                          startAdornment: <FieldIcon name={formval.adorment} />,
                        }}
                      />
                    );
                  })}
                  <Button
                    onClick={this.handleFormSubmit}
                    fullWidth
                    type="submit"
                    className={classes.loginsubmit}
                  >
                    Submit
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link
                        to={{
                          pathname: "/fogotPassword",
                        }}
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Grid>

                    <Grid item>
                      <Link to={{ pathname: "/registerSteps" }} variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>

                  {requestStatus.length ? (
                    <SnackPopup message={requestStatus} type="error" />
                  ) : (
                    ""
                  )}
                </form>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(newsStyles)(Login));