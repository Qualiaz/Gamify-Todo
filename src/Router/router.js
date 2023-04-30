import initAuthPageScript from "../Auth/script/auth";
import App from "../App";
import { dashboardMenuController } from "../Controller/dashboardController";
import { tasksMenuController } from "../Controller/tasksMenuController";
import habitsMenuController from "../Controller/Menus/habitsMenuController";
import { yipMenuController } from "../Controller/Menus/YipMenuController";
import { curTasks } from "../Model/main/TaskModel";
import TasksMenuController from "../Controller/tasksMenuController";

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
      console.log(curTasks);
      switch (window.location.hash) {
        case "#/dashboard":
          dashboardMenuController.init();
          break;

        case "#/tasks":
          new TasksMenuController().init();
          // tasksMenuController.init();
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
