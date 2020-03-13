import {DetailView} from "./detail-view";
import {ListView} from "./listview";
import { IPage } from "./intefaces/page";
import { IUserView } from "./intefaces/user-view";
import { UserResponseObject } from "./api/models";
import { PageName } from "./models/page-name";


export class ViewController {
  jquery: JQueryStatic;
  root$ : any;
  pages : IPage[];
  allUsers: IUserView[];
  currentUser : number = 0;
  currentPage: PageName = PageName.detailPage;


  constructor(jquery : JQueryStatic) {
    this.jquery = jquery;
    this.root$ = this.jquery("#root");
    this.getUsers(100).then(users => {
      this.allUsers = users.results;
      this.mount();
    });
  }

  changePage = (pageName: PageName):void =>  {
    this.currentPage = pageName;
    this.mount();
  }

  incrementIndex (): void {
    this.currentUser++;
  }

  refresh = (liked: boolean): void => {
    this.allUsers[this.currentUser].liked = liked;
    this.incrementIndex();
    this.mount();
  };

  mount = (): void => {
    this.pages = [
      new DetailView(
        this.jquery,
        this.allUsers[this.currentUser],
        this.refresh,
        this.changePage
      ),
      new ListView(this.allUsers, this.jquery, this.changePage)
    ];

    this.root$.html(`
        ${this.pages[this.currentPage].render()}
      `);
  };

  getUsers(amount): Promise<UserResponseObject> {
    return fetch(`https://randomuser.me/api/?results=${amount}`).then(
      response => {
        return response.json();
      }
    );
  }
}
