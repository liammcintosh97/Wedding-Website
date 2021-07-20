import React from "react"
import Map from "../components/map"
import {
  LoadScript,
  DirectionsService,
  Circle,
} from "@react-google-maps/api";

import ReactSlider from 'react-slider'

import "./styles/accommodation.scss"

const immerse = {
  lat: -37.6132478,
  lng: 145.4142731
}

const mapLibraries = ["places"]

class Accommodation extends React.Component{
  constructor(props){
    super(props);

    this.mapRef = React.createRef();

    this.sliderPrefs = {
      defaultValue: 1,
      minValue: 0,
      maxValue: 15
    }

    this.state = {
      searchRadius: this.sliderPrefs.defaultValue,
      searchCircle: null,
    }

    this.onSliderChange = this.onSliderChange.bind(this);
    this.focusOnCircle = this.focusOnCircle.bind(this);
    this.onCircleLoad = this.onCircleLoad.bind(this);
    this.searchForAccommodation = this.searchForAccommodation.bind(this)
    this.onAccommodationResults = this.onAccommodationResults.bind(this)
    this.handlePlaceSearchError = this.handlePlaceSearchError.bind(this)
  }

  onSliderChange(value){
    console.log("The slider has been changed",value);

    this.setState({searchRadius: value},()=>{
      this.focusOnCircle();
      this.searchForAccommodation()
    })
  }

  onCircleLoad(circle){
    console.log('Circle onLoad circle: ', circle)

    this.setState({searchCircle: circle})
  }

  focusOnCircle(){
    let currentMap = this.mapRef.current.state.map

    currentMap.fitBounds(this.state.searchCircle.getBounds());
  }

  async searchForAccommodation(){
    let currentMap = this.mapRef.current.state.map
    let placesService = new window.google.maps.places.PlacesService(currentMap);

    let request = {
      location: immerse,
      radius: this.state.searchRadius * 1000,
      keyword: "accommodation",
      type: ['lodging']
    }

    placesService.nearbySearch(request,this.onAccommodationResults)
  }

 onAccommodationResults(results, status) {

    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
    }
    else{this.handlePlaceSearchError(status)}
  }

  handlePlaceSearchError(status){
    let placesServiceStatus = window.google.maps.places.PlacesServiceStatus

    switch(status){
      case placesServiceStatus.INVALID_REQUEST:
        alert("The place search request was invalid!")
        break;

      case placesServiceStatus.OVER_QUERY_LIMIT:
        alert("The place search request went over the query limit!")
        break;

      case placesServiceStatus.REQUEST_DENIED:
        alert("The place search request was denied!")
        break;

      case placesServiceStatus.UNKNOWN_ERROR:
        alert("The place search request ran into an unknown error! Please try again in a bit")
        break;

      case placesServiceStatus.ZERO_RESULTS:
        alert("Oh no, there were no results!")
        break;

      default:
        alert("Something went wrong!")
        break
    }
  }

  render(){
    return (
      <div className="accommodationPage-container">
        <header>
          <h1>Accommodation</h1>
        </header>
        <main>
        <div className="accommodation-settings">

          <div className="accommodation-settings-element">
            <label>Radius</label>
            <div className="accommodation-radius-slider-container">
              <p>{this.sliderPrefs.minValue + "km"}</p>
              <ReactSlider
                className="accommodation-radius-slider"
                defaultValue={this.sliderPrefs.defaultValue}
                min={this.sliderPrefs.minValue}
                max={this.sliderPrefs.maxValue}
                onAfterChange={this.onSliderChange}
                orientation="horizontal"
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              />
              <p>{this.sliderPrefs.maxValue + "km"}</p>
            </div>

          </div>
        </div>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={mapLibraries}
          >
          <div className="accommodation-map-container">
            <Map ref={this.mapRef}>
              {
                this.state.searchRadius > 0 &&
                <Circle
                  onLoad={this.onCircleLoad}
                  center={immerse}
                  options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,
                    radius: this.state.searchRadius * 1000,
                    zIndex: 1
                  }}
                />
              }

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

export default Accommodation
