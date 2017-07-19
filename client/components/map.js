import React from 'react';
import PropTypes from 'prop-types';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.pos.lat, lng: props.pos.lng }}
  >
    {props.markers.map(m => (
      <Marker key={m.key} position={{ lat: m.lat, lng: m.lng }} />
      ),
    )}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const Map = props => (
  <SimpleMapExampleGoogleMap
    pos={props.pos}
    markers={props.markers}

    containerElement={
      <div style={{ height: '500px' }} />
    }
    mapElement={
      <div style={{ height: '500px' }} />
    }
  />
);

Map.propTypes = {
  pos: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  ),
};

Map.defaultProps = {
  pos: {
    lat: 0,
    lng: 0,
  },
  markers: [],
};

export default Map;
