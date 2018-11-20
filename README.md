# Zappy - The Pain Killer App

Simple App fetch tweets from Twitter account based on Slack Workspace and store them in mongoDB and show them using Angular

### Stack Used in this applcation
  - NodeJS
  - ExpressJS
  - MongoDB
  - Angular4

### Very important Notes

- Slack need a domain to publish the messages to it, so i used `ngrok` to generate a domain that forwards to my `localhost`
```
npm install -g ngrok
```

- after installation use this command to generate the https url to and put it in your slack app to handshake with slack
```
ngrok http 3000
```

- app port must be equal to ngrok port to make the forwarding success
- contact with me to send me your ngrok url if you want to use my `Slack App`


### Setting up & Installation Locally
1- clone this repository and run npm install to install dependencies in node and angular 
```
npm install
```

2- create .env file in the root directory and add the Database and Port settings and twitter Tokens
example (file .env):
```
DATABASE=mongodb://localhost:27017/zappy
PORT=3000
TWITTER_CONSUMER_KEY=YOUR_TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET=YOUR_TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN_KEY=YOUR_TWITTER_ACCESS_TOKEN_KEY
TWITTER_ACCESS_TOKEN_SECRET=YOUR_TWITTER_ACCESS_TOKEN_SECRET 
```

3- Start the MongoDB using ``mongod ``
```
mongod
```

4- Start the back-end server using npm start or ``nodemon ``
```
node server
```

5- Start the angular server
```
cd frontend
ng serve
```

6- You Should install `Mocha` globally to run mocha from the terminal to test the app.
```
cd root_directory
npm install -g mocha@2.3.1
```
