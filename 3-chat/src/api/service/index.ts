import { IFindChatResponse } from "../interface/chat";

export class ChatService {
  static getAll(): Promise<IFindChatResponse> {
    return fetch("http://localhost:5984/test/_find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({selector: {}})
    }).then((response: Response) => {
      return response.json();
    });
  }
}
