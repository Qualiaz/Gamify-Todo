// import { onAuthStateChanged } from "firebase/auth";
import initAuthPageScript from "../Auth/script/auth";
// import initNav from "../Controller/nav";
// import { auth } from "../firebase/config";
import App from "../App";

window.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "/":
      App.init();
      break;

    case "/auth.html":
      initAuthPageScript();
      break;
  }
});
