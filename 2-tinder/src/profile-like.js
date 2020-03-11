export class ProfileLike {
    likeFn;
    dislikeFn;
    detailPage$;
  
    constructor(likeFn, dislikeFn, detailPage$) {
      this.likeFn = likeFn;
      this.dislikeFn = dislikeFn;
      this.detailPage$ = detailPage$;
      this.onLikeInit();
      this.onDislikeInit();
    }
  
    onLikeInit() {
      this.detailPage$.on("click", "button#like", e => {
        this.likeFn();
      });
    }
  
    onDislikeInit() {
      this.detailPage$.on("click", "button#dislike", e => {
        this.dislikeFn();
      });
    }
  
    render() {
      return `
        <div class="card">
        <div class="text-center p-2 mx-auto">
          <button type="button" class="btn btn-success btn-lg" id="like">
            <img src="/modules/bootstrap-icons/icons/heart.svg" class="rounded" alt="" width="128" height="128" title="Heart-Fill">
            <span class="output"></span>
          </button>
          <button type="button" class="btn btn-info btn-lg" id="dislike">
            <img src="/modules/bootstrap-icons/icons/heart.svg" class="rounded" alt="" width="128" height="128" title="Heart">
            <span class="minus-output"></span>
          </button>
        </div>
        </div>
        `;
    }
  }