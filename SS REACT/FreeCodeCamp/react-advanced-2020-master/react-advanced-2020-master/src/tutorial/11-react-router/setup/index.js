// 9/37/40
import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// pages
import Home from './Home';
import About from './About';
import People from './People';
import Error from './Error';
import Person from './Person';
// navbar
import Navbar from './Navbar';
const ReactRouterSetup = () => {
  // with switch only first match will be taken into account
  return <Router>
    <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route exact path="/people">
        <People/>
      </Route>
      <Route path="/person">
        <Person/>
      </Route>
      <Route path='/person/:id' children={<Person />}></Route>
      <Route path="*">  {/* Always Always Match in case of wrong page and other pages as well name added */}
        <Error/>
      </Route>
    </Switch>
  </Router>;
    
    
};

export default ReactRouterSetup;
