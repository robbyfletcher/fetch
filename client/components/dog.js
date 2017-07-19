import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import {
  Col,
  Jumbotron,
  Row,
  ResponsiveEmbed,
  Well,
} from 'react-bootstrap';

import Map from './map';

import style from '../assets/style.css';

import format from '../helpers/format';

class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
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
      format(data, (d) => {
        this.setState({
          data: d[0],
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
    } else if (!this.state.data.pos.lat) {
      return (
        <div>
          <div>
            <h1>
              {this.state.data.looksLike}
              &nbsp;
              <small>
                {this.state.data.address} {this.state.data.city},
                  {this.state.data.state}
              </small>
            </h1>
          </div>
          <hr />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <img
                  className="img-rounded"
                  src={this.state.data.image}
                  alt=""
                  width="100%"
                />
              </Well>
            </Col>
            <Col xs={12} md={6}>
              <Jumbotron>
                <ResponsiveEmbed a4by3>
                  <h2>
                    <center>
                      Location Not Available
                    </center>
                  </h2>
                </ResponsiveEmbed>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Well>
                <Row>
                  <Col xs={12} md={4}>
                    <h3>Type</h3>
                    <p>{this.state.data.type}</p>
                    <h3>Color</h3>
                    <p>{this.state.data.color}</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <h3>At ACC?</h3>
                    <p>{this.state.data.at_aac}</p>
                    <h3>Date Found</h3>
                    <p>{dateFormat(this.state.data.intake_date, 'dddd, mmmm dS, yyyy')}</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <h3>Age</h3>
                    <p>{this.state.data.age}</p>
                    <h3>Sex</h3>
                    <p>{this.state.data.sex}</p>
                  </Col>
                </Row>
              </Well>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div>
        <div>
          <h1>
            {this.state.data.looksLike}
          </h1>
        </div>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            <Well>
              <img
                className="img-rounded"
                src={this.state.data.image}
                alt=""
                width="100%"
              />
            </Well>
          </Col>
          <Col xs={12} md={6}>
            <Well>
              <ResponsiveEmbed a4by3>
                <Map pos={this.state.data.pos} markers={[this.state.data.pos]} />
              </ResponsiveEmbed>
            </Well>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Well>
              <Row>
                <Col xs={12} md={4}>
                  <h3>Type</h3>
                  <p>{this.state.data.type}</p>
                  <h3>Color</h3>
                  <p>{this.state.data.color}</p>
                </Col>
                <Col xs={12} md={4}>
                  <h3>At ACC?</h3>
                  <p>{this.state.data.at_aac}</p>
                  <h3>Date Found</h3>
                  <p>{dateFormat(this.state.data.intake_date, 'dddd, mmmm dS, yyyy')}</p>
                </Col>
                <Col xs={12} md={4}>
                  <h3>Age</h3>
                  <p>{this.state.data.age}</p>
                  <h3>Sex</h3>
                  <p>{this.state.data.sex}</p>
                </Col>
              </Row>
            </Well>
          </Col>
        </Row>
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
