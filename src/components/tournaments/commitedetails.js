import React from 'react';
import BaseDialog from "../players/dialouges/baseDialouge"
import { withStyles } from "@material-ui/core/styles";
import newsStyles from "../../styles/newsStyle"
import { Link, withRouter, Router } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Fontawsome from "../../commons/genricComponents/fontAwsomicon"
import Titlize from "../../commons/genricComponents/titlize";

class CommitieData extends React.Component {
    constructor(props) {
        super(props)
        // localStorage.clear();
        // this.props.history.push('/login');
       
    }

  



    render() {
        const { classes,data,name} = this.props;
       
        return (
            <BaseDialog
                {...this.props}
            >
               
                {data.length ?
                    
                    
                        data.map((val, index) => {


                            return (
                              <React.Fragment>
                                    <Card>
                                        <CardHeader

                                            title={name}

                                        />

                                    </Card>
                            
                              
                                <Card style={{ margin: 5 }} key={index} >

                                    <CardContent

                                    >
                                        <Grid container spacing={2}>

                                            <Grid item md={12} sm={12} xs={12}>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                >
                                                    <Fontawsome
                                                        name="name"
                                                        size="lg"

                                                        style={{ width: "1.2em", color: "black" }}
                                                    />
                                                    <Titlize value={val.name} />

                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                >
                                                    <Fontawsome
                                                        name="designation"
                                                        size="lg"

                                                        style={{ width: "1.2em", color: "black" }}
                                                    />
                                                    {val.designation}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                >
                                                    <Fontawsome
                                                        name="email"
                                                        size="lg"

                                                        style={{ width: "1.2em", color: "black" }}
                                                    />{val.email}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                >
                                                    <Fontawsome
                                                        name="phone"
                                                        size="lg"

                                                        style={{ width: "1.2em", color: "black" }}
                                                    /> {val.mobile}
                                                </Typography>

                                            </Grid>
                                        </Grid>

                                    </CardContent>

                                </Card>
                                </React.Fragment>


                            )
        
                                })
                        
                
                
                
                
                    : <Typography
                        gutterBottom
                        variant="body1"
                    >
                   Infomation not available
                    </Typography>}
                 
            </BaseDialog>
        );
    }
}


export default withRouter(withStyles(newsStyles)(CommitieData));