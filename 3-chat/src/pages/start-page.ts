import {IPage} from "./interfaces/page";
import {UsernameStorageKey} from "../constants";
import "./start-page.css";
import { AuthService } from '../services';

export class StartPage implements IPage {

  private readonly name = "start-page";

  constructor(private $: JQuery, private nextPage: () => void){
    this.$.on("click", `#${this.name} .username-submit`, this.onUsernameSubmit);
  }

  onUsernameSubmit = (e) => {
    const inputEl: HTMLInputElement = this.$.find(`#${this.name} form input.username-input`)[0] as HTMLInputElement;
    console.log(inputEl.value);
    
    if (inputEl.value) {
      AuthService.setUser(inputEl.value);
      this.nextPage();
    } else {
      console.log("there is no value");
    }
  }


  render(): string {
    return `
    <section id="${this.name}" >${this.template()}</section>  
    `;
  }

  template = () => {
    return `
  <div class="card">
    <div class="card-header">
      Log In
    </div>
    <div class="card-body">
    <form>
    <div class="form-group">
      <label for="usernameField">Username</label>
      <input type="text" class="form-control username-input" id="usernameField" aria-describedby="usernameHelp" placeholder="Your Name">
      <small id="usernameHelp" class="form-text text-muted">Please provide us with username to show in chat.</small>
    </div>
    <a href="#" class="btn btn-primary username-submit">Submit</a>
  </form>
    </div>
  </div>
    `;
  }
}
