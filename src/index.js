import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import NavBar from "./components/navBar"
import LandingPage from "./pages/LandingPage";
import Accommodation from "./pages/Accommodation";
import Directions from "./pages/Directions";
import Registry from "./pages/Registry";
import Vendors from "./pages/Vendors";
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