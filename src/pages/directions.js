import React from "react"
import Map from "../components/map"
import {
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
  InfoWindow
} from "@react-google-maps/api";



import "./styles/directions.scss"

const immerse = {
  lat:-37.6132478,
  lng: 145.4142731
}
const defaultLink = 'https://www.google.com/maps/place/Immerse+in+the+Yarra+Valley/@-37.613213,145.4143096,15z/data=!4m11!1m2!3m1!2sImmerse+in+the+Yarra+Valley!3m7!1s0x6ad7d41c04b2f489:0xcb920246e6c2b014!5m2!4m1!1i2!8m2!3d-37.613213!4d145.4143096'
const mapLibraries = ["places"]

class Directions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      response: null,
      origin: {
        address: '',
        coordinates: null
      },
      directionsService: null,
      directionsRenderer: null,
      link: ""
    }

    this.mapRef = React.createRef();

    this.onBuildRoute = this.onBuildRoute.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.onSearchLoad = this.onSearchLoad.bind(this)

    this.directionServiceOnLoad =this.directionServiceOnLoad.bind(this);
    this.directionServiceOnUnmount = this.directionServiceOnUnmount.bind(this);
    this.directionsServiceCallback = this.directionsServiceCallback.bind(this)

    this.directionsRendererOnUnmount = this.directionsRendererOnUnmount.bind(this);
    this.directionsRendererOnLoad = this.directionsRendererOnLoad.bind(this);

    this.buildLink = this.buildLink.bind(this);
    this.hasValidOrigin = this.hasValidOrigin.bind(this);
    this.encapsulateRoute = this.encapsulateRoute.bind(this);
  }

  componentWillUnmount(){
    if(process.env.NODE_ENV === 'development') console.log("Directions page onUnmount");
    this.setState({
      response: null,
      origin: {
        address: '',
        coordinates: null
      },
      link: ""
    })
  }

  onBuildRoute () {

    if (this.origin !== null && this.origin !== undefined) {
      this.setState({
          response: null,
          origin: this.origin,
          link: this.buildLink(this.origin.address)
      })
    }
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

    this.origin = newOrigin
  }

  onSearchLoad(ref){
    this.searchBox = ref;
  }

   //Direction Service

   directionServiceOnLoad(directionsService){
    if(process.env.NODE_ENV === 'development') console.log('DirectionsService onLoad: ', directionsService)
    this.setState({directionsService: directionsService})
  }

  directionServiceOnUnmount(directionsService){
    if(process.env.NODE_ENV === 'development') console.log('DirectionsService onUnmount: ', directionsService)
    this.setState({directionsService: null})
  }

  directionsServiceCallback(response) {
    if(process.env.NODE_ENV === 'development') console.log('DirectionsService callBack: ', response)
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
        if(process.env.NODE_ENV === 'development') console.log('response: ', response)
      }
    }
  }

  //Direction Renderer

  directionsRendererOnLoad(directionsRenderer){
    if(process.env.NODE_ENV === 'development') console.log('DirectionsRenderer onLoad: ', directionsRenderer)
    this.setState({directionsRenderer: directionsRenderer})
  }

  directionsRendererOnUnmount(directionsRenderer){
    if(process.env.NODE_ENV === 'development') console.log('DirectionsRenderer onUnmount: ', directionsRenderer)
    this.setState({directionsRenderer: null})
  }

  //Helper Methods
  encapsulateRoute(){
    var maps = window.google.maps;

    var bounds = new maps.LatLngBounds();

    bounds.extend(new window.google.maps.LatLng(this.state.origin.coordinates.lat,this.state.origin.coordinates.lng));
    bounds.extend(new window.google.maps.LatLng(immerse.lat,immerse.lng));

    let currentMap = this.mapRef.current.state.map

    currentMap.fitBounds(bounds);
    currentMap.setCenter(immerse)
    currentMap.setZoom(currentMap.getZoom() - 1);
  }

  buildLink(originAddress){
    return `https://www.google.com/maps/dir/${encodeURIComponent(originAddress)}/Immerse+in+the+Yarra+Valley,+1548+Melba+Hwy,+Dixons+Creek+VIC+3775/@-37.763864,145.2048431,11z/`
  }

  hasValidOrigin(){
    return (this.state.origin.address !== '' && this.state.origin.coordinates !== null);
  }

  render(){
    return (
      <div className="directionPage-container">
        <header>
          <h1>directions</h1>
        </header>
        <main>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={mapLibraries}
          >
          <div className="directions-settings">
            <div className='directions-form'>
              <StandaloneSearchBox
                bounds= {{
                  north: immerse.lat + 5,
                  south: immerse.lat - 5,
                  east: immerse.lng + 5,
                  west: immerse.lng - 5,
                }}
                onLoad={this.onSearchLoad}
                onPlacesChanged={
                  this.onPlacesChanged
                }
              >
                <input
                  type="text"
                  placeholder="Where are you traveling from?"
                  className="directions-search-input"
                />
              </StandaloneSearchBox>

              <button className='directions-settings-build-button' onClick={this.onBuildRoute}>Build Route</button>
            </div>
          </div>
          <div className="directions-map-container">
            <Map ref={this.mapRef} directions={this.state}>
              {
                (
                  this.hasValidOrigin() && this.state.response === null
                ) && (
                  <DirectionsService
                      options={{
                        destination: immerse,
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
                this.hasValidOrigin() && this.state.response !== null && (
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
                position={immerse}
                option={{
                  shouldFocus: true
                }}
                >
                  <div className="directions-infoWindow">
                    <div>
                      <h2>Immerse in the Yarra Valley</h2>
                      <p><strong>Address:</strong> 1548 Melba Hwy, Dixons Creek VIC 3775</p>
                      <p><strong>Phone:</strong> (03) 5965 2444</p>
                    </div>

                    <div>
                      <p><strong>Origin:</strong> {this.state.response ? this.state.origin.address : ""}</p>
                      <p><strong>Distance:</strong> {this.state.response ? this.state.travelDistance : ""}</p>
                      <p><strong>Duration:</strong> {this.state.response ? this.state.travelDuration : ""}</p>
                    </div>
                    <a href={this.state.response ? this.state.link : defaultLink}>Open in Google Maps</a>
                  </div>
                </InfoWindow>
            </Map>
          </div>

        </LoadScript>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Directions
