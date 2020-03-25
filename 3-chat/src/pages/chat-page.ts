import { IPage } from "./interfaces/page";

export class ChatPage implements IPage {

  public readonly name = "chat-page";

  constructor(private $: JQuery){
    this.$.on("click", `#${this.name} .send_btn`, this.onMsgSubmit);
  }

  onMsgSubmit = () => {
    const msgSend: HTMLInputElement = this.$.find(`#${this.name}  textarea.type_msg`)[0] as HTMLInputElement;
    console.log(msgSend.value);
    
    if (msgSend.value) {
      console.log("there's a message");
      // redirection
    } else {
      console.log("there is no value");
    }
  }

  render(): string {
    return `
    <section id="${this.name}>${this.chatTemplate()}</section>  
   `;
  } 
  

  chatTemplate = () => {
    return `
    <div class="card">
      <div class="card-header">
      <div class="d-flex bd-highlight">
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
      <div class="d-flex justify-content-start mb-4">
        <div class="msg_container">
          Hallo, how are you?
          <span class="msg_time">13:10 PM, Today</span>
        </div>
      </div>
      <div class="d-flex justify-content-end mb-4">
        <div class="msg_container_send">
          Hallo I'm good and you?
          <span class="msg_time_send">13:12 PM, Today</span>
        </div>
        <div class="d-flex justify-content-start mb-4">
        <div class="msg_container">
          what are you doing?
          <span class="msg_time">13:13 PM, Today</span>
        </div>
      </div>
      <div class="d-flex justify-content-end mb-4">
        <div class="msg_container_send">
          i'm taking a break.
          <span class="msg_time_send">13:14 PM, Today</span>
        </div>
        <div class="card-footer">
        <div class="input-group">
          <textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
          <div class="input-group-append">
            <span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}