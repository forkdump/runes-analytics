import React from 'react';
import { render, fireEvent, waitFor, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import TwitterDashboard from './TwitterDashboard';
import { act } from 'react-dom/test-utils';

test('it should render Twitter dashboard with empty message and disabled controls', () => {
    const { container, getByText } = render(<TwitterDashboard />);
    expect(container.querySelector(".twiter-dashboard-content")).toBeInTheDocument();
    // expect(getByText(/asfasfas/)).toBeInTheDocument();
    expect(container.querySelector(".empty-twitter-data")).toBeInTheDocument();
    expect(container.querySelector(".max-tweets-selector.rs-picker-disabled")).toBeInTheDocument();
    expect(container.querySelector(".tweets-daterange-picker.rs-picker-disabled")).toBeInTheDocument();
});

test('it should render Twitter Chart when a username is submitted', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
            json: () => Promise.resolve(getMockTwitterData()),
        });
    });
    const { container } = render(<TwitterDashboard />);
    const twitterUsernameInput = container.querySelector('.twitter-username');
    fireEvent.change(twitterUsernameInput, {
        target: { value: 'test-user' },
    });
    expect(twitterUsernameInput.value).toBe('test-user');
    fireEvent.click(container.querySelector(".twitter-user-submit"));
    await waitFor(() => {
        expect(container.querySelector(".recharts-line")).toBeInTheDocument();
    });
    // remove the fetch mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

function getMockTwitterData() {
    return [
        {
            created_at: new Date().toString(),
            text: 'test tweet',
            id_str: 'tweet_id',
            retweet_count: 5,
            favorite_count: 5
        }
    ];
}