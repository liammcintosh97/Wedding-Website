import React from "react"

import "./styles/vendor.scss"

import SocialIcons from "./socialIcons"

class Vendor extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={`vendor-container`}>
        <div className="header">
          <h2>{this.props.type}</h2>
        </div>

        <div className= "image-container">
          <img src={this.props.imageSource} alt={`Image of ${this.props.name}`}/>
        </div>
        <div className= "details-container">
          <h3>{this.props.name}</h3>
          {this.props.children}
        </div>

        <SocialIcons
          youtubeLink={this.props.youtubeLink}
          twitterLink={this.props.twitterLink}
          instagramLink={this.props.instagramLink}
          facebookLink={this.props.facebookLink}
          websiteLink={this.props.websiteLink}
        />
      </div>
  )}
}

export default Vendor