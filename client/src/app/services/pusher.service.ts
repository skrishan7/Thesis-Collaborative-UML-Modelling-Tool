import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const Pusher: any;
@Injectable()
export class PusherService {
  channel;
  baseURL = 'http://localhost:3000/api/';
  
  constructor(private http: HttpClient) {
    const pusher = new Pusher('1043d15335fe067e14c8', {
      cluster: 'ap1',
    });
    this.channel = pusher.subscribe('painting');
  }
  
  public init() {
    return this.channel;
  }

  makeRequest(enco, id) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'uml', {
        encoded: enco,
        userId: id,
      }, { headers });
  }
}
