import React from 'react';
import { render, fireEvent, act, waitFor, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import TwitterChart from './TwitterChart';

test('it should render Twitter chart', () => {
  const { container, getByText } = render(<TwitterChart tweets={getMockChartData()} />);
  expect(container.querySelector(".recharts-line")).toBeInTheDocument();
  expect(getByText(/04\/01\/2020/)).toBeInTheDocument();
  expect(getByText(/04\/10\/2020/)).toBeInTheDocument();
});

function getMockChartData() {
  return [
    {
      dateStr: '04/01/2020',
      name: 'test tweet',
      retweets: 5, 
      favorites: 15, 
      url: 'test'
    },{
      dateStr: '04/10/2020',
      name: 'tweet 2',
      retweets: 54, 
      favorites: 2, 
      url: 'test 2'
    },
  ];
}