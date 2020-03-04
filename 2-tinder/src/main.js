// Waiting for jQuery to initialize
$(document).ready(function() {

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // https://randomuser.me/

    fetch("https://randomuser.me/api/?results=200")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      allUsers = data;

    //   data.results.forEach((user) => {
    //       new ProfileCard($, user);
    //   });
    const currentProfile = new ProfileCard($, data.results[0]);  
    const profileLike = new ProfileLike($); 
/*     $(profileLike).on('click', e => {  */
     $('#like').on('click', e => { 
       return $('div#profile-view').append(currentProfile);
      });
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
/*     status = {
    LIKE : 0,
    UNLIKE: 1
    } */
    LIKE_BUTTON = 'button#like';
    DISLIKE_BUTTON = 'button#dislike';

    constructor(status){
        this.$ = status;
        this.likeInit();
        this.dislikeInit();
    }

    likeInit() {
        this.$(this.LIKE_BUTTON).on('click', e => {
/*             location.reload(); */
              $('.output').html((i, val) => {
                return val*1+1;              
              }); 
        });
    }

    dislikeInit() {
        this.$(this.DISLIKE_BUTTON).on('click', e => {
             $('.minus-output').html((i, val) => {
                return val*1-1;
              });  
        });
    }
    
}