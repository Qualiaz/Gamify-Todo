import { onAuthStateChanged } from "firebase/auth";
import initAuthPageScript from "../Auth/script/auth";
import initNav from "../Controller/nav";
import { auth } from "../firebase/config";

window.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "/":
      initNav();

      // newUser();
      // initApp();
      break;

    case "/auth.html":
      initAuthPageScript();
      break;

    // case "/static/home":
    //   initStaticHome();
    //   break;
  }
});
