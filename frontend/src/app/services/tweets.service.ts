import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TweetsService {

  constructor(private _http :Http) { }

  saveTweet(tweet) {
    return this._http.post('tweets/add', tweet)
      .map(resp => resp.json());
  }

  getTweets(query) {
    return this._http.get('http://localhost:3000/tweets/show',query)
      .map(resp => resp.json());
  }
}
