import React from "react"

import "./styles/socialIcons.scss"

import websiteLogo from "../images/website_logo.png"
import websiteLogoHighlight from "../images/website_logo_highlight.png"
import facebookLogo from "../images/facebook_logo.png"
import facebookLogoHighlight from "../images/facebook_logo_highlight.png"
import instagramLogo from "../images/instagram_logo.png"
import instagramLogoHighlight from "../images/instagram_logo_highlight.png"
import twitterLogo from "../images/twitter_logo.png"
import twitterLogoHighlight from "../images/twitter_logo_highlight.png"
import youtubeLogo from "../images/youtube_logo.png"
import youtubeLogoHighlight from "../images/youtube_logo_highlight.png"
import pintrestLogo from "../images/pintrest_logo.png"
import pintrestLogoHighlight from "../images/pintrest_logo_highlight.png"

class SocialIcons extends React.Component{


  iconChange(event,image){
    event.target.style.background = `url(${image})`;
    event.target.style.backgroundSize = "contain";
    event.target.style.backgroundRepeat = "no-repeat";
  }

  render(){
    return (
      <div className="social-icons">
      { this.props.websiteLink && (
        <a
          onMouseEnter={(event)=> this.iconChange(event,websiteLogoHighlight)}
          onMouseLeave={(event)=> this.iconChange(event,websiteLogo)}
          style={{
              backgroundImage: `url(${websiteLogo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }
          }
          href={this.props.websiteLink}
          className="icon"> </a>
        )
      }
      { this.props.facebookLink && (
        <a
          onMouseEnter={(event)=> this.iconChange(event,facebookLogoHighlight)}
          onMouseLeave={(event)=> this.iconChange(event,facebookLogo)}
          style={{
              backgroundImage: `url(${facebookLogo})`,
              backgroundSize: "contain",
            }
          }
          href={this.props.facebookLink}
          className="icon"> </a>
        )
      }
      { this.props.instagramLink && (
        <a
          onMouseEnter={(event)=> this.iconChange(event,instagramLogoHighlight)}
          onMouseLeave={(event)=> this.iconChange(event,instagramLogo)}
          style={{
              backgroundImage: `url(${instagramLogo})`,
              backgroundSize: "contain",
            }
          }
          href={this.props.instagramLink}
          className="icon"> </a>
        )
      }
      { this.props.twitterLink && (
        <a
          onMouseEnter={(event)=> this.iconChange(event,twitterLogoHighlight)}
          onMouseLeave={(event)=> this.iconChange(event,twitterLogo)}
          style={{
              backgroundImage: `url(${twitterLogo})`,
              backgroundSize: "contain",
            }
          }
          href={this.props.twitterLink}
          className="icon"> </a>
        )
      }
      { this.props.youtubeLink && (
        <a
          onMouseEnter={(event)=> this.iconChange(event,youtubeLogoHighlight)}
          onMouseLeave={(event)=> this.iconChange(event,youtubeLogo)}
          style={{
              backgroundImage: `url(${youtubeLogo})`,
              backgroundSize: "contain",
            }
          }
          href={this.props.youtubeLink}
          className="icon"> </a>
        )
      }
      { this.props.pintrestLink && (
        <a
          onMouseEnter={(event)=> this.iconChange(event,pintrestLogoHighlight)}
          onMouseLeave={(event)=> this.iconChange(event,pintrestLogo)}
          style={{
              backgroundImage: `url(${pintrestLogo})`,
              backgroundSize: "contain",
            }
          }
          href={this.props.pintrestLink}
          className="icon"> </a>
        )
      }
    </div>
  )}
}

export default SocialIcons