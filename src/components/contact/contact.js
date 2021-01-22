import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SnackPopup from "../../commons/genricComponents/snackbar";
import fields from "../../formdata/formvalues";
import CssBaseline from "@material-ui/core/CssBaseline";
import Topbar from "../landingPage/TopBar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MapContainer from "../typo/map";
import formValidation from "../../commons/formfunction";
import Container from "@material-ui/core/Container";
import FieldIcon from "../../commons/genricComponents/fieldIcon";
import { ApiCall } from "../../APIService";
//contact us component of contact us menu of navigation bar with map component,contact us fileds,
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: [],
      reqmsg: false,
      requestStatus: "",
      asscoc: this.props.location.state,
    };
  }
  //contact us fields
  componentDidMount() {
    let data = [...JSON.parse(JSON.stringify(fields))];
    this.setState({ formdata: data });
  }
  //form reset
  resetForm = () => {
    let data = [...JSON.parse(JSON.stringify(fields))];
    this.setState({ formdata: data });
  };

  handleChange = (e) => {
    const formvalues = [...this.state.formdata];
    formvalues.find((el) => {
      if (el && el.id === e.target.id) el.value = e.target.value;
    });

    this.setState({ formdata: formvalues });
  };
  //api call for form submit
  handleFormSubmit = async (e) => {
    const formvalues = [...this.state.formdata];

    let formInputDataValid = await formValidation.genricFromValidation(
      formvalues
    );

    let result = formInputDataValid.find((item) => {
      if (item.error.length) return item;
    });
    this.setState({ formdata: formInputDataValid });
    debugger;
    if (result === undefined) {
      const data = {};
      const formvalues = [...this.state.formdata];
      formvalues.map((obj) => {
        data[obj.id] = obj.value;
      });
      var params = {};
      params.name = data.name;
      params.entity = "contactUs";
      params.email = data.email;
      params.subject = data.subject;
      params.message = data.Messege;

      ApiCall("POST", params, "createData")
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            this.setState({
              reqmsg: true,
              requestStatus: data.status,
            });

            this.resetForm();
          } else {
            this.setState({
              reqmsg: false,
              requestStatus: "Error occured.Please try after sometime!!!",
            });
          }
        })

        .catch((error) => {
          console.error(error);
          this.setState({
            reqmsg: false,
            requestStatus: "Error occured.Please try after sometime!!!",
          });

          this.resetForm();
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { formdata, requestStatus } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar index={4} />

        <div className={classes.root}>
          <Container maxWidth="lg">
            <Paper className={classes.paper}>
              <MapContainer />
            <Paper className={classes.formclass}>
                <Grid container>
                  <Grid item md={6}>
                    <form noValidate autoComplete="off">
                      {formdata.map((formval, index) => {
                        return (
                          <TextField
                            key={index}
                            className={classes.textclass}
                            variant="outlined"
                            fullWidth
                            required={
                              formval.required ? formval.required : false
                            }
                            multiline={
                              formval.multiline ? formval.multiline : false
                            }
                            error={formval.error ? true : false}
                            helperText={formval.error}
                            id={formval.id}
                            rows={formval.rows ? formval.rows : ""}
                            value={formval.value}
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
                              startAdornment: (
                                <FieldIcon
                                  name={formval.adorment}
                                  size=""
                                  type="mat"
                                />
                              ),
                            }}
                          />
                        );
                      })}
                      {requestStatus.length ? (
                        <SnackPopup
                          message={`${requestStatus} Response Recorded!!!!`}
                          type="success"
                        />
                      ) : (
                        ""
                      )}
                    </form>
                  </Grid>
                </Grid>
                <Button
                  onClick={this.handleFormSubmit}
                  type="submit"
                  className={classes.actionButton}
                >
                  Submit
                </Button>
              </Paper>
            </Paper>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default Contact;
