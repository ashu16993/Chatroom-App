import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {

  constructor() {
    console.log('Hello WebsocketProvider Provider');
  }
  private url = 'ws://localhost:8888/websocket';

  private subject: Rx.Subject<MessageEvent>;

  public connect(): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(this.url);
      console.log("Successfully connected: " + this.url);
    } 
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
    (obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    })
    let observer = {
        next: (data: Object) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }
      }
    return Rx.Subject.create(observer, observable);
  }
}
