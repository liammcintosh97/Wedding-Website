import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import NavBar from "./components/navBar.js"
import LandingPage from "./pages/landingPage.js";
import Accommodation from "./pages/accommodation.js";
import Directions from "./pages/directions.js";
import Registry from "./pages/registry.js";
import VendorsPage from "./pages/vendorsPage.js";
import Schedule from "./pages/schedule.js";
import RSVP from "./pages/rsvp.js";
import Venue from "./pages/venue.js";

import './index.scss'

class App extends React.Component{
  render(){
    return (
      <Router>

        <NavBar />

        <Switch>
          <Route exact path="/" component={withRouter(LandingPage)}/>
          <Route exact path="/venue" component={withRouter(Venue)}/>
          <Route exact path="/schedule" component={withRouter(Schedule)}/>
          <Route exact path="/accommodation" component={withRouter(Accommodation)}/>
          <Route exact path="/directions" component={withRouter(Directions)}/>
          <Route exact path="/registry" component={withRouter(Registry)}/>
          <Route exact path="/vendors" component={withRouter(VendorsPage)}/>
          <Route exact path="/rsvp" component={withRouter(RSVP)}/>
        </Switch>

      </Router>
    );
  }
}



ReactDOM.render(<App />,document.getElementById("root"))