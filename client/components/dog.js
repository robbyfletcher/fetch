import React from 'react';
import PropTypes from 'prop-types';

import {
  // Table,
} from 'react-bootstrap';

// import {
//   LinkContainer,
// } from 'react-router-bootstrap';

import style from '../assets/style.css';

import formatTable from '../helpers/format';

class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    fetch(`https://data.austintexas.gov/resource/hye6-gvq2.json?animal_id=${this.props.match.params.animal_id}`, {
      method: 'GET',
      headers: new Headers(),
      cache: 'default',
    })
    .then(res => (res.json()))
    .then((data) => {
      formatTable(data, (d) => {
        this.setState({
          table: d,
          loading: false,
        });
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className={style.loader} />
      );
    }

    return (
      <div>
        Pupper! {this.props.match.params.animal_id}
      </div>
    );
  }
}

Dog.defaultProps = {
  match: {
    params: {},
  },
};

Dog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      animal_id: PropTypes.string.isRequired,
    }),
  }),
};

export default Dog;
