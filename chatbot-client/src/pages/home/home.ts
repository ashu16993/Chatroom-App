import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatbotProvider } from '../../providers/chatbot/chatbot';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message: string;
  messages: string[] = [];
  name: string;
  input:string;
  constructor(public navCtrl: NavController, private chatbotProvider : ChatbotProvider) {
    
  }
  check_name(): boolean{
    // console.log(this.name)
    if (this.name==undefined)
      return true
    else return false
  }
  setName(){
    this.name = this.input
  }
  sendMessage() {
    console.log(this.message)
    let msg = {
      author: this.name,
		  message: this.message
    }
    this.chatbotProvider.messages.next(msg);
    this.message = '';
  }
  ngOnInit() {
    this.chatbotProvider.messages.subscribe(msg => {
      console.log("Response from websocket: " + JSON.stringify(msg));
      this.messages.push(msg.author+":"+msg.message)
		});
  }
}
