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
import Accommodation from "./pages/Accommodation.js";
import Directions from "./pages/directions.js";
import Registry from "./pages/Registry.js";
import Vendors from "./pages/Vendors.js";
import RSVP from "./pages/RSVP.js";

import './index.scss'

class App extends React.Component{
  render(){
    return (
      <Router>

        <NavBar />

        <Switch>
          <Route exact path="/" component={withRouter(LandingPage)}/>
          <Route exact path="/accommodation" component={withRouter(Accommodation)}/>
          <Route exact path="/directions" component={withRouter(Directions)}/>
          <Route exact path="/registry" component={withRouter(Registry)}/>
          <Route exact path="/venders" component={withRouter(Vendors)}/>
          <Route exact path="/rsvp" component={withRouter(RSVP)}/>
        </Switch>

      </Router>
    );
  }
}



ReactDOM.render(<App />,document.getElementById("root"))