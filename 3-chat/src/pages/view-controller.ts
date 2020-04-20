import { ChatPage } from "./chat-page";
import { StartPage } from "./start-page";
import { IPage } from "./interfaces/page";
import { AuthService } from '../services';
import { PageEnum } from '../constants';
import { ChatService } from '../api/service';

export class ViewController {
  currentPage: PageEnum;
  rootSelector: string = "#root";
  rootSelector$: JQuery;
  chatService: ChatService = ChatService.getInstance();

  private pages: IPage[];

  constructor(private $: JQueryStatic) {
    this.rootSelector$ = $(this.rootSelector);

    this.pages = [
      new StartPage(this.rootSelector$, this.changePage),
      new ChatPage(this.rootSelector$, this.onChildChange, this.chatService)
    ]

    this.currentPage = AuthService.isUserKnown() ? PageEnum.ChatPage : PageEnum.StartPage;
    this.render();
  }

  changePage = (newPage: PageEnum): void => {
    this.currentPage = newPage;
    this.render();
  }

  onChildChange = () => {
    this.render();
  }

  render(): void {
    this.$(this.rootSelector).html(this.pages[this.currentPage].render());
  }
}
