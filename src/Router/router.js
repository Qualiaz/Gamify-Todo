import initAuthPageScript from "../Auth/script/auth";
import App from "../App";
import DashboardMenuController from "../Controller/dashboardController";
import YipMenuController from "../Controller/Menus/YipMenuController";
import TasksMenuController from "../Controller/tasksMenuController";
import HabitsMenuController from "../Controller/Menus/habitsMenuController";
import { initHomePage } from "../static/home";
import initUser from "../Controller/initUserController";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  const authPageEl = document.getElementById("authPage");
  const home = document.getElementById("home");
  if (!!rootEl) rootEl.style.display = "flex";
  if (!!authPageEl) authPageEl.style.display = "flex";
  if (!!home) home.style.display = "block";
});

window.onload = async () => {
  // const isInitUser =
  switch (window.location.pathname) {
    case "/":
      // if user access
      if (!localStorage.getItem("user")) {
        window.location.replace("/home.html");
        return initHomePage();
      }

      await App.init();
      switch (window.location.hash) {
        case "#/dashboard":
          new DashboardMenuController().init();
          break;

        case "#/tasks":
          new TasksMenuController().init();
          break;

        case "#/projects":
          console.log("invoke projects function");
          break;

        case "#/habits":
          new HabitsMenuController().init();
          break;

        case "#/yearinpixels":
          new YipMenuController().init();
          break;

        default:
          new DashboardMenuController().init();
      }
      break;

    case "/auth.html":
      initAuthPageScript();
      break;

    case "/home.html":
      initHomePage();
      break;
  }
};
