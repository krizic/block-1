import {ProfileCard, ProfileLike} from './index';
 
export class DetailView {
    user;
    jquery;
    detailPage$;
    rated;
  
    constructor(jquery, user, onChange) {
      this.index = 0;
      this.jquery = jquery;
      this.user = user;
      this.rated = onChange;
      this.detailPage$ = this.jquery("#root");
    }
  
    like = () => {
      this.rated(true);
    };
  
    dislike = () => {
      this.rated(false);
    };
  
  
  
    render = () => {
      const currentProfile = new ProfileCard(this.user);
      const profileLike = new ProfileLike(
        this.like,
        this.dislike,
        this.detailPage$
      );
      
      return `
      <section class="detail-page">
        ${currentProfile.render()}
        ${profileLike.render()}
      </selection>
      `;
    }
  }