require('dotenv').config();
const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweet.js');
var Twitter = require('twitter');
var bodyParser = require('body-parser');

//show tweets
router.get('/show',(req,res,next) => {
	Tweet.find({}, null, {sort: {created_at: -1}}, (err, tweets) => {
		console.log('fetching');
		if(err){
			return res.send({
				success: flase,
				message: 'failed to retrive tweet'
			});
		}
		return res.send({
			success: true,
			tweets
		});
	});
});

router.post('/add',(req,res,next) => {
	let newTweet = new Tweet({
		tweet_id: req.body.tweet_id,
		created_at: Date(),
		username: req.body.username,
		tweet: req.body.tweet
	});

	newTweet.save( (err, user) => {
		if(err){
			return res.send({
				success: flase,
				message: 'failed to save tweet'
			});
		}
		return res.send({
			success: true,
			message: 'Tweet Saved',
			user
		});
	});
});

router.post('/webhook', function (req, res) {

	if(req.body.event !== undefined && req.body.event.text !== undefined){
		console.log(req.body.event.text);
	  	var text = req.body.event.text;
	  	var arr_text = text.split(' ');
	  	if (arr_text.indexOf("go") > -1){
	  		console.log('go get tweets');
	  		fetch_tweets();
	  	}
	  	else{
	  		console.log('do not go');
	  	}
	  	console.log('==================');
	}
  	res.send(req.body.challenge)
})

function fetch_tweets () {
	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var params = {
	    screen_name: 'FictionFone'
	};
	client.get('statuses/user_timeline.json', params, function (err, tweets, response) {
		console.log("Retrieved " + tweets.length + " tweets from " + params.screen_name);
		tweets.forEach(function(tweet) {
		  	console.log(tweet.id_str);
		  	console.log(tweet.created_at);
		  	console.log(tweet.text);
		  	console.log(tweet.user.name);
		  	console.log('---------------------');

		  	Tweet.findOne({tweet_id: tweet.id_str}, function(err, tweet_find){
		  		if (err)
		  			console.log('failed to find tweet');

			  	if(!tweet_find){
				  	let newTweet = new Tweet({
						tweet_id: tweet.id_str,
						created_at: tweet.created_at,
						username: tweet.user.name,
						tweet: tweet.text
					});

					newTweet.save( (err, user) => {
						if(err)
							console.log('failed to save tweet');
						else
							console.log('Tweet Saved');
					});
			  	}
			  	else
			  		console.log('tweet inserted before');
			});
		});
	});
}

module.exports = router;