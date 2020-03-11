import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import $ from "jquery";
import {ViewController} from "./view-controller";


$(document).ready(function() {
  const constrollerView = new ViewController($);
});