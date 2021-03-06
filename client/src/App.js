import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Navbar from "./components/Navbar"
import Search from "./pages/Search"
import Saved from "./pages/Saved"



class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/saved" component={Saved} />
          </Switch>
        </div>
      </Router>
    );
  }
}



export default App;


