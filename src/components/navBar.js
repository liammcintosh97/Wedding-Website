import React from 'react'
import {Link} from "react-router-dom";

import "./styles/navBar.scss"

const smallScreenSize = 600;

class NavBar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      smallScreen: false,
      showing: false,
    }

    this.navRef = React.createRef();
    this.navContainerRef = React.createRef();

    this.handleResize = this.handleResize.bind(this);
    this.show = this.show.bind(this);

    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount(){
    this.handleResize();

    this.showTrue = ()=>{this.show(true)};
    this.showFalse = ()=>{this.show(false)};

    this.navContainerRef.current.addEventListener('mouseenter',this.showTrue);
    this.navContainerRef.current.addEventListener('mouseleave',this.showFalse);
  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.handleNavResize);
    this.navContainerRef.current.removeEventListener('mouseenter',this.showTrue);
    this.navContainerRef.current.removeEventListener('mouseleave',this.showFalse);
  }

  show(show){
    this.setState({showing: show})

    if(show) this.navRef.current.classList.add("show");
    else this.navRef.current.classList.remove("show")
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
      <div ref={this.navContainerRef} className="nav-container">
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
          <div onClick={()=>{this.show(!this.state.showing)}} className="nav-tag">{this.state.smallScreen ? "<": "^"}</div>
        </div>

      </div>
    ); 
  }
}

export default NavBar