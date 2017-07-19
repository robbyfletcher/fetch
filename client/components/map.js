import React from 'react';
import PropTypes from 'prop-types';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.pos}
    containerElement={
      <div style={{ height: '500px' }} />
    }
    mapElement={
      <div style={{ height: '500px' }} />
    }
  >
    {props.markers.map(m => (
      <Marker
        key={m.key}
        position={{ lat: m.lat, lng: m.lng }}
      />
    ))}
  </GoogleMap>
));

Map.propTypes = {
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  containerElement: PropTypes.node,
  mapElement: PropTypes.node,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  ),
};

Map.defaultProps = {
  defaultZoom: 12,
  defaultCenter: {
    lat: 0,
    lng: 0,
  },
  containerElement: (<div style={{ height: '500px' }} />),
  mapElement: (<div style={{ height: '500px' }} />),
  markers: [],
};

export default Map;
