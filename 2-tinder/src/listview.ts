
import { IPage } from "./intefaces/page";
import { IUserView } from "./intefaces/user-view";

export class ListView implements IPage {

    allUsers: IUserView[];
  
    constructor(allUsers) {
      this.allUsers = allUsers;
    }
  
    render() {
      let result = "<ul class='list-group'>";
      this.allUsers
        //.map(user => console.log(user))
        .filter(user => user.liked && user.liked == true)
        .map(user => {
          result += `<li class="list-group-item">${user.name.title} ${user.name.first} ${user.name.last}</li>`;
        });
      return result + "</ul>";
    }
}  