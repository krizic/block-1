import { IPage } from "./intefaces/page";
import { Navigation } from "./navigation";
import { PageName } from "./models/page-name";
import { User } from "./api/models";
import { IUserView } from "./intefaces/user-view";

export class ListView implements IPage {

  constructor(
    private allUsers: IUserView[],
    private jquery: JQueryStatic,
    private changePage: (page: PageName) => void
  ) {
  }

  render = (): string => {
    const nav = new Navigation(this.jquery, this.changePage, PageName.detailPage);
    let result = "<ul class='list-group'>";
    this.allUsers
      .filter(user => user.liked)
      .map(user => {
        result += `<li class="list-group-item">${user.name.title} ${user.name.first} ${user.name.last}</li>`;
      });
    return `
      ${nav.render()}
      ${result}
      </ul>
      `;
  };
}
