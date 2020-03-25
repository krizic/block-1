import "bootstrap-icons/icons/heart.svg"

export class ProfileLike {
    likeFn: () => void;
    dislikeFn: () => void;
    detailPage$: any;
  
    constructor(likeFn: () => number | void | string, dislikeFn: () => any, detailPage$: any) {
      this.likeFn = likeFn;
      this.dislikeFn = dislikeFn;
      this.detailPage$ = detailPage$;
      this.onLikeInit();
      this.onDislikeInit();
    }
  
    onLikeInit(): void {
      this.detailPage$.on("click", "button#like", e => {
        this.likeFn();
      });
    }
  
    onDislikeInit(): void {
      this.detailPage$.on("click", "button#dislike", e => {
        this.dislikeFn();
      });
    }
  
    render(): string {
      return `
        <div class="card">
        <div class="text-center p-2 mx-auto">
          <button type="button" class="btn btn-success btn-lg" id="like">
            <img src="/node_modules/bootstrap-icons/icons/heart.svg" class="rounded" alt="" width="128" height="128" title="Heart-Fill">
            <span class="output"></span>
          </button>
          <button type="button" class="btn btn-info btn-lg" id="dislike">
            <img src="/node_modules/bootstrap-icons/icons/heart.svg" class="rounded" alt="" width="128" height="128" title="Heart">
            <span class="minus-output"></span>
          </button>
        </div>
        </div>
        `;
    }
}