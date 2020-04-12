import React, { Component } from 'react';
import TwitterChart from '../charts/TwitterChart';

class TwitterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        requestCompleted: false,
        twitterUser: '',
        userSubmitted: false,
        dataToRender: []
    };
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ twitterUser: event.target.value, userSubmitted: false, requestCompleted: false })
  }   

  handleSubmit(event) {
    event.preventDefault();
    this.callApi();
    this.setState({ userSubmitted: true })
  }

  callApi() {
      const apiUrl = process.env.REACT_APP_RUNES_API_DOMAIN + "/api/v1/tweets/" + this.state.twitterUser;
      fetch(apiUrl)
          .then(response => response.json())
          .then(response => this.setState({dataToRender: this.transformData(response), requestCompleted: true}));
  }

  transformData(data) {
    return data
      .map(record => {
        const createdDate = new Date(Date.parse(record.created_at));
        return {
          date: createdDate.toLocaleDateString("en-GB"),
          name: record.text,
          url: 'https://twitter.com/' + this.props.userId + '/status/' + record.id_str,
          retweets: record.retweet_count, 
          favorites: record.favorite_count, 
        }
      })
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  renderTwitterChart() {
    return <TwitterChart dataToRender={this.state.dataToRender}></TwitterChart>;
  }

  render() {
    return (
    <div>
      <div>
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
      </div>
      {this.state.userSubmitted && this.state.requestCompleted && this.renderTwitterChart()}
    </div>
    );
  }
}

export default TwitterDashboard;
