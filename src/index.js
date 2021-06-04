import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Accommodation from "./pages/Accommodation";
import Directions from "./pages/Directions";
import Registry from "./pages/Registry";
import Vendors from "./pages/Vendors";
import RSVP from "./pages/RSVP.js";

import './index.css'
import "./pages/styles/NavBar.css"

class App extends React.Component{
  render(){
    return (
      <Router>

        <header>
          <nav className="navBar-container">
          <Link to="/" className="navBar-link">Home</Link>
            <ul className="navBar-list">
              <li><Link to="/accommodation" className="navBar-link">Accommodation</Link></li>
              <li><Link to="/directions" className="navBar-link">Directions</Link></li>
              <li><Link to="/registry" className="navBar-link">Registry</Link></li>
              <li><Link to="/venders" className="navBar-link">Our venders</Link></li>
              <li><Link to="/rsvp" className="navBar-link">RSVP</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={withRouter(LandingPage)}/>
            <Route exact path="/accommodation" component={withRouter(Accommodation)}/>
            <Route exact path="/directions" component={withRouter(Directions)}/>
            <Route exact path="/registry" component={withRouter(Registry)}/>
            <Route exact path="/venders" component={withRouter(Vendors)}/>
            <Route exact path="/rsvp" component={withRouter(RSVP)}/>
          </Switch>
        </main>

        <footer>

        </footer>

      </Router>
    );
  }
}



ReactDOM.render(<App />,document.getElementById("root"))