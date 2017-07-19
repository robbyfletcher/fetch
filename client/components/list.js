import React from 'react';
import dateFormat from 'dateformat';

import {
  Col,
  Panel,
  Row,
} from 'react-bootstrap';

import {
  LinkContainer,
} from 'react-router-bootstrap';

import style from '../assets/style.css';

import format from '../helpers/format';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    fetch('https://data.austintexas.gov/resource/hye6-gvq2.json', {
      method: 'GET',
      headers: new Headers(),
      cache: 'default',
    })
    .then(res => (res.json()))
    .then((data) => {
      format(data, (d) => {
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
        {this.state.table.map(d =>
          (
            <div key={d.key} className={style.pointer}>
              <LinkContainer to={`/dog/${d.key}`}>
                <Panel header={(<h2>{d.looksLike}</h2>)}>
                  <Row>
                    <Col xs={12} md={4}>
                      <img
                        className="img-rounded"
                        src={d.image}
                        alt=""
                        width="100%"
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <h5>Type</h5>
                      <p>{d.type}</p>
                      <h5>Color</h5>
                      <p>{d.color}</p>
                      <h5>Address</h5>
                      <p>{d.address} {d.city}, {d.state}</p>
                      <h5>At ACC?</h5>
                      <p>{d.at_aac}</p>
                    </Col>
                    <Col xs={12} md={4}>
                      <h5>Date Found</h5>
                      <p>{dateFormat(d.intake_date, 'dddd, mmmm dS, yyyy')}</p>
                      <h5>Age</h5>
                      <p>{d.age}</p>
                      <h5>Sex</h5>
                      <p>{d.sex}</p>
                    </Col>
                  </Row>
                </Panel>
              </LinkContainer>
            </div>
          ),
        )}
      </div>
    );
  }
}

export default List;
