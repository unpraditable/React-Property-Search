import React from 'react';
import logo from './logo.svg';
import PropertyList from './pages/PropertyList.js';
import PropertyDetail from './pages/PropertyDetail.js';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";


function App() {
  return (
    <Router basename="/apartment">
      <div className="App">
        <Route exact path="/">
          <PropertyList />
        </Route>
        
        {/* I use switch for nested routes, so those components will be rendered inclusively and it will be helpful for nested URLs */}
        <Switch>
          <Route path="/place/:propertyId" component={PropertyDetail}>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
