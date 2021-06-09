import React from "react"

import PictureGallary from "../components/pictureGallary.js"
import "./styles/LandingPage.scss"

class LandingPage extends React.Component{

  render(){
    return (

      <div className="landingPage-container">

        <PictureGallary/>

        <header>
        </header>
        <main>
          <div className="landingPage-title">
            <h1>Monique & Liam</h1>
            <h2>are getting Married!</h2>
            <h3>on the 27/05/2022</h3>
          </div>
        </main>
        <footer>
        </footer>

      </div>
    );
  }

}

export default LandingPage