import React from "react";
import BaseDialog from "../players/dialouges/baseDialouge";
import { withStyles } from "@material-ui/core/styles";
import customStyles from "../../styles/genricStyle";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Fontawsome from "../../commons/genricComponents/fontAwsomicon";
import Titlize from "../../commons/genricComponents/titlize";
//componet for commitie data under each tournament in tournamnet.js
class CommitieData extends React.Component {
  render() {
    const { data, name } = this.props;

    return (
      <BaseDialog {...this.props}>
        {data.length ? (
          data.map((val, index) => {
            return (
              <React.Fragment>
                <Card>
                  <CardHeader title={name} />
                </Card>

                <Card className={classes.commitiedata} key={index}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={12} sm={12} xs={12}>
                        <Typography gutterBottom variant="body1">
                          <Fontawsome
                            name="name"
                            size="lg"
                            className={classes.gridIcon}
                          />
                          <Titlize value={val.name} />
                        </Typography>
                        <Typography gutterBottom variant="body1">
                          <Fontawsome
                            name="designation"
                            size="lg"
                            className={classes.gridIcon}
                          />
                          {val.designation}
                        </Typography>
                        <Typography gutterBottom variant="body1">
                          <Fontawsome
                            name="email"
                            size="lg"
                            className={classes.gridIcon}
                          />
                          {val.email}
                        </Typography>
                        <Typography gutterBottom variant="body1">
                          <Fontawsome
                            name="phone"
                            size="lg"
                            className={classes.gridIcon}
                          />{" "}
                          {val.mobile}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          })
        ) : (
          <Typography gutterBottom variant="body1">
            Infomation not available
          </Typography>
        )}
      </BaseDialog>
    );
  }
}

export default withRouter(withStyles(customStyles)(CommitieData));
