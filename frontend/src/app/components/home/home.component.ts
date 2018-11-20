import { Component, OnInit } from '@angular/core';

import { TweetsService } from '../../services/tweets.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets :any;

  constructor(
    private _tweetService :TweetsService,
  ) { }

  ngOnInit() {
    this._fetchTweets();
  }

  fetchTweetsWithoutSlack(){
    this._fetchTweets();
  }

  private _fetchTweets() {
    console.log('fetch');
    const query = {};
    this._tweetService.getTweets(query).subscribe(
      resp => {
        this.tweets = resp.tweets;
      }
    )
  }

}
