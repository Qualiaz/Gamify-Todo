import initAuthPageScript from "../Auth/script/auth";
import App from "../App";
import { dashboardMenuController } from "../Controller/dashboardController";
import { tasksMenuController } from "../Controller/tasksMenuController";
import habitsMenuController from "../Controller/Menus/habitsMenuController";
import { yipMenuController } from "../Controller/Menus/YipMenuController";
document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  const authPageEl = document.getElementById("authPage");
  if (rootEl) rootEl.style.display = "flex";
  if (authPageEl) authPageEl.style.display = "flex";
});

window.onload = async () => {
  switch (window.location.pathname) {
    case "/":
      await App.init();
      switch (window.location.hash) {
        case "#/dashboard":
          dashboardMenuController.init();
          break;

        case "#/tasks":
          tasksMenuController.init();
          break;

        case "#/projects":
          console.log("invoke projects function");
          break;

        case "#/habits":
          habitsMenuController();
          break;

        case "#/yearinpixels":
          yipMenuController.init();
          break;

        default:
          dashboardMenuController.init();
      }
      break;

    case "/auth.html":
      initAuthPageScript();
      break;
  }
};
