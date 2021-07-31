import React from "react"

import "./styles/thematicBreak.scss"

class ThematicBreak extends React.Component{ 
  render(){
    return (
      <hr className={`thematic-break ${this.props.direction}`}></hr>
  )}
}

export default ThematicBreak