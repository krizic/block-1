import {IFindChatResponse, IChat} from "../interface/chat";
import PouchDB from "pouchdb";

export class ChatService {
  private static instance: ChatService;
  private readonly sync: PouchDB.Database<{}>;

  private readonly apiUrl = "http://home.vkrizic.com:5984/test"

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }

  constructor() {
    this.sync = new PouchDB(this.apiUrl);
  }

  getAll(): Promise<IFindChatResponse> {
    return fetch(`${this.apiUrl}/_find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({selector: {}})
    }).then((response: Response) => {
      return response.json();
    });
  }

  sendMessage(message: IChat): Promise<Response> {
    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
  }

  syncChanges(onChange: () => any): void {
    this.sync.changes({
      since: 'now',
      live: true
    }).on('change', (change) => {
      console.log("change reported")
      onChange();
    });
  }
}
