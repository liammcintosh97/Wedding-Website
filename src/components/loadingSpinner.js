import React from "react"

import "./styles/loadingSpinner.scss"

class LoadingSpinner extends React.Component{ 
  render(){
    return (
      <div className={"loading-spinner" + " " + this.props.className}></div>
  )}
}

export default LoadingSpinner