import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

export default class TwitterChart extends PureComponent {

  handleChartClick(data) {
    const url = data.activePayload[0].payload.url;
    window.open(url, '_blank');
  }

  render() {
    return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart
        width={1200}
        height={400}
        data={this.props.dataToRender}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        onClick={this.handleChartClick}
      >
        <XAxis dataKey="date" interval="preserveStartEnd" />
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
          <p className="label" style={tooltipTextStyle}>{`${payload[0].payload.name}`}</p>
          <p className="favorites" style={tooltipTextStyle}> {`Favorites: ${payload[0].payload.favorites}`}</p>
          <p className="retweets" style={tooltipTextStyle}> {`Retweets: ${payload[0].payload.retweets}`}</p>
        </div>
      );
    }

    return null;
  }
}