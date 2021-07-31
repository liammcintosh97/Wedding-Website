

import React from 'react'
import PictureGallery from "../components/pictureGallery.js"
import {Link} from "react-router-dom";
import ThematicBreak from '../components/thematicBreak.js';
import "./styles/venue.scss"

import pic1 from "../images/immerse/outside_chapel.jpeg"
import pic2 from "../images/immerse/dinning_hall.jpeg"
import pic3 from "../images/immerse/bridge.jpeg"
import pic4 from "../images/immerse/trees.jpeg"
import SocialIcons from '../components/socialIcons.js'

const images = [pic1,pic2,pic3,pic4]

class Venue extends React.Component{
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  render(){
    return (

      <div className="venuePage-container">
        <header>
          <h1>Immerse in the Yarra Valley</h1>
        </header>
        <main>
          <div className="venue">

            <div className="venuePage-gallery-container">
              <PictureGallery images={images}/>
            </div>

            <div className="venuePage-info-container">
              <h2>Information</h2>
              <p><strong>Address:</strong> 1548 Melba Hwy, Dixons Creek VIC 3775</p>
              <p><strong>Phone:</strong> (03) 5965 2444</p>
              <p><Link to="/accommodation">Accommodation</Link> | <Link to="/directions">Directions</Link></p>
              <SocialIcons
                youtubeLink="https://www.youtube.com/channel/UCtlWoNWYTqL2pPunxdy6FLw"
                instagramLink="https://www.instagram.com/immerseyv/"
                facebookLink="https://www.facebook.com/immerseyarravalley/?fref=ts"
                websiteLink="https://immerse.com.au/"
                pintrestLink="https://au.pinterest.com/immerseyv/"
              />
            </div>

            <div className="venuePage-break-container">
              {
                this.state.width > 450 && (
                  <ThematicBreak direction="vertical"/>
                )
              }
              {
                this.state.width <= 450 && (
                  <ThematicBreak direction="horizontal"/>
                )
              }
            </div>

            <div className="venuePage-about-container">
              <h2>About</h2>
              <p>Nestled in the scenic Yarra Valley, Immerse is a breathtaking wedding venue, acclaimed restaurant and boutique winery all rolled into one. Rolling hills of vines, picture perfect gardens, stunning accommodation, succulent food and two beautiful chapels. Immerse is located in Dixons Creek which is just a short drive from Yarra Glen, Healesville and surrounding Yarra Valley attractions and accommodation.</p>
            </div>
          </div>
        </main>
        <footer>
        </footer>
      </div>
    );
  }

}

export default Venue