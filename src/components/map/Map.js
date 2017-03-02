import React, { Component, PropTypes } from 'react';
import { withGoogleMap, GoogleMap, InfoWindow, Marker, OverlayView } from "react-google-maps";
import demStyles from "./MapStyles.json";
import { Link } from 'react-router-dom';

export default class Map extends Component {

  render() {

    const { bars } = this.props;
    const { detectDrag } = this.props;

    const PrimaryMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 55.9483387, lng: -3.1918747 }}
        defaultOptions={{ styles: demStyles }}
      >
        {props.bars.map((bar, index) => (
          <Marker
            position={{ lat: parseFloat(bar.acf.bar_location.lat), lng: parseFloat(bar.acf.bar_location.lng) }}
            key={index}
            onClick={() => props.onMarkerClick(bar)}
            >
              {
                bar.showInfo && (
                  <InfoWindow onCloseClick={() => props.onMarkerClose(bar)}>
                    <div>
                      <img src={bar.acf.bar_image_gallery[0].sizes.thumbnail} alt=""/>
                      <h1 dangerouslySetInnerHTML={{__html:bar.title.rendered}}/>
                      <Link to={`/bar/${bar.slug}`}>More Info 🍺</Link>
                    </div>
                  </InfoWindow>
                )
              }
          </Marker>
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
         onDragStart={this.props.checkIsVisible}
         onMarkerClick={this.props.onMarkerClick}
         onMarkerClose={this.props.onMarkerClose}
       />
   );
 }
}

Map.propTypes = {

}
