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
      <Route path="/">
          <PropertyList />
        </Route>
        <Route path="/detail">
          <PropertyDetail />
        </Route>
      </div>
    </Router>
    
  );
}

export default App;
