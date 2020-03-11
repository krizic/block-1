import { ProfileCard } from './profile-card';
import { ProfileLike } from './profile-like';
import { User } from "./api/models";
import { IPage } from "./intefaces/page";

export class DetailView implements IPage {

    user: User;
    jquery: JQueryStatic;
    detailPage$: any;
    rated: (rating: boolean) => void;
  
    constructor(jquery, user: User, onChange: (rating: boolean) => void) {
      this.jquery = jquery;
      this.user = user;
      this.rated = onChange;
      this.detailPage$ = this.jquery("#root");
    }
  
    like = (): void => {
      this.rated(true);
    };
  
    dislike = (): void => {
      this.rated(false);
    };
  
    render = (): string => {
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