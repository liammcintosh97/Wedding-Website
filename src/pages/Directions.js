import React from "react"

import Map from "../components/map"

import "./styles/directions.scss"

class Directions extends React.Component{
  render(){
    return (
      <div className="directionPage-container">
        <header>
        </header>
        <main>
          <h1>Directions</h1>
          <Map/>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Directions