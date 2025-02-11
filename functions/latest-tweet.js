const Twitter = require("twitter-v2");

exports.handler = async (event, context, callback) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const { data, includes } = await client.get(
    `users/956831071982800896/tweets`,
    {
      expansions: ["attachments.media_keys"],
      exclude: ["replies", "retweets"],
      tweet: {
        fields: [
          "id",
          "created_at",
          "text,author_id",
          "in_reply_to_user_id",
          "referenced_tweets",
          "attachments",
          "withheld",
          "geo",
          "entities",
          "public_metrics",
          "possibly_sensitive",
          "source",
          "lang",
          "context_annotations",
          "conversation_id",
          "reply_settings",
        ],
      },
      media: {
        fields: [
          "media_key",
          "duration_ms",
          "height",
          "preview_image_url",
          "type",
          "url",
          "width",
          "public_metrics",
          "non_public_metrics",
          "organic_metrics",
          "promoted_metrics",
          "alt_text",
        ],
      },
    }
  );

  callback(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify({
      id: data[0].id,
      tweet_text: data[0].text,
      image: includes?.media[0].url
        ? includes?.media[0].url
        : includes?.media[0].preview_image_url,
      all_tweets: data,
    }),
  });
};
