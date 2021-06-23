import React from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  LoadScript,
  StandaloneSearchBox,
  InfoWindow
} from "@react-google-maps/api";

import "./styles/map.scss"

class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      response: null,
      travelDistance: '',
      travelDuration: '',
      origin: {
        address: '',
        coordinates: null
      },
      mapLibraries: ["places"],
      immerse: {
        lat:-37.6132478,
        lng: 145.4142731
      },
      map: null,
      directionsService: null,
      directionsRenderer: null,
      link: `https://www.google.com/maps/place/Immerse+in+the+Yarra+Valley/@-37.613213,145.4143096,15z/data=!4m11!1m2!3m1!2sImmerse+in+the+Yarra+Valley!3m7!1s0x6ad7d41c04b2f489:0xcb920246e6c2b014!5m2!4m1!1i2!8m2!3d-37.613213!4d145.4143096`,
      defaultLink: 'https://www.google.com/maps/place/Immerse+in+the+Yarra+Valley/@-37.613213,145.4143096,15z/data=!4m11!1m2!3m1!2sImmerse+in+the+Yarra+Valley!3m7!1s0x6ad7d41c04b2f489:0xcb920246e6c2b014!5m2!4m1!1i2!8m2!3d-37.613213!4d145.4143096'
    }

    this.onMapLoad = this.onMapLoad.bind(this)
    this.onMapUnmount = this.onMapUnmount.bind(this);

    this.directionServiceOnLoad =this.directionServiceOnLoad.bind(this);
    this.directionServiceOnUnmount = this.directionServiceOnUnmount.bind(this);
    this.directionsServiceCallback = this.directionsServiceCallback.bind(this)

    this.directionsRendererOnUnmount = this.directionsRendererOnUnmount.bind(this);
    this.directionsRendererOnLoad = this.directionsRendererOnLoad.bind(this);

    this.onClick = this.onClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.onSearchLoad = this.onSearchLoad.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.hasValidOrigin = this.hasValidOrigin.bind(this);
    this.buildLink = this.buildLink.bind(this);
    this.hadValidResults = this.hadValidResults.bind(this);
    this.encapsulateRoute = this.encapsulateRoute.bind(this);
  }

  //Google Map

  onMapLoad(map){
    console.log('Google Map onload: ', map)
    this.setState({map: map})
  }

  onMapUnmount(map){
    console.log('Google Map unmount: ', map)
    this.setState({map: null})
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  //Direction Service

  directionServiceOnLoad(directionsService){
    console.log('DirectionsService onLoad: ', directionsService)
    this.setState({directionsService: directionsService})
  }

  directionServiceOnUnmount(directionsService){
    console.log('DirectionsService onUnmount: ', directionsService)
    this.setState({directionsService: null})
  }

  directionsServiceCallback(response) {
    console.log('DirectionsService callBack: ', response)
    var point = response.routes[0].legs[0]

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState({
            response: response,
            travelDistance: point.distance.text,
            travelDuration: point.duration.text
        })

        this.encapsulateRoute()
      } else {
        console.log('response: ', response)
      }
    }
  }

  //Direction Renderer

  directionsRendererOnLoad(directionsRenderer){
    console.log('DirectionsRenderer onLoad: ', directionsRenderer)
    this.setState({directionsRenderer: directionsRenderer})
  }

  directionsRendererOnUnmount(directionsRenderer){
    console.log('DirectionsRenderer onUnmount: ', directionsRenderer)
    this.setState({directionsRenderer: null})
  }
  //Standalone Search Box

  onSearchLoad(ref){
    this.searchBox = ref;
  }

  onPlacesChanged(){

    var selectedPlace = this.searchBox.getPlaces()[0];

    var newOrigin = {
      address: selectedPlace.formatted_address,
      coordinates: {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng()
      }
    }

    this.origin = newOrigin;
  }

  //Map Form

  onClick () {
    if (this.hasValidOrigin) {
      this.setState({
          response: null,
          origin: this.origin,
          link: this.buildLink(this.origin.address)
        }
      )
    }
  }

  //Helper Methods

  addToLatLng(latLng, toAdd){
    return{
      lat: latLng.lat + toAdd,
      lng: latLng.lng + toAdd
    }
  }

  hadValidResults(){
    return (this.state.link !== this.state.defaultLink) && (this.state.travelDistance !== '') && (this.state.travelDuration !== '')
  }

  buildLink(originAddress){
     return `https://www.google.com/maps/dir/${encodeURIComponent(originAddress)}/Immerse+in+the+Yarra+Valley,+1548+Melba+Hwy,+Dixons+Creek+VIC+3775/@-37.763864,145.2048431,11z/`
  }

  encapsulateRoute(){
    var maps = window.google.maps;

    var bounds = new maps.LatLngBounds();

    bounds.extend(new window.google.maps.LatLng(this.state.origin.coordinates.lat,this.state.origin.coordinates.lng));
    bounds.extend(new window.google.maps.LatLng(this.state.immerse.lat,this.state.immerse.lng));

    console.log(this.state.map.getZoom());

    this.state.map.fitBounds(bounds);
    this.state.map.setCenter(this.state.immerse)
    this.state.map.setZoom(this.state.map.getZoom() - 1);
  }

  hasValidOrigin(){
    return (this.state.origin.address !== '' && this.state.origin.coordinates !== null);
  }

  render () {

    return (
        <div className='map-container'>
          <LoadScript
            googleMapsApiKey="AIzaSyBT3kSkHNjlaAj0quxgW_kthRPkCr8e_9k"
            libraries={this.state.mapLibraries}
          >
          <div className="map-settings">
            <div className='map-form'>
              <StandaloneSearchBox
                bounds= {{
                  north: this.state.immerse.lat + 5,
                  south: this.state.immerse.lat - 5,
                  east: this.state.immerse.lng + 5,
                  west: this.state.immerse.lng - 5,
                }}
                onLoad={this.onSearchLoad}
                onPlacesChanged={
                  this.onPlacesChanged
                }
              >
                <input
                  type="text"
                  placeholder="Where are you traveling from?"
                  className="map-search-input"
                />
              </StandaloneSearchBox>

              <button className='map-settings-build-button' onClick={this.onClick}>Build Route</button>
            </div>
          </div>
          <div className='google-map-container'>
            <GoogleMap
              id='google-map'
              mapContainerStyle={{
                height: '100%',
                width: '100%'
              }}
              zoom={15}
              center={this.state.immerse}
              onClick={this.onMapClick}
              onLoad={this.onMapLoad}
              onUnmount={this.onMapUnmount}
              streetView = {this.streetViewPanorama}
              options = {{
                streetViewControl: false,
                clickableIcons: false
              }}
            >
              {
                (
                  this.hasValidOrigin() && this.state.response === null
                )  && (
                  <DirectionsService
                      options={{
                        destination: this.state.immerse,
                        origin: this.state.origin.address,
                        travelMode: 'DRIVING',
                      }}
                    callback={this.directionsServiceCallback}
                    onLoad={this.directionServiceOnLoad}
                    onUnmount={this.directionServiceOnUnmount}
                  />
                )
              }
              {
                this.state.response !== null && (
                  <DirectionsRenderer
                    options={{
                      directions: this.state.response,
                      preserveViewport: true
                    }}
                    onLoad={this.directionsRendererOnLoad}
                    onUnmount={this.directionsRendererOnUnmount}
                  />
                )
              }
              <InfoWindow
              position={this.state.immerse}
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
                    <p><strong>Origin:</strong> {this.state.origin.address}</p>
                    <p><strong>Distance:</strong> {this.state.travelDistance}</p>
                    <p><strong>Duration:</strong> {this.state.travelDuration}</p>
                  </div>
                  <a href={this.state.link}>Open in Google Maps</a>
                </div>
              </InfoWindow>
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    )
  }
}


export default Map