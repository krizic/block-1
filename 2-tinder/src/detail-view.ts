import { ProfileCard } from "./profile-card";
import { ProfileLike } from "./profile-like";
import { User } from "./api/models";
import { IPage } from "./intefaces/page";
import { Navigation } from "./navigation";
import { PageName } from "./models/page-name";

export class DetailView implements IPage {
  user: User;
  jquery: JQueryStatic;
  detailPage$: any;
  rated: (rating: boolean) => void;

  constructor(
    jquery,
    user: User,
    onChange: (rating: boolean) => void,
    private changePage: (page) => void
  ) {
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

    const nav = new Navigation(this.jquery, this.changePage, PageName.listPage);

    return `
      ${nav.render()}
      <section class="detail-page">
        ${currentProfile.render()}
        ${profileLike.render()}
      </selection>
      `;
  };
}
