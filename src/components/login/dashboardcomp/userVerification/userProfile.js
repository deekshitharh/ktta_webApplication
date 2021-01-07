import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import customStyles from "../../../../styles/genricStyle";
import FormGenerator from "../../../../commons/genricComponents/formGenerator"
import SnackPopup from "../../../../commons/genricComponents/snackbar"
import Paper from "@material-ui/core/Paper";
import { ApiCall } from "../../../../APIService";
import Grid from "@material-ui/core/Grid";
import { sessioncommons } from "../../../../commons";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import formValidation from "../../../../commons/formfunction";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { commons } from "../../../../commons";
import RefreshLoader from "../../../../commons/genricComponents/pageloader"
import moment from "moment";
import { usersetting } from "../../../../formdata"
import { editData } from "../../../../formdata"
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from '@material-ui/core/Container';

class userInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userProfile: [],
            "status": false,
            "message": "",
            loading: false,
            emessage:"",
          
        }
  
    }







    loadClubData = () => {
       
        let loggeduser = sessioncommons.getUser();
        let params = {};

      
        params.type = "fetchProfile";

        params.apiKey = "apikey";
        params.caller = "caller";
        
        var result = {};
        result['userId'] = loggeduser.userId
        params.data = JSON.stringify(result);
        this.setState({ loading: true });
        ApiCall("POST", params, "core")
            .then(res => res.json())
            .then(res => {
                if (res.status === "success" && res.result) {
                    let profile = res.result
                    let formDataInput = [...this.state.userProfile];

                  
                    formDataInput.map((item, index) => {

                        if (item.key === "dateOfBirth") {
                            item["value"] = moment(profile[item.key]).format('YYYY-MM-DD')
                        }
                        else if (item.key === "gender")
                        {
                            item["value"] = profile[item.key].toLowerCase();  
                            }
                        else {
                            item["value"] = profile[item.key] ? profile[item.key] : ''

                        }



                    })





                    this.setState({ "userProfile": formDataInput, loading: false, })
                
                }
                else if (res.status === "failure") {

                    this.setState({


                        "emessage": res.response, loading: false 

                    });
                }



            }).catch(error => {
                commons.errorLog(error)
            });



     
    };

    loadform=()=>{
    let formDataControl = [...JSON.parse(JSON.stringify(editData))];
    this.setState(
        {
            "userProfile": formDataControl,
        },
        () => {
            this.loadClubData();
        }
    );
    }


    componentDidMount() {
       
        this.loadform()
      
       
}

    // resetForm = () => {
    //     let formDataControl = [...JSON.parse(JSON.stringify(registration))];
    //     // const formDataControl = [...changePasswordForm];

    //     this.setState({
    //         "formData": formDataControl,
    //         "otpStatus": false,

    //     })
    // };
  


   


   
    verifyForm = async (e) => {

        e.preventDefault();
        let loggeduser = sessioncommons.getUser();
        let formData = this.state.userProfile;
     
        formData = await formValidation.validatePasswodData(formData);
       
        let errResult = formData.find((item) => {

            if (item && item.error.length) return item;
        })

        this.setState({ formData: formData });


        if (errResult === undefined) {

            const data = {};
            const formvalues = this.state.formData;
            formvalues.map((obj) => {
                if (obj.key == "dateOfBirth")
                
                    data[obj.id] = moment(obj.value).format('DD MMM YYYY');
                else {
                    data[obj.id] = obj.value
                }
            });

            console.log("helo finl data", data)

            var result = {};
            var params = {};
            params.apiKey = "apikey";
            params.caller = "caller";
            params.type = "editProfile";
        
            
            result.userId = loggeduser.userId;
            result.userName = data.userName;
            result.gender = data.gender
            result.phoneNumber = data.phoneNo
            result.dateOfBirth = data.DOB;

            //result.interestedSport']="8va5A8N3EKAeKtmeB";
          
            result.pinCode = data.pinCode;
            result.address = data.address;
            result.city = data.city;
            params.data = JSON.stringify(result);
            this.setState({ loading: true });
            ApiCall("POST", params, "core")
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        this.setState({ "status": true, "message": "", loading: false })
                        let message = (res.status === "success") ? res.response : "Could not update user profile"
                        if (res.status === "success") {
                            if (res.response)
                                this.setState({ "message": message, loading: false })
                           
                        }

                    }
  
                })
                .then((res) => {
                    this.loadform();
                })
                
                .catch(error => {
                    commons.errorLog(error)
                });

        };
    }

    onChange = (e) => {

        let formDataInput = [...this.state.userProfile];
       
        formDataInput.find((item) => {


            if (item.key === e.target.name) {
                (item.type === "number") ? item.value = parseInt(e.target.value) : item.value = e.target.value;

                if (item.key === e.target.name && item.type !== "string") item.value = e.target.value;
                if (item.type === "date") {
                
                    //let formatDate = moment(e.target.value).format('DD MMM YYYY');
                    item.value = e.target.value

                    //console.log("mokme", moment(e.target.value).format('DD MMM YYYY'))


                }

                if (item.key === e.target.name && item.id === "email") {
                    item.value = e.target.value;
                 
                }
                else if (item.key === e.target.name && item.type == "string") item.value = e.target.value;

            }



        })
        this.setState({ formData: formDataInput });


    }

    render() {
        const { classes, sideBar } = this.props;
        const { userProfile, loading, message, emessage } = this.state;

     

        let role_groups = formValidation.chunkArray(2, userProfile);


        return (

            <React.Fragment>
                <CssBaseline />
           
                <div className={classes.root}>
                    <Container maxWidth="sm">
                        <Card className={classes.card} style={{ margin: '10px' }}>
                            <CardHeader
                                title="Edit User" />
                            <CardContent>
                                <Grid align="center" justify="center" container >
                                    <Grid>
                                        <RefreshLoader style="normal" loading={loading} />
                                    </Grid>
                                </Grid>
                                <FormGenerator
                                    // formList={userProfile} onChange={this.onChange} variant="standard"

                                    groups={role_groups} groupBy={2}
                                    onChange={this.onChange} variant="standard"
                                />

                            </CardContent>



                        </Card>
                    
                    </Container>
                          
                   

                    {(message.length) ? (<SnackPopup message={message} type="success" />) : (emessage.length) ? (<SnackPopup message={emessage + " " +"try after some time!!"} type="error" />) : ""}

                    <Button onClick={this.verifyForm} disabled={(loading || emessage.length)? true : false}
                                style={{ marginTop: 10 }}>
                                Submit
                                </Button>

                            {/* {formData.map((item, index) => {
                                    const styleObj = {};
                                    if (item.hidden) styleObj["display"] = "none";

                                    return (<TextField
                                        key={index}
                                        variant='outlined'
                                        type={item.type}
                                        disabled={item.disabled ? true : false}
                                        hidden={item.hidden ? true : false}
                                        label={item.hidden ? '' : item.displayName}
                                        name={item.key}
                                        fullWidth
                                        margin="normal"
                                        value={item.value}
                                        onChange={this.onChange}
                                        error={item.error.length ? true : false}
                                        helperText={item.error}
                                        autoComplete="off"
                                        style={styleObj}
                                    />)

                                })} */}




                           

                      
                    
               




                                
                               
                       
                   
                </div>
            </React.Fragment>
























        )
    }

}
export default withStyles(customStyles)(userInfo);
