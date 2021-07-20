import React from "react"

class LodgingMarker extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isVisible: true,
    }
  }

  render(){
    return (
      <div className="lodging-Marker">
        <Marker
          label={this.props.name}
          title={this.props.name}
          position={this.props.location}
          visible={this.state.isVisible}
        />
      </div>
  )}
}