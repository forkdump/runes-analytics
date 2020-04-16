import React, { Component } from 'react';
import { Navbar, Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import TwitterDashboard from './twitter/TwitterDashboard';

class App extends Component {

  render() {
    return (
      <div className="layout">
        <Navbar>
          <Navbar.Header>
            <p className="navbar-brand logo">Runes Analytics</p>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item>Twitter</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
        <div className="content">
          <TwitterDashboard></TwitterDashboard>
        </div>
      </div>
    );
  }
}


export default App;
