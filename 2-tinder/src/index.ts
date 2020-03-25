import $ from "jquery"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { ViewController } from "./view-controller";

$(document).ready(function() {
  const controllerView: any = new ViewController($);
});