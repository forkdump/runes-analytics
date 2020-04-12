import React, { Component } from 'react';
import TwitterDashboard from './dashboards/TwitterDashboard';

class App extends Component {

  renderTwitterDashboard() {
    return 
  }

  render() {
    return (
      <div className="layout">
        <div className="header pure-menu pure-menu-horizontal">
            <p className="pure-menu-heading">Runes Analytics</p>
            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Twitter</a></li>
            </ul>
        </div>
        <div className="content">
        <TwitterDashboard></TwitterDashboard>
        </div>
      </div>
    );
  }
}


export default App;
