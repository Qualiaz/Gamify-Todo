import initAuthPageScript from "../Auth/script/auth";
import App from "../App";
import Controller from "../Controller/Controller";

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
