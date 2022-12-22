import initAuthPageScript from "../Auth/script/auth";
import initNav from "../Controller/nav";

window.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "/":
      initNav();
      break;

    case "/auth.html":
      initAuthPageScript();
      break;
  }
});
