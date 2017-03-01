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
import './App.scss';

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
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.detectDrag = this.detectDrag.bind(this);

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

  handleMarkerClick(index) {
    console.log('works');

    this.setState({
      bars: this.state.bars.map(bar => {
        if (bar === index) {
          return {
            ...bar,
            showInfo: true,
          };
        }
        return bar;
      }),
    });
  }

  handleMarkerClose(index) {
    this.setState({
      bars: this.state.bars.map(bar => {
        if (bar === index) {
          return {
            ...bar,
            showInfo: false,
          };
        }
        return bar;
      }),
    });
  }

  detectDrag() {
    console.log('dragging');
  }

  render() {
    return (
      <Router>

        <div className="App">
          <Helmet
            title="Maxxium proof of concept"
          />
          <section className="main-container">
            <Map
              bars={this.state.bars}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
              detectDrag={this.detectDrag}
            />
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
