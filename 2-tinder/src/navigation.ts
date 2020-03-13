import { PageName } from "./models/page-name";

export class Navigation {
  mainPage$: any;  

    constructor(private jquery: JQueryStatic, private changePage: (page) => void , private pageName : PageName) {
      this.mainPage$ = this.jquery("#root");
      this.onInitClick();
    }
   
    onInitClick(): void {
      this.mainPage$.on("click", "button.navbar-toggler", e => {
        this.changePage(this.pageName);
      });
    }
  
    render() {
      return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Tinder</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Profile <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">List</a>
        </li>
    </div>
    </nav>`;
    }
  }