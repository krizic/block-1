import $ from "jquery";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import {ChatService} from "./api/service";
import {ViewController} from "./pages";

//$("#root").html("Works!!!");

(() => {
  ChatService.getAll().then(result => {
    console.log(result);
  });
})();

new ViewController($);
