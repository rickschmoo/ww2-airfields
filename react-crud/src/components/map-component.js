import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '700px',
  height: '700px'
};

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: parseFloat(this.props.lat),
      long: parseFloat(this.props.long),
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker  
    };

    console.log("[MAPS] " + process.env.NODE_ENV);
    console.log("[MAPS] " + process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

}

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  
  render() {
    // console.log('[MAPS] LAT: ' + this.props.lat);
    // console.log('[MAPS ] LONG: ' + this.props.long);

    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          mapType="satellite"
          initialCenter={
            {
              lat: parseFloat(this.props.lat),
              lng: parseFloat(this.props.long)
            }
          }
          center={
            {
              lat: parseFloat(this.props.lat),
              lng: parseFloat(this.props.long)
            }
          }
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'Airfield'}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);


