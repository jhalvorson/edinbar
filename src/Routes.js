import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Match
} from 'react-router-dom'

//import styles
import './App.css';

//import components
import Map from './components/map/Map';
import CardList from './components/cards/CardList';
import Bar from './components/bar/Bar';

//WPAPI
var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://maxxium.dev/wp-json' });
var namespace = 'wp/v2';
var route = '/bar/(?P<id>)';
wp.bars = wp.registerRoute(namespace, route);

class App extends Component {

  constructor() {

    super();

    this.getBars = this.getBars.bind(this);

    this.state = {
      bars: [],
      loadingBars: true
    }
  }

  componentDidMount() {
    this.getBars();
  }

  getBars() {
    wp.bars().then((bars) => {
      this.setState({
        loadingBars: false,
        bars
      })
    }).catch(function( err ) {
      console.log(err)
    });
  }

  render() {
    return (
      <Router>

        <div className="App">
          <Helmet
            title="Maxxium proof of concept"
          />
          <section className="main-container">
            <Map bars={this.state.bars} />
            <Route
              exact path="/"
              render={(props) => (
                <CardList bars={this.state.bars} {...props} />
            )} />
            <Route
              path="/bar/:slug"
              render={(props) => (
                <Bar 
                  bars={this.state.bars}
                  loading={this.state.loadingBars}
                  {...props} />
            )} />
          </section>
        </div>
      </Router>
    );
  }
}


export default App;
