const TWEETS_URL = "/api/v1/tweets/";
const TWITTER_DOMAIN = 'https://twitter.com/';

export default class TwitterClient {

  static async getTweets(username) {
    if (!username) {
      return [];
    }
    const response = await fetch(TwitterClient.getTweetsApiUrl() + username);
    const data = await response.json()
    const tweets = await TwitterClient.transformTweets(username, data);
    return tweets;
  }

  static transformTweets(username, data) {
    if (!data || data.error || data.errors) {
      return [];
    }
    return data
      .map(tweet => {
        const createdDate = new Date(tweet.created_at);
        return {
          date: createdDate,
          dateStr: createdDate.toLocaleDateString("en-US"),
          name: tweet.text,
          url: TwitterClient.getTweetUrl(username, tweet.id_str),
          retweets: tweet.retweet_count,
          favorites: tweet.favorite_count,
        }
      })
      .sort((a, b) => a.date - b.date);
  }

  static getTweetsApiUrl() {
    return process.env.REACT_APP_RUNES_API_DOMAIN + TWEETS_URL;
  }

  static getTweetUrl(username, tweetId) {
    return TWITTER_DOMAIN + username + '/status/' + tweetId;
  }
}