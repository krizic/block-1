import { IPage } from "./interfaces/page";
import { ChatService } from "./../api/service";
import "./chat-page.css";
import { IChat, IFindChatResponse } from "../api/interface/chat";

export class ChatPage implements IPage {

  messages: IChat[];

  constructor(private $: JQuery) {
    ChatService.getAll().then(result => {
      this.messages = result.docs;
      this.render();
    });

    
  }

  render = (): string => {
    console.log("render");
    console.log(this.messages);
    let result = "<ul class='list-group'>";
    // this.messages
    //   .map(message => {
    //     result += `<li class="list-group-item othermessage" id="${message._id} ">${message.sender} <br/> ${message.msg}}</li>`;
    //   });
    result += `</ul>`;
    return `${result}`;

  }
}