import { ChatPage } from "./chat-page";
import { StartPage } from "./start-page";
import { IPage } from "./interfaces/page";

export class ViewController {
  currentPage: IPage;
  rootSelector: string = "#root";

  constructor(private jQuery: JQueryStatic) {
    this.currentPage = new StartPage();
    this.render();
  }

  changePage(newPage: IPage): void {
    this.currentPage = newPage;
  }

  render(): void {
    this.jQuery(this.rootSelector).html(this.currentPage.render());
  }
}
