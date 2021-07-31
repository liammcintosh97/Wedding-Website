import React from "react"
import Vendor from "../components/vendor";

import "./styles/vendorsPage.scss"

import mike_larkan from "../images/mike_larkan.jpeg"
import paper_hearts from "../images/paper_hearts.png"
import emily_howlett from "../images/emily_howlett.png"

class VendorsPage extends React.Component{
  render(){
    return (
      <div className="vendorsPage-container">
      <header>
        <h1>Our Vendors</h1>
      </header>
      <main>
        <Vendor
          type="Celebrant"
          name="Mike Larkan"
          websiteLink="https://www.mikelarkan.com.au/"
          twitterLink="https://twitter.com/mikelarkan"
          instagramLink="https://www.instagram.com/mikelarkan/"
          imageSource={mike_larkan}
        >
          <div>
            <p>Mike is best known for being the nightly weatherman for TEN news. However, his breath of skills also extends to Auctioneering and of course Civil Marriage Celebrancy.</p>
            <p>Mike has a vast array of experiences from hosting, public speaking and journalism. His extensive career makes him a perfect fit for constructing our perfect ceremony. Mike’s mix of serious but light-hearted ceremonies and warm charisma will certainly engage and entertain.</p>
            <p>Mike has graduated from the prestigious International College of Celebrancy and averages around 50 weddings a year.</p>
          </div>
        </Vendor>

        <Vendor
          type="Musicians and Videographers"
          name="Paper Hearts"
          websiteLink="https://www.wearepaperhearts.com/"
          facebookLink="https://www.facebook.com/wearepaperhearts"
          instagramLink="https://www.instagram.com/wearepaperhearts/"
          youtubeLink="http://www.youtube.com/channel/UCGjuU3dPQBTXzPeKO7zpJ1Q"
          imageSource={paper_hearts}
        >
          <p>The husband and wife duo Amelia & Ryan make up the acoustic duo Paper Hearts. Their mix of acoustic guitar and DJ will give the day a mix of warm and intimate melodies as well as providing the dance tunes to party the night away.</p>
          <p>Paper Hearts will also be there to capture the special moments live on film as our videographers. </p>
        </Vendor>

        <Vendor
          type="Photographer"
          name="Emily Howlett"
          websiteLink="https://www.howlettphotography.com/"
          facebookLink="www.facebook.com/emilyhowlettphotography"
          instagramLink="www.instagram.com/emilyhowlettphotography"
          imageSource={emily_howlett}
        >
        </Vendor>

      </main>
      <footer>
      </footer>
    </div>
    );
  }
}

export default VendorsPage
