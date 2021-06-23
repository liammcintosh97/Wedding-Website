import React from "react"

import Map from "../components/map"

import "./styles/directions.scss"

class Directions extends React.Component{
  render(){
    return (
      <div className="directionPage-container">
        <header>
          <h1>Directions</h1>
        </header>
        <main>
          <Map/>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Directions