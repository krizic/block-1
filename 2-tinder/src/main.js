// Waiting for jQuery to initialize
$(document).ready(function() {

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // https://randomuser.me/

    fetch("https://randomuser.me/api/?results=200")
    .then((responce) => {
        return responce.json();
    })
    .then((data) => {
      allUsers = data;

    //   data.results.forEach((user) => {
    //       new ProfileCard($, user);
    //   });

    new ProfileCard($, data.results[0]); 
   
    new ProfileLike($, data.results[0]);

});
})

class ProfileCard {
  $;
  user;

  constructor(jquery, user){
    this.$ = jquery;
    this.user = user;
    this.render();

    console.log("User", this.user);
  }
  
  render(){
    this.$("div#profile-view").append(
      ` <div class="card">
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
    </div>`
    )
  }
}

class ProfileLike {
    $;
    LIKE_BUTTON = 'button#like';
    UNLIKE_BUTTON = 'button#unlike';

    constructor(status){
        this.$ = status;
        this.likeInit();
        this.unlikeInit();
    }

    likeInit() {
        this.$(this.LIKE_BUTTON).on('click', e => {
            $('.output').html(function(i, val) {
                return val*1+1;
              });  
        });
    }

    unlikeInit() {
        this.$(this.UNLIKE_BUTTON).on('click', e => {
/*             $('.minus-output').html(function(i, val) {
                return val*1-1;
              });  */ 
        });
    }
    
}