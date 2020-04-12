import React, { Component } from 'react';
import TwitterChart from '../charts/TwitterChart';

class TwitterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        chartData: [], 
        requestCompleted: false,
    };
  }

  callAPI() {
      console.log(this.props.userId);
      const apiUrl = process.env.REACT_APP_RUNES_API_DOMAIN + "/api/v1/tweets/" + this.props.userId;
      fetch(apiUrl)
          .then(res => res.json())
          .then(res => this.setState({chartData: this.createDataPoints(res), requestCompleted: true}));
  }

  createDataPoints(data) {
    console.log(data);
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

  componentDidMount() {
      this.callAPI();
  }

  renderTwitterChart() {
    return <TwitterChart chartData={this.state.chartData}></TwitterChart>;
  }

  render() {
    return (
      <div>
        {this.state.requestCompleted && this.renderTwitterChart()}
      </div>
    );
  }
}

export default TwitterDashboard;
