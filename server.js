require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');

// initialize app with express
const app = express();

const TweetsRouter = require('./routes/tweets');

// DB connection
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true });
mongoose.connection.on('connected',() => {
	console.log('connected to the server');
});
mongoose.connection.on('error',(err) => {
	console.log('there is an error ' + err);
})

const _PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(path.join(_dirname,'public')));

// routes
app.get('/', (req,res,next) => {
	res.send('i am alive');
});

app.use('/tweets', TweetsRouter);

// start the server
app.listen(_PORT, () => {
	console.log('server started');
});

module.exports = app;