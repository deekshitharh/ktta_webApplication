import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Fontawsome from "../../commons/genricComponents/fontAwsomicon"
import  { useEffect } from 'react'
//function to load twitter url
const Twitter = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-height="500"
          data-chrome="noheader nofooter noborders"
          href="https://twitter.com/KarnatakaTT"
        >
        </a>
      </div>
    </section>
  );
}
//iframe component to load media feed in home.js component
export default class MediaWidget extends Component {
  render() {
    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Paper>
            <Grid container spacing={2}>
              <Grid item sm={4} xs={12} md={4}>
                <Grid container align="center" justify="center">
                  <Grid item sm={12} xs={12} md={12}>
                    <Fontawsome
                      name="facebook"
                      size="lg"
                      style={{
                        width: "2em",
                        color: "#54123b",
                        fontSize: 30,
                        marginTop: 4,
                      }}
                    />
                  </Grid>
                  <Grid 
                    sm={12} xs={12} md={12}
                  >
                    <iframe
                      src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/KarnatakaTT/%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                      width="340" height="500"
                      scrolling="no"
                      title="facebook"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                    </iframe>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={4} xs={12} md={4} >
                <Grid container align="center" justify="center">
                  <Grid item sm={12} xs={12} md={12}>
                    <Fontawsome
                      name="twitter"
                      size="lg"
                      style={{
                        width: "2em",
                        color: "#54123b",
                        fontSize: 30,
                        marginTop: 4,
                      }}
                    />
                  </Grid>
                  <Grid md={12}>
                    <Twitter />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={4} xs={12} md={4} >
                <Grid container align="center" justify="center">
                  <Grid item sm={12} xs={12} md={12}>
                    <Fontawsome
                      name="instagram"
                      size="lg"
                      style={{
                        width: "2em",
                        color: "#54123b",
                        fontSize: 30,
                        marginTop: 4,
                      }}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <iframe
                      className="instagram-media instagram-media-rendered"
                      id="instagram-embed-0"
                      src="https://www.instagram.com/p/Bp_yvXjAgO4/embed/?cr=1&amp;v=12&amp;wp=284&amp;rd=http%3A%2F%2Fkarnatakatt.com&amp;rp=%2F#%7B%22ci%22%3A0%2C%22os%22%3A3741.24500004109%2C%22ls%22%3A3263.645000057295%2C%22le%22%3A3296.7000000644475%7D"
                      allowtransparency="true"
                      allowFullScreen={true}
                      frameBorder="0"
                      title="instagram"
                      width="340"
                      height="500"
                      scrolling="yes"
                      data-width=""
                      data-height=""
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>


        </Container>

      </div>
    );
  }
}