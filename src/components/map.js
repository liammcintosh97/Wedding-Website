import React from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  LoadScript
} from "@react-google-maps/api";

import "./styles/map.scss"

const immerse = {
  lat: -37.6132478,
  lng: 145.4142731
};

const lakesfield = {
  lat: -37.9150717,
  lng: 145.2784618
}

class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      response: null,
      travelMode: 'DRIVING',
      origin: '',
      destination: ''
    }

    this.directionsCallback = this.directionsCallback.bind(this)
    this.checkDriving = this.checkDriving.bind(this)
    this.checkBicycling = this.checkBicycling.bind(this)
    this.checkTransit = this.checkTransit.bind(this)
    this.checkWalking = this.checkWalking.bind(this)
    this.getOrigin = this.getOrigin.bind(this)
    this.getDestination = this.getDestination.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }

  directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  checkDriving ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'DRIVING'
        })
      )
  }

  checkBicycling ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'BICYCLING'
        })
      )
  }

  checkTransit ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'TRANSIT'
        })
      )
  }

  checkWalking ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'WALKING'
        })
      )
  }

  getOrigin (ref) {
    this.origin = ref
  }

  getDestination (ref) {
    this.destination = ref
  }

  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  render () {
    return (
        <div className='map-container'>
          <div className='map-settings'>
            <hr className='mt-0 mb-3' />

            <div className='row'>
              <div className='col-md-6 col-lg-4'>
                <div className='form-group'>
                  <label htmlFor='ORIGIN'>Origin</label>
                  <br />
                  <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
                </div>
              </div>

              <div className='col-md-6 col-lg-4'>
                <div className='form-group'>
                  <label htmlFor='DESTINATION'>Destination</label>
                  <br />
                  <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap'>
              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='DRIVING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'DRIVING'}
                  onChange={this.checkDriving}
                />
                <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='BICYCLING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'BICYCLING'}
                  onChange={this.checkBicycling}
                />
                <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='TRANSIT'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'TRANSIT'}
                  onChange={this.checkTransit}
                />
                <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='WALKING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'WALKING'}
                  onChange={this.checkWalking}
                />
                <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
              </div>
            </div>

            <button className='btn btn-primary' type='button' onClick={this.onClick}>
              Build Route
            </button>
          </div>
          <LoadScript
            googleMapsApiKey="AIzaSyAflzEwHOpzz0Mjsi6U5H71rExerRuZvlg"
          >
            <div className='google-map-container'>
              <GoogleMap
                id='google-map'
                mapContainerStyle={{
                  height: '100%',
                  width: '100%'
                }}
                zoom={2}
                center={immerse}
                onClick={this.onMapClick}
                onLoad={map => {
                  console.log('DirectionsRenderer onLoad map: ', map)
                }}
                onUnmount={map => {
                  console.log('DirectionsRenderer onUnmount map: ', map)
                }}
              >
                {
                  (
                    this.state.destination !== '' &&
                    this.state.origin !== ''
                  ) && (
                    <DirectionsService
                      options={{
                        destination: this.state.destination,
                        origin: this.state.origin,
                        travelMode: this.state.travelMode
                      }}
                      callback={this.directionsCallback}
                      onLoad={directionsService => {
                        console.log('DirectionsService onLoad directionsService: ', directionsService)
                      }}
                      onUnmount={directionsService => {
                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                      }}
                    />
                  )
                }
                {
                  this.state.response !== null && (
                    <DirectionsRenderer
                      options={{
                        directions: this.state.response
                      }}
                      onLoad={directionsRenderer => {
                        console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                      }}
                      onUnmount={directionsRenderer => {
                        console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                      }}
                    />
                  )
                }
              </GoogleMap>
            </div>
          </LoadScript>
      </div>
    )
  }
}


export default Map