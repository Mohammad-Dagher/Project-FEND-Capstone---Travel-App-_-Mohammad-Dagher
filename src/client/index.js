import { Get_API_Action } from "./js/AppHandler.js";
import { InputChecker } from "./js/AppInputChecker.js";
import { Get_TimeLeft } from "./js/GetTime.js";

// import {  } from './src/client/js/AppInputChecker.js'

alert(" I EXIST in web page -> in file now index.js ");
console.log("CHANGE!!");

//  1- Now, we can import the scss files like this in client/index.js:

import "./Styles/style.scss";

// document.addEventListener('DOMContentLoaded', () => {  });

document.getElementById("generate").addEventListener("click", Get_API_Action);

export { Get_API_Action, InputChecker, Get_TimeLeft };
