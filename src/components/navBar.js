import React from 'react'
import {Link} from "react-router-dom";

import "./styles/navBar.scss"
import logo from "../images/logo.png"

const smallScreenSize = 600;

class NavBar extends React.Component{
  constructor(props){
    super(props);

    this.state = {mallScreen: false}

    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount(){
    this.handleResize();
  }

  handleResize(){
    var small = false;

    if(window.innerWidth < smallScreenSize){small = true;}
    else{small = false;}

    if(small !== this.state.smallScreen){
      this.setState({
        smallScreen: small,
      })
    }
  }


  render(){
    return(
      <div className="nav-container">
        <nav ref={this.navRef}>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">home</Link></li>
          </ul>
          <ul className="nav-list">
            {/*<li><Link to="/venue" className="nav-link">The Venue</Link></li>*/}
            <li><Link to="/schedule" className="nav-link">timeline</Link></li>
            <li><Link to="/accommodation" className="nav-link">accommodation</Link></li>
            <li><Link to="/directions" className="nav-link">directions</Link></li>
            <li><Link to="/registry" className="nav-link">registry</Link></li>
            {/*<li><Link to="/venders" className="nav-link">Our venders</Link></li>*/}
            <li><Link to="/rsvp" className="nav-link">RSVP</Link></li>
          </ul>
        </nav>

        <div className="nav-tag-container">
          <div className="nav-tag">{this.state.smallScreen ? "<": "^"}</div>
        </div>

      </div>
    ); 
  }
}

export default NavBar