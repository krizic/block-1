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
    this.currentPage = AuthService.isUserKnown() ? new ChatPage() : new StartPage(this.rootSelector$);
    this.render();
  }

  changePage(newPage: IPage): void {
    this.currentPage = newPage;
  }

  render(): void {
    this.$(this.rootSelector).html(this.currentPage.render());
  }
}
