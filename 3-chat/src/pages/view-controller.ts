import { ChatPage } from "./chat-page";
import { StartPage } from "./start-page";
import { IPage } from "./interfaces/page";
import { AuthService } from '../services';

export class ViewController {
  currentPage: IPage;
  rootSelector: string = "#root";
  rootSelector$: JQuery;

  constructor(private $: JQueryStatic) {
    this.rootSelector$ = $(this.rootSelector);
    this.currentPage = AuthService.isUserKnown() ? new ChatPage(this.rootSelector$) : new StartPage(this.rootSelector$, this.goToPageChat);
    this.render();
  }

  goToPageChat = (): void => {
    this.currentPage = new ChatPage(this.rootSelector$);
    this.render();
  }


  render(): void {
    this.$(this.rootSelector).html(this.currentPage.render());
  }
}
