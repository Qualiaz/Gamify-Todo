import initAuthPageScript from "../Auth/script/auth";
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
