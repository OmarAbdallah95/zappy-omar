const mongoose = require('mongoose');

const TweetsSchema = mongoose.Schema({
	tweet_id: { type: String, required: true },
	created_at: { type: Date, required: true },
	username: { type: String, required: true },
  	tweet: { type: String, required: true }
});

const Tweet = mongoose.model('Tweet', TweetsSchema);

module.exports = Tweet;