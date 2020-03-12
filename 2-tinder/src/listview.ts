
import { IPage } from "./intefaces/page";

export class ListView implements IPage {
    allUsers : any;
  
    constructor(allUsers : any) {
      this.allUsers = allUsers;
    }
  
    render = (): string => {
      let result = "<ul class='list-group'>";
      this.allUsers
        .map(user => console.log(user))
        .filter(user => user && user.like && user.like == false)
        .map(user => {
          result += `<li class="list-group-item">${user.name.title} ${user.name.first} ${user.name.last}</li>`;
        });
      return result + "</ul>";
    }
}  