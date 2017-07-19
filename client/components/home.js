import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveEmbed,
} from 'react-bootstrap';

import Map from './map';

import style from '../assets/style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPos: this.props.loading,
      loadingDogs: this.props.loading,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => (
      this.setState({
        pos: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        loadingPos: false,
      })
    ));

    fetch('https://data.austintexas.gov/resource/hye6-gvq2.json', {
      method: 'GET',
      headers: new Headers(),
      cache: 'default',
    })
    .then(res => (res.json()))
    .then((data) => {
      this.setState({
        markers: data.map(d => ({
          key: d.animal_id,
          lat: parseFloat(d.location.latitude),
          lng: parseFloat(d.location.longitude),
        })),
        loadingDogs: false,
      });
    });
  }

  render() {
    if (this.state.loadingPos || this.state.loadingDogs) {
      return (
        <div>
          <div>
            <h1>
              Helping you find your lost pets since 2017!
            </h1>
            <h5>
              Currently only in Austin.
            </h5>
          </div>
          <hr />
          <div className={style.loader} />
        </div>
      );
    }
    return (
      <div>
        <div>
          <h1>
            Helping you find your lost pets since 2017!
          </h1>
          <h5>
            Currently only in Austin.
          </h5>
        </div>
        <hr />
        <ResponsiveEmbed a16by9>
          <Map pos={this.state.pos} markers={this.state.markers} />
        </ResponsiveEmbed>
      </div>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.bool,
};

Home.defaultProps = {
  loading: true,
};

export default Home;
