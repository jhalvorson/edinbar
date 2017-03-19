import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  history
} from 'react-router-dom';

//import styles
import './App.scss';

//import components
import Map from './components/map/Map';
import CardList from './components/cards/CardList';
import Bar from './components/bar/Bar';
import Navigation from './components/navigation/Navigation';

//WPAPI
var WPAPI = require( 'wpapi' );
var wp = new WPAPI({ endpoint: 'http://maxxium.dev/wp-json' });
var namespace = 'wp/v2';
var route = '/bar/(?P<id>)';
wp.bars = wp.registerRoute(namespace, route);

class App extends Component {

  constructor(props) {

    super(props);

    this.getBars = this.getBars.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.checkIsVisible = this.checkIsVisible.bind(this);

    this.state = {
      bars: [],
      loadingBars: true,
      infoWindowOpen: false,
      center: {
        lat: 55.9483387,
        lng: -3.1918747
      }
    }
  }

  static contextTypes = {
    router: React.PropTypes.object,
  };

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

  handleMarkerClick(index, props, context) {
    this.setState({
      bars: this.state.bars.map(bar => {
        if (bar.showInfo === true) {
          return {
            ...bar,
            showInfo: false,
          };
        } else if (bar === index) {
          return {
            ...bar,
            showInfo: true,
          };
        }
        return bar;
      }),
      center: {
        lat: parseFloat(index.acf.bar_location.lat),
        lng: parseFloat(index.acf.bar_location.lng)
      }
    });
    this.context.router.push('/my-new-location')
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
      })
    });
  }

  checkIsVisible() {
    console.log('hey')
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Helmet
            title="Edinbar"
          />
        <Navigation />
          <section className="main-container">
            <Map
              bars={this.state.bars}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
              detectDrag={this.detectDrag}
              checkIsVisible={this.checkIsVisible}
              center={this.state.center}
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
                  onMarkerClose={this.handleMarkerClose}
                  center={this.state.center}
                  {...props} />
            )} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
