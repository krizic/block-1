import $ from "jquery";
import { ChatService } from "./api/service";
import {ViewController} from "./pages"

//$("#root").html("Works!!!");


(()=> {
    ChatService.getAll().then((result) => {
        console.log(result);
    })
})();

new ViewController($);
