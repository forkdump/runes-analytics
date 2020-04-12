import React, { Component } from 'react';
import TwitterDashboard from './dashboards/TwitterDashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterUser: '',
      submitted: false 
    };
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ twitterUser: event.target.value, submitted: false })
  }   

  handleSubmit(event) {
    event.preventDefault(); 
    this.setState({ submitted: true })
  }

  renderTwitterDashboard() {
    return <TwitterDashboard userId={this.state.twitterUser}></TwitterDashboard>
  }

  render() {
    return (
      <div className="layout">
        <div className="header pure-menu pure-menu-horizontal">
            <p className="pure-menu-heading">Runes Analytics</p>
            <ul className="pure-menu-list">
                <li class="pure-menu-item"><a href="#" className="pure-menu-link">Twitter</a></li>
            </ul>
        </div>
        <div className="content">
          <form  className="pure-form twitter-form"
                onSubmit={this.handleSubmit}>
              <input type="text"
                    placeholder="Twitter Username"
                    name={this.state.twitterUser}  
                    className="pure-input-rounded twitter-form-input"
                    onChange={this.handleChange}  />
              <div className="twitter-form-btn">
                <input type="submit" className="button-success pure-button" value="Get" />
              </div>
          </form>
          {this.state.submitted && this.renderTwitterDashboard()}
        </div>
      </div>
    );
  }
}


export default App;
