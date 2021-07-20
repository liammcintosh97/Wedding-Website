import React from "react";
import {
  GoogleMap,
  InfoWindow
} from "@react-google-maps/api";

import "./styles/map.scss"

require('dotenv').config()

const immerse = {
  lat:-37.6132478,
  lng: 145.4142731
}

const defaultLink = 'https://www.google.com/maps/place/Immerse+in+the+Yarra+Valley/@-37.613213,145.4143096,15z/data=!4m11!1m2!3m1!2sImmerse+in+the+Yarra+Valley!3m7!1s0x6ad7d41c04b2f489:0xcb920246e6c2b014!5m2!4m1!1i2!8m2!3d-37.613213!4d145.4143096'

class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      map: null,
    }

    this.onMapLoad = this.onMapLoad.bind(this)
    this.onMapUnmount = this.onMapUnmount.bind(this);
    this.onMapClick = this.onMapClick.bind(this)

    this.hasDirections = this.hasDirections.bind(this);
  }

  //Google Map

  onMapLoad(map){
    console.log('Google Map onload: ', map)
    this.setState({map: map})
  }

  onMapUnmount(map){
    console.log('Google Map unmount: ', map)
    this.setState({
      map: null,
      directionsService: null,
      directionsRenderer: null,})
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  //Helper Methods

  hasDirections(){

    let directions = this.props.directions

    if(directions === null || directions === undefined) return false
    if(directions.response === null) return false;
    if(directions.origin.address === "" || directions.origin.coordinates === null) return false;
    if(directions.link === "") return false

    return this.props.directions !== null && this.props.directions !== undefined
  }

  render () {
    return (
      <GoogleMap
        id='google-map'
        mapContainerStyle={{
          height: '100%',
          width: '100%'
        }}
        zoom={15}
        center={immerse}
        onClick={this.onMapClick}
        onLoad={this.onMapLoad}
        onUnmount={this.onMapUnmount}
        options = {{
          streetViewControl: false,
          clickableIcons: false
        }}
      >
        {this.props.children}

        <InfoWindow
        position={immerse}
        option={{
          shouldFocus: true
        }}
        >
          <div className="map-infowindow">
            <div>
              <h2>Immerse in the Yarra Valley</h2>
              <p><strong>Address:</strong> 1548 Melba Hwy, Dixons Creek VIC 3775</p>
              <p><strong>Phone:</strong> (03) 5965 2444</p>
            </div>

            <div>
              <p><strong>Origin:</strong> {this.hasDirections() ? this.props.directions.origin.address : ""}</p>
              <p><strong>Distance:</strong> {this.hasDirections() ? this.props.directions.travelDistance : ""}</p>
              <p><strong>Duration:</strong> {this.hasDirections() ? this.props.directions.travelDuration : ""}</p>
            </div>
            <a href={this.hasDirections() ? this.props.directions.link : defaultLink}>Open in Google Maps</a>
          </div>
        </InfoWindow>
      </GoogleMap>
    )
  }
}


export default Map