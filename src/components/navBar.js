import React from 'react'
import {Link} from "react-router-dom";

import "../pages/styles/NavBar.scss"

const smallScreenSize = 600;

class NavBar extends React.Component{
  constructor(props){
    super(props);

    this.state = {smallScreen: false}

    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('resize', this.handleResize);
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
        <nav>
          <Link to="/" className="nav-link">Home</Link>
            <ul className="nav-list">
              <li><Link to="/accommodation" className="nav-link">Accommodation</Link></li>
              <li><Link to="/directions" className="nav-link">Directions</Link></li>
              <li><Link to="/registry" className="nav-link">Registry</Link></li>
              <li><Link to="/venders" className="nav-link">Our venders</Link></li>
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