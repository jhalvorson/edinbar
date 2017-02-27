import React, { Component } from 'react';
import './App.css';

//import components
import Map from './components/map/Map';
import MiniCard from './components/cards/MiniCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
        <MiniCard />
      </div>
    );
  }
}

export default App;
