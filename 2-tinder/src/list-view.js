export  class ListView {
    allUsers;
  
    constructor(allUsers) {
      this.allUsers = allUsers;
    }
  
    render() {
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