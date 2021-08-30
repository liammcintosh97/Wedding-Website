import React from "react";
import {
  GoogleMap,
} from "@react-google-maps/api";

import "./styles/map.scss"

require('dotenv').config()

const immerse = {
  lat:-37.6132478,
  lng: 145.4142731
}

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
    if(process.env.NODE_ENV === 'development') console.log('Google Map onload: ', map)
    this.setState({map: map})
    if(this.props.onMapLoad !== null && this.props.onMapLoad !== undefined) this.props.onMapLoad(map);
  }

  onMapUnmount(map){
    if(process.env.NODE_ENV === 'development') console.log('Google Map unmount: ', map)
    this.setState({
      map: null,
      directionsService: null,
      directionsRenderer: null,})
  }

  onMapClick (...args) {
    if(process.env.NODE_ENV === 'development') console.log('onClick args: ', args)
    if(this.props.onMapClick !== null && this.props.onMapClick !== undefined) this.props.onMapClick(args)
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
      </GoogleMap>
    )
  }
}


export default Map