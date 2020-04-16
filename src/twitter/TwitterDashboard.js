import React, { Component } from 'react';
import { DateRangePicker, SelectPicker, Message, Button, Input, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import './TwitterDashboard.css';
import TwitterChart from './TwitterChart';
import TwitterClient from './TwitterClient'

const {
  allowedRange
} = DateRangePicker;

const ENTER_KEY_CODE = 13;
const MAX_TWEETS_COUNT = "200";
const MAX_TWEETS_LIST = [
  { label: 10, value: "10" },
  { label: 25, value: "25" },
  { label: 50, value: "50" },
  { label: 100, value: "100" },
  { label: 200, value: "200" }
];

class TwitterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterUser: '',
      tweets: [],
      tweetsToRender: [],
      selectedMaxTweetsCount: null,
      selectedStartDate: null,
      selectedEndDate: null,
      maxStartDate: null,
      maxEndDate: null
    };
    this.handleTwitterUserChange = this.handleTwitterUserChange.bind(this);
    this.handleTwitterUserKeyPress = this.handleTwitterUserKeyPress.bind(this);
    this.handleTwitterUserSubmit = this.handleTwitterUserSubmit.bind(this);
    this.handleDateRangeSelect = this.handleDateRangeSelect.bind(this);
    this.handleMaxTweetsChange = this.handleMaxTweetsChange.bind(this);
    this.isTweetInSelectedDateRange = this.isTweetInSelectedDateRange.bind(this);
  }

  handleTwitterUserChange(twitterUser) {
    this.setState({
      twitterUser: twitterUser
    });
  }

  handleTwitterUserKeyPress(key) {
    if (key.charCode === ENTER_KEY_CODE) {
      this.handleTwitterUserSubmit();
    }
  }

  handleTwitterUserSubmit(event) {
    event && event.preventDefault();
    TwitterClient.getTweets(this.state.twitterUser)
      .then((tweets) => {
        const tweetsDateRange = this.getTweetsDateRange(tweets);
        this.setState({
          tweets: tweets,
          selectedMaxTweetsCount: tweets.length > 0 ? MAX_TWEETS_COUNT : null,
          maxStartDate: tweetsDateRange.startDate,
          maxEndDate: tweetsDateRange.endDate,
          selectedStartDate: tweetsDateRange.startDate,
          selectedEndDate: tweetsDateRange.endDate
        }, () => {
          this.filterTweetsToRender()
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleMaxTweetsChange(maxTweetsCount) {
    this.setState({ selectedMaxTweetsCount: maxTweetsCount }, () => {
      this.filterTweetsToRender();
    });
  }

  handleDateRangeSelect(dateRange) {
    // dateRange time is 00:00:00, quick fix to include the endDate tweets:
    dateRange[1].setHours(23, 59, 59, 999);
    this.setState({ selectedStartDate: dateRange[0], selectedEndDate: dateRange[1] }, () => {
      this.filterTweetsToRender()
    });
  }

  getTweetsDateRange(tweets) {
    if (tweets.length === 0) {
      return { startDate: null, endDate: null };
    }
    return { startDate: tweets[0].date, endDate: tweets.slice(-1)[0].date };
  }

  isTweetInSelectedDateRange(tweet) {
    return Date.parse(tweet.date) >= this.state.selectedStartDate
      && Date.parse(tweet.date) <= this.state.selectedEndDate;
  }

  filterTweetsToRender() {
    const filteredTweets = this.state.tweets
      .filter(this.isTweetInSelectedDateRange)
      .slice(-this.state.selectedMaxTweetsCount);
    this.setState({
      tweetsToRender: filteredTweets
    });
  }

  renderTwitterChart() {
    return <TwitterChart tweets={this.state.tweetsToRender}></TwitterChart>;
  }

  renderNoTweetsMessage() {
    return (
      <div className="empty-twitter-data">
        <Message type="error" description="No tweets." />
      </div>
    );
  }

  render() {
    return (
      <div className="twiter-dashboard-content">
        <div className="twitter-dashboard-controls">
          <Input
            className="twitter-username"
            placeholder="Twitter Username"
            onChange={this.handleTwitterUserChange}
            onKeyPress={this.handleTwitterUserKeyPress} />
          <Button className="twitter-user-submit" onClick={this.handleTwitterUserSubmit}>
            <Icon icon="trend" />
          </Button>
          <SelectPicker
            className="max-tweets-selector"
            searchable={false}
            cleanable={false}
            placeholder="Max Tweets"
            disabled={this.state.tweets.length === 0}
            data={MAX_TWEETS_LIST}
            onChange={this.handleMaxTweetsChange}
            value={this.state.selectedMaxTweetsCount} />
          <DateRangePicker
            format="MM/DD/YYYY"
            placeholder="Chart Timeline"
            className="tweets-daterange-picker"
            showOneCalendar={true}
            cleanable={false}
            disabled={this.state.tweets.length === 0}
            disabledDate={allowedRange(this.state.maxStartDate, this.state.maxEndDate)}
            value={[this.state.selectedStartDate, this.state.selectedEndDate]}
            onChange={this.handleDateRangeSelect}
          />
        </div>
        {this.state.tweetsToRender.length > 0 && this.renderTwitterChart()}
        {this.state.tweetsToRender.length === 0 && this.renderNoTweetsMessage()}
      </div>
    );
  }
}

export default TwitterDashboard;
