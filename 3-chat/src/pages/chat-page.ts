import {IPage} from "./interfaces/page";
import {ChatService} from "../api/service";
import {IChat} from "../api/interface/chat";
import {AuthService} from "../services";

export class ChatPage implements IPage {
  public readonly name = "chat-page";
  private chatMsgs: IChat[] = [];

  constructor(
    private $: JQuery,
    private onChange: () => void,
    private chatService: ChatService
  ) {
    this.fetchData();
    this.chatService.syncChanges(this.onNewMessages);
    this.$.on("click", `#${this.name} .send_btn`, this.onMsgSubmit);
  }

  onMsgSubmit = () => {
    const msgSend: HTMLInputElement = this.$.find(
      `#${this.name}  textarea.type_msg`
    )[0] as HTMLInputElement;
    console.log(msgSend.value);

    if (msgSend.value) {
      console.log("there's a message");

      this.chatService
        .sendMessage({
          msg: msgSend.value,
          sender: AuthService.getUser(),
          timestamp: new Date().getTime()
        })
        .then(responce => {
          if (responce.ok) {
            this.fetchData();
          }
        });
    } else {
      console.log("there is no value");
    }
  };

  fetchData = (): void => {
    this.chatService.getAll().then(result => {
      this.chatMsgs = result.docs;
      this.onChange();
      console.log("Chats Reloaded!");
    });
  };

  onNewMessages = (): void => {
    this.fetchData();
  };

  render(): string {
    return `
    <section id="${this.name}">${this.chatTemplate()}</section>  
   `;
  }

  chatItemTemplate = (): string => {
    const template = this.chatMsgs.map(chat => {
      return `
        <div class="justify-content-start mb-4">
          <div class="msg_container">
            ${chat.msg} - (${chat.sender})
            <span class="msg_time">${new Date(
              chat.timestamp
            ).toLocaleTimeString()}</span>
          </div>
        </div>
        `;
    });
    return template.join("");
  };

  chatTemplate = () => {
    return `
    <div class="card">
      <div class="card-header">
      <div class="bd-highlight">
        <div class="card-header">
        Group Chat
        </div>
        <div class="userInfo>
          <p>55 Messages</p>
        </div>
        <div>
      </div>
      </div>
      <div class="card-body msg_card_body">
      ${this.chatItemTemplate()}
      </div>
      <div class="justify-content-end mb-4">
        <div class="card-footer">
        <div class="input-group">
          <textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
          <div class="input-group-append">
            <span class="input-group-text send_btn">Send</span>
          </div>
        </div>
      </div>
    </div>
    `;
  };
}
