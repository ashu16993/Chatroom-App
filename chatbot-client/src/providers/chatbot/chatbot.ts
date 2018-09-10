import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketProvider } from '../websocket/websocket';

/*
  Generated class for the ChatbotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Message {
	author: string,
	message: string
}


@Injectable()
export class ChatbotProvider {
  public messages: Subject<Message>;

	constructor(wsService: WebsocketProvider) {
		this.messages = <Subject<Message>>wsService
			.connect()
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author: data.author,
					message: data.message
				}
			});
	}
  






  // private socket;    
  // private ws;
  // constructor() {
  //     this.socket = this.create(this.url);
  // }

  // private create(url): Rx.Subject<MessageEvent> {
  //   this.ws = new WebSocket(url);

  //   let observable = Rx.Observable.create(
  //     (obs: Rx.Observer<MessageEvent>) => {
  //       this.ws.onmessage = obs.next.bind(obs);
  //       this.ws.onerror = obs.error.bind(obs);
  //       this.ws.onclose = obs.complete.bind(obs);
  //       return this.ws.close.bind(this.ws);
  //     })
  //   // let observer = {
  //   //   next: (data: Object) => {
  //   //     if (this.ws.readyState === WebSocket.OPEN) {
  //   //       this.ws.send(JSON.stringify(data));
  //   //     }
  //   //   }
	//   // }
	//   return Rx.Subject.create(observable);
  // }
  // public sendMessage(message) {
  //   this.socket.emit('message',message);
  // }

  // public getMessages = () => {
  //   return Observable.create((observer) => {
  //     this.socket.on('message',(message)=>{
  //       console.log("message aaya",message)
  //       observer.next(message);
  //     });
  //       // this.socket.on('reply', (message) => {
  //       //     console.log("reply aaya",message)
  //       //     observer.next(message);
  //       // });
  //   });
  // }

}
