import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

export default class TwitterChart extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChartClick = this.handleChartClick.bind(this);
  }

  handleChartClick(data) {
    console.log(data);
    if (!this.isClickValid(data)) {
      return;
    }
    const url = data.activePayload[0].payload.url;
    window.open(url, '_blank');
  }

  isClickValid(data) {
    return data 
        && data.activePayload 
        && data.activePayload.length > 0 
        && data.activePayload[0].payload 
        && data.activePayload[0].payload.url;
  }

  render() {
    return (
    <ResponsiveContainer width="95%" height={500} aspect={3}>
      <LineChart
        data={this.props.tweets}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        onClick={this.handleChartClick}
      >
        <XAxis dataKey="dateStr" interval="preserveStartEnd" />
        <YAxis />
        <Tooltip content={<TwitterTooltip/>}/>
        <Legend />
        <Line type="monotone" dataKey="favorites" stroke="#82ca9d" />
        <Line type="monotone" dataKey="retweets" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    );
  }
}

class TwitterTooltip extends PureComponent{
  
  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      if (!payload || payload.size === 0) {
        return null;
      }
      const tweet = payload[0].payload;
      const tooltipStyle = {
        backgroundColor: '#b5e3ff',
        borderRadius: '10px',
        opacity: 0.5,
        padding: '15px',
        maxWidth: '350px'
      };
      const tooltipTextStyle = {
        fontWeight: 'bold'
      };
      return (
        <div className="twitter-tooltip" style={tooltipStyle}>
          <p className="label" style={tooltipTextStyle}>{`${tweet.name}`}</p>
          <p className="favorites" style={tooltipTextStyle}> {`Favorites: ${tweet.favorites}`}</p>
          <p className="retweets" style={tooltipTextStyle}> {`Retweets: ${tweet.retweets}`}</p>
        </div>
      );
    }

    return null;
  }
}