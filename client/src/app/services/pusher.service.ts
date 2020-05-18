import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const Pusher: any;
@Injectable()
export class PusherService {
  channel: any;
  baseURL = 'http://localhost:3000/';
  // pusher: any;

  constructor(private http: HttpClient) {
    const pusher = new Pusher('1043d15335fe067e14c8', {
      cluster: 'ap1',
    });
    this.channel = pusher.subscribe('UML');
    // pusher.bind('typing', function(data) {
    //    console.log('hereee');
    //    console.log(data);
    // });
  }
  
  init() {
    return this.channel;
  }

  makeRequest(enco, id) {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'pusherevent', {
      encoded: enco,
      userId: id,
    });
  }
}
