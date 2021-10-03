import React from "react"
import Map from "../components/map"
import {
  LoadScript,
  Circle,
} from "@react-google-maps/api";

import ReactSlider from 'react-slider'
import LodgingMarker from '../components/lodgingMarker'

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
      minValue: 1,
      maxValue: 15
    }

    this.state = {
      searchRadius: this.sliderPrefs.defaultValue,
      searchCircle: null,
      searchResults: null,
    }

    this.clickedLodging = null;

    this.onMapLoad = this.onMapLoad.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onLodgingMarkerClick = this.onLodgingMarkerClick.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.focusOnCircle = this.focusOnCircle.bind(this);
    this.onCircleLoad = this.onCircleLoad.bind(this);
    this.searchForAccommodation = this.searchForAccommodation.bind(this)
    this.onAccommodationResults = this.onAccommodationResults.bind(this)
    this.handlePlaceSearchError = this.handlePlaceSearchError.bind(this)
  }

  onMapLoad(map){
    if(process.env.NODE_ENV === 'development') console.log("On Map load:",map)

    this.searchForAccommodation();
  }

  onMapClick(args){
    if(this.clickedLodging !== null){
      this.clickedLodging.infoWindow.close();
      this.clickedLodging = null;
    }
  }

  onLodgingMarkerClick(mapMouseEvent, lodgingMarker){
    if(this.clickedLodging !== null){
      this.clickedLodging.infoWindow.close();
      this.clickedLodging = null;
    }

    this.clickedLodging = lodgingMarker;
  }

  onSliderChange(value){
    if(process.env.NODE_ENV === 'development') console.log("The slider has been changed",value);

    this.setState({searchRadius: value},()=>{
      this.focusOnCircle();
      this.searchForAccommodation();
    })
  }

  onCircleLoad(circle){
    if(process.env.NODE_ENV === 'development') console.log('Circle onLoad circle: ', circle)

    this.setState({searchCircle: circle})
  }

  focusOnCircle(){
    let currentMap = this.mapRef.current.state.map

    currentMap.fitBounds(this.state.searchCircle.getBounds());
  }

  async searchForAccommodation(){
    this.setState({searchResults:null},()=>{

      let currentMap = this.mapRef.current.state.map
      let placesService = new window.google.maps.places.PlacesService(currentMap);

      let request = {
        location: immerse,
        radius: this.state.searchRadius * 1000,
        keyword: "accommodation",
        type: ['lodging']
      }

      placesService.nearbySearch(request,this.onAccommodationResults)
    })
  }

 onAccommodationResults(results, status) {
    if(window.google === null || window.google === undefined) return
    if(process.env.NODE_ENV === 'development') console.log(`onAccommodationResults status:`,status);

    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      if(process.env.NODE_ENV === 'development') console.log(`There are ${results.length} results`,results);
      this.setState({searchResults: results})
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
          <h1>accommodation</h1>
        </header>
        <main>
        <div className="accommodation-settings">

          <div className="accommodation-settings-element">
            <div className="accommodation-radius-slider-container">
              <h4>{this.sliderPrefs.minValue + "km"}</h4>
              <ReactSlider
                className="accommodation-radius-slider"
                defaultValue={this.sliderPrefs.defaultValue}
                min={this.sliderPrefs.minValue}
                max={this.sliderPrefs.maxValue}
                onAfterChange={this.onSliderChange}
                orientation="horizontal"
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              />
              <h4>{this.sliderPrefs.maxValue + "km"}</h4>
            </div>

          </div>
        </div>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={mapLibraries}
          >
          <div className="accommodation-map-container">
            <Map
              ref={this.mapRef}
              onMapClick={this.onMapClick}
              onMapLoad={this.onMapLoad}
              >
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

              {
                this.state.searchResults !== null && this.state.searchResults.length > 0 && (
                  this.state.searchResults.map((result) =>{
                    const location = {
                      lat: result.geometry.location.lat(),
                      lng: result.geometry.location.lng()
                    }
                    return <LodgingMarker
                            onLodgingMarkerClick={this.onLodgingMarkerClick}
                            key={result.place_id}
                            placeID={result.place_id}
                            placeName={result.name}
                            location={location}
                            rating={result.rating}
                            mapRef={this.mapRef}
                            />
                  })
                )
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
