import React from "react"

import "./styles/loadingSpinner.scss"

class LoadingSpinner extends React.Component{ 
  render(){
    return (
      <div style={this.props.style} className={`loading-spinner ${this.props.className}`}></div>
  )}
}

export default LoadingSpinner