import React from "react"
import {Link} from "react-router-dom";


import PictureGallery from "../components/pictureGallery.js"
import "./styles/landingPage.scss"

import pic1 from "../images/immerse/bridge.jpeg"
import pic2 from "../images/immerse/dinning_hall.jpeg"
import pic3 from "../images/immerse/outside_chapel.jpeg"
import pic4 from "../images/immerse/trees.jpeg"

const images = [pic1,pic2,pic3,pic4]

class LandingPage extends React.Component{

  render(){
    return (

      <div className="landingPage-container">
        <header>
        </header>
        <main>
          <PictureGallery images={images}/>
          <div className="landingPage-title">
            <div className="title-text">
              <h1>LIAM </h1><h1 className="cursive">and</h1><h1> MONIQUE</h1>
            </div>
            <h2><em>are getting married!</em></h2>
            <div className="landingPage-date-container">
              <h3>27/05/2022</h3>
              <h3 className="landingPage-RSVP-button"><Link to="/rsvp">RSVP</Link></h3>
            </div>
          </div>
        </main>
        <footer>
        </footer>

      </div>
    );
  }

}

export default LandingPage
