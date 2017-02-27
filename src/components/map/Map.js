import React, { Component, PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class Map extends Component {

  render() {

    const { bars } = this.props;

    const PrimaryMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 55.9483387, lng: -3.1918747 }}
      >
        {props.bars.map((bar, index) => (
          <Marker
            position={{ lat: parseFloat(bar.acf.bar_location.lat), lng: parseFloat(bar.acf.bar_location.lng) }}
            key={index}
            />
        ))}
      </GoogleMap>
    ));

    return (
      <PrimaryMap
         containerElement={
           <div className="map-container"/>
         }
         mapElement={
           <div className="map-container__inner"/>
         }
         bars={bars}
       />
   );
 }
}

Map.propTypes = {

}
