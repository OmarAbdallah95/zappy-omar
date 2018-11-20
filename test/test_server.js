var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Tweets', function(){
  	it('should list ALL Tweets on /tweets/show GET', function(done){
	  	chai.request(server)
		.get('/tweets/show')
		.end(function(err, res){
		    res.should.have.status(200);
		    res.should.be.json;
		    res.body.success = true;
		    res.body.tweets.should.be.a('array');
		    done();
		});
	});
	
  	it('should add a SINGLE Tweet on /tweets/add POST', function(done) {
  		chai.request(server)
    	.post('/tweets/add')
    	.send({
				"tweet_id": "123456",
				"created_at": "123456",
				"username": "test user",
				"tweet": "test tweet"
		})
    	.end(function(err, res){
      		res.should.have.status(200);
		    res.should.be.json;
		    res.body.success = true;
      		res.body.message.should.equal('Tweet Saved');
      		done();
    	});
	});
});