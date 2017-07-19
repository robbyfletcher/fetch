import React from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  Nav,
  Navbar,
  NavItem,
  // NavDropdown,
  // MenuItem,
} from 'react-bootstrap';

import {
  LinkContainer,
} from 'react-router-bootstrap';

import puppy from '../assets/puppy.png';
import fetch from '../assets/fetch.png';

class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    this.setState({
      activeKey: selectedKey,
    });
  }

  render() {
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img src={puppy} alt="pupper!" />
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/">
              <img src={fetch} alt="go fetch!" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={this.state.activeKey}>
            <LinkContainer to="/">
              <NavItem eventKey={1} onSelect={this.handleSelect}>
                Map of Found Pets
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/list">
              <NavItem eventKey={2} onSelect={this.handleSelect}>
                Lost Animals That Have Been Found
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navi;

// <NavItem eventKey={2} href="#">Link</NavItem>
// <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//   <MenuItem eventKey={3.1}>Action</MenuItem>
//   <MenuItem eventKey={3.2}>Another action</MenuItem>
//   <MenuItem eventKey={3.3}>Something else here</MenuItem>
//   <MenuItem divider />
//   <MenuItem eventKey={3.4}>Separated link</MenuItem>
// </NavDropdown>
