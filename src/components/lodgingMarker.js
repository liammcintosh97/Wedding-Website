import React from "react"
import {
  Marker,
  InfoWindow
} from "@react-google-maps/api";

import "./styles/lodgingMarker.scss"

class LodgingMarker extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isMarkerVisible: true,
      placeDetails: null,
      googleMapsLink: ''
    }

    this.infoWindow = null

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerLoad = this.onMarkerLoad.bind(this);

    this.getPlaceDetails = this.getPlaceDetails.bind(this);
    this.onPlaceDetails = this.onPlaceDetails.bind(this);
    this.handlePlaceDetailsError = this.handlePlaceDetailsError.bind(this);
  }

  onMarkerLoad(mapMouseEvent){
    console.log(`The marker ${this.props.placeName} was loaded`,mapMouseEvent);
  }

  async onMarkerClick(mapMouseEvent){
    console.log(`The marker ${this.props.placeName} was clicked`,mapMouseEvent);
    this.props.onLodgingMarkerClick(mapMouseEvent,this);
    this.getPlaceDetails();
  }

  getPlaceDetails(){
    let currentMap = this.props.mapRef.current.state.map

    if(this.state.placeDetails !== null){
      console.log("Already have place details")
      this.infoWindow.open({map:currentMap});
      return
    }

    const placeServices = new window.google.maps.places.PlacesService(currentMap);

    const request = {
      placeId: this.props.placeID,
      fields: ['formatted_address', 'formatted_phone_number','website']
    }
    return placeServices.getDetails(request, this.onPlaceDetails);
  }

  onPlaceDetails(placeDetails, status){
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      this.setState({placeDetails:placeDetails},()=>{
      })

    }
    else this.handlePlaceDetailsError()

  }

  handlePlaceDetailsError(status){
    let placesServiceStatus = window.google.maps.places.PlacesServiceStatus

    switch(status){
      case placesServiceStatus.INVALID_REQUEST:
        console.error("The place details request was invalid")
        break;

      case placesServiceStatus.OVER_QUERY_LIMIT:
        console.error("The place details request went over the query limit")
        break;

      case placesServiceStatus.NOT_FOUND:
        console.error("The place details request was not found")
        break;

        case placesServiceStatus.REQUEST_DENIED:
          console.error("The place details request was denied")
          break;

      case placesServiceStatus.UNKNOWN_ERROR:
        console.error("The place details request ran into an unknown error")
        break;

      case placesServiceStatus.ZERO_RESULTS:
        console.error("The place details request returned zero results")
        break;

      default:
        console.error("Something went wrong when trying to receive place details")
        break;
    }
  }


  render(){
    return (
      <div className="lodging-Marker">
        <Marker
          onLoad={this.onMarkerLoad}
          onClick={this.onMarkerClick}
          title={this.props.placeName}
          position={this.props.location}
          visible={this.state.isMarkerVisible}
        />
        {
          this.state.placeDetails !== null && (
            <InfoWindow
              onLoad={infoWindow => {this.infoWindow = infoWindow}}
              position={this.props.location}
              >
                <div className="lodgingMarker-infoWindow">
                  <div>
                    <h2>{this.props.placeName}</h2>
                    <p><strong>Address:</strong> {this.state.placeDetails.formatted_address}</p>
                    <p><strong>Phone:</strong> {this.state.placeDetails.formatted_phone_number}</p>
                    <p><strong>Rating:</strong> {this.props.rating}</p>
                    <p><strong>Website:</strong> <a href={this.state.placeDetails.website}>{this.state.placeDetails.website}</a></p>

                  </div>
                </div>
            </InfoWindow>
          )
        }
      </div>
  )}
}

export default LodgingMarker