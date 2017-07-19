import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import Dog from './dog';
import Home from './home';
import List from './list';
import Navi from './navi';

const App = () => (
  <Router>
    <Grid>
      <Row>
        <Col sm={12} md={10} smOffset={0} mdOffset={1}>
          <Navi />
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
          <Route path={'/dog/:animal_id'} component={Dog} />
        </Col>
      </Row>
    </Grid>
  </Router>
);

export default App;
