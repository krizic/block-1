import {DetailView} from './detail-view';
import {ListView} from './list-view';
import {Navigation} from './navigation';

export class ViewController {
  jquery;
  root$;
  pages;
  allUsers;
  pageName = {
    detailPage: 0,
    listPage: 1
  };
  currentUser = 0;
  currentPage = this.pageName.detailPage;

  constructor(jquery) {
    this.jquery = jquery;
    this.root$ = this.jquery("#root");
    this.getUsers(100).then(users => {
      this.allUsers = users.results;

      this.mount();
    });
  }

  incrementIndex() {
    this.currentUser++;
  }

  refresh = liked => {
    this.allUsers[this.currentUser].liked = liked;
    this.incrementIndex();
    this.mount();
  };

  mount = () => {
    this.pages = [
      new DetailView(
        this.jquery,
        this.allUsers[this.currentUser],
        this.refresh
      ),
      new ListView(this.allUsers)
    ];

    const nav = new Navigation(this.jquery);
    this.root$.html(`
      ${nav.render()}
      ${this.pages[this.currentPage].render()}
    `);
  };

  getUsers(amount) {
    return fetch(`https://randomuser.me/api/?results=${amount}`).then(
      response => {
        return response.json();
      }
    );
  }
}


