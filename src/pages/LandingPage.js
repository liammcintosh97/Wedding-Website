import React from "react"
import {Link} from "react-router-dom";


import PictureGallery from "../components/pictureGallery.js"
import "./styles/landingPage.scss"

class LandingPage extends React.Component{

  render(){
    return (

      <div className="landingPage-container">
        <header>
        </header>
        <main>
          <PictureGallery/>
          <div className="landingPage-title">
            <h1>Monique & Liam</h1>
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