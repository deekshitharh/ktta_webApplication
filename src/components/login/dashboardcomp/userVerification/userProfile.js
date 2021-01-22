import React from "react";
import Button from "@material-ui/core/Button";
import customStyles from "../../../../styles/genricStyle";
import FormGenerator from "../../../../commons/genricComponents/formGenerator";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import formValidation from "../../../../commons/formfunction";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import SnackPopup from "../../../../commons/genricComponents/snackbar";
import { commons } from "../../../../commons";
import RefreshLoader from "../../../../commons/genricComponents/pageloader";
import moment from "moment";
import { editData } from "../../../../formdata";
import Container from "@material-ui/core/Container";
//user info component for editing user details component used dashboard.js
class userInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      status: false,
      message: "",
      loading: false,
      emessage: "",
    };
  }

  //api to fetch user data
  loadUserData = () => {
    let loggeduser = sessioncommons.getUser();
    let params = {};
    params.type = "fetchProfile";
    params.userId = loggeduser.userId;
    this.setState({ loading: true });
    ApiCall("POST", params, "coreApi")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && res.result) {
          let profile = res.result;
          let formDataInput = [...this.state.userProfile];
          formDataInput.map((item, index) => {
            if (item.id === "dateOfBirth") {
              item["value"] = moment(profile[item.id]).format("YYYY-MM-DD");
            } else if (item.id === "gender") {
              item["value"] = profile[item.id].toLowerCase();
            } else {
              item["value"] = profile[item.id] ? profile[item.id] : "";
            }
          });

          this.setState({ userProfile: formDataInput, loading: false });
        } else if (res.status === "failure") {
          this.setState({
            emessage: res.response,
            loading: false,
          });
        }
      })
      .catch((error) => {
        commons.errorLog(error);
      });
  };
  //user data fileds
  loadform = () => {
    let formDataControl = [...JSON.parse(JSON.stringify(editData))];
    this.setState(
      {
        userProfile: formDataControl,
      },
      () => {
        this.loadUserData();
      }
    );
  };
  componentDidMount() {
    this.loadform();
  }

  //updated user data submitting to sever
  verifyForm = async (e) => {
    e.preventDefault();
    let loggeduser = sessioncommons.getUser();
    let formData = this.state.userProfile;
    formData = await formValidation.validatePasswodData(formData);
    let errResult = formData.find((item) => {
      if (item && item.error.length) return item;
    });
    this.setState({ formData: formData });
    if (errResult === undefined) {
      const data = {};
      const formvalues = this.state.formData;
      formvalues.map((obj) => {
        if (obj.id === "dateOfBirth")
          data[obj.id] = moment(obj.value).format("DD MMM YYYY");
        else {
          data[obj.id] = obj.value;
        }
      });

      var result = {};
      result.type = "setProfile";
      result.userId = loggeduser.userId;
      result.pinCode = data.pinCode;
      result.city = data.city;

      this.setState({ loading: true });
      ApiCall("POST", result, "coreApi")
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            this.setState({ status: true, message: "", loading: false });
            let message =
              res.status === "success"
                ? res.response
                : "Could not update user profile";
            if (res.status === "success") {
              if (res.response)
                this.setState({ message: message, loading: false });
            }
          }
        })
        .then((res) => {
          this.loadform();
        })

        .catch((error) => {
          commons.errorLog(error);
        });
    }
  };
  //onchange function for form fields.
  onChange = (e) => {
    let formDataInput = [...this.state.userProfile];
    formDataInput.find((item) => {
      if (item.id === e.target.name) {
        item.type === "number"
          ? (item.value = parseInt(e.target.value))
          : (item.value = e.target.value);
        if (item.id === e.target.name && item.type !== "string")
          item.value = e.target.value;
        if (item.type === "date") {
          item.value = e.target.value;
        }
        if (item.id === e.target.name && item.id === "emailAddress") {
          item.value = e.target.value;
        } else if (item.id === e.target.name && item.type === "string")
          item.value = e.target.value;
      }
    });
    this.setState({ formData: formDataInput });
  };

  render() {
    const { classes } = this.props;
    const { userProfile, loading, message, emessage } = this.state;
    let role_groups = formValidation.chunkArray(2, userProfile);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Container maxWidth="sm">
            <Card className={classes.card}>
              <CardHeader title="Edit User" />
              <CardContent>
                <Grid align="center" justify="center" container>
                  <Grid>
                    <RefreshLoader display="normal" loading={loading} />
                  </Grid>
                </Grid>
                <FormGenerator
                  groups={role_groups}
                  groupBy={2}
                  onChange={this.onChange}
                  variant="standard"
                />
              </CardContent>
            </Card>
          </Container>

          {message.length ? (
            <SnackPopup message={message} type="success" />
          ) : emessage.length ? (
            <SnackPopup
              message={`${emessage} Please try after some time!!`}
              type="error"
            />
          ) : (
            ""
          )}

          <Button
            onClick={this.verifyForm}
            disabled={loading || emessage.length ? true : false}
          >
            Submit
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(customStyles)(userInfo);
