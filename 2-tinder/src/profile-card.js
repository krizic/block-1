export class ProfileCard {
  user;

  constructor(user) {
    this.user = user;
    console.log("ProfileCard User", this.user);
  }

  render = () => {
    return ` 
    <div id="profile-view">
    <div class="card">
      <div class="card-header">
      ${this.user.name.title} ${this.user.name.first} ${this.user.name.last} 
      </div>
      <img class="card-img-top" src="${this.user.picture.large}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">
        ${this.user.login.username}
        </h5>
        <p class="card-text">
        ${this.user.location.city}, ${this.user.location.state}, ${this.user.location.country}
        </p>
      </div>
    </div>
    </div>`;
  };
}
