import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps";
import InfoBox from 'react-google-maps/lib/addons/InfoBox';

import demStyles from "./MapStyles.json";
import icon from './map-pin.svg';

export default class Map extends Component {

  render() {

    const { bars } = this.props;
    // function getPixelPositionOffset() {
    //   return { x: -70, y: -155 };
    // }

    const infoBoxSettings = {
      options: {
        enableEventPropagation: true,
        disableAutoPan: false
      }
    }

    const PrimaryMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={13}
        center={props.center}
        defaultOptions={{ styles: demStyles }}
      >
        {props.bars.map((bar, index) => (
              <Marker
                icon={icon}
                position={{ lat: parseFloat(bar.acf.bar_location.lat), lng: parseFloat(bar.acf.bar_location.lng) }}
                key={index}
                onClick={() => props.onMarkerClick(bar)}
                >
                  {
                    bar.showInfo && (
                      <div>
                        <InfoBox {...infoBoxSettings}>
                          <div className="map-infowindow">
                            <img src={bar.acf.bar_image_gallery[0].sizes.thumbnail} alt=""/>
                            <h3 dangerouslySetInnerHTML={{__html:bar.title.rendered}}/>
                          </div>
                        </InfoBox>
                      </div>
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
         center={this.props.center}
       />
   );
 }
}
