import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import InfoComponent from "../../commons/genricComponents/infoComponent"
import SingleLineGridList from "../contact/assocList"
import Typography from "@material-ui/core/Typography";
const style = {
 
  width: "100%",
  height: "100%"
};



export class MapContainer extends Component {
  constructor(props) {
    super(props);
      this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      assocval: {},
      mapcode: {lat: 12.94074, lng:77.570398},
      initialAssoc: "T.B.P Recreational Club ,TB Dam,Hosapete, Karnataka"
    };

  }
 //function to set association data which is sent as prop to SingleLineGridList
  handleViewMap = asocdata =>{
 
  this.setState({
      assocval:asocdata 
    });
  }


//function for  marker clicked
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace:props,
      activeMarker:marker,
      showingInfoWindow:true,
      
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

 
//function for displaying map markers
  displayMarkers = (assocval) => {
    const { mapcode,initialAssoc}=this.state
      return (
        <Marker
          onClick={this.onMarkerClick}
         
          name={assocval.locationName ? assocval.locationName : initialAssoc}
          position={assocval.latitude && assocval.longitude ? {
            lat: assocval.latitude,
            lng: assocval.longitude
          } : mapcode}
        />
      );
  
  };

  render() {
    const { assocval, mapcode, initialAssoc } = this.state

    return (
      <React.Fragment>
        <Grid container spcaing={2}>
          
          <Grid item md={12} xs={12} sm={12}>
            <Typography
              style={{ textTransform: "uppercase" }}
              gutterBottom
              variant="body1"
            >
              <b>
                {assocval.locationName ? assocval.locationName : initialAssoc}
               
                      </b>
            </Typography>
          </Grid>
        
          <Grid style={{
         
              position: "relative",

              height: "350px",
          }} item md={8} sm={12} xs={12}>
            <Map
              onClick={this.onMapClicked}
              google={this.props.google}
              zoom={14}
              style={style}

              center={assocval.latitude && assocval.longitude ? {
                lat: assocval.latitude,
                lng: assocval.longitude
              } : {}}
              initialCenter={mapcode}
            >
              
              
              {this.displayMarkers(assocval)}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <Typography variant="h6" gutterBottom>
                  {this.state.selectedPlace.name}
                </Typography>
              </InfoWindow>
            </Map>
          
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <Container maxWidth="sm"> 
            <SingleLineGridList handleMapshow={this.handleViewMap}/>
            </Container>

             

        

      
          </Grid>

         
        </Grid>
      </React.Fragment>
      
    );
  }
}
// AIzaSyBGmwbep3PV4t5 - VkSUGoLPygpElHgCt3Y;
//  AIzaSyDUFP62wzPrpTvjZo2VdJOg0_8Xqlo1vwk;
export default GoogleApiWrapper({
  apiKey: "AIzaSyBGmwbep3PV4t5 - VkSUGoLPygpElHgCt3Y"
})(MapContainer);
