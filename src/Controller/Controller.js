import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import initUser from "./initUserController";
import { dashboardMenuController } from "./dashboardController";
import TasksComponentController from "./TasksComponentController";
import { tasksMenuController } from "./tasksMenuController";
import { curTasks, curTasksToday } from "../Model/main/TaskModel";
import { createTasksFromDb } from "../Controller/TasksComponentController";

export default async function Controller() {
  // getCur User
  initUser();
  await createTasksFromDb();

  const main = document.getElementById("main");
  const nav = document.getElementById("nav");
  const menuBtns = nav.querySelectorAll("a");
  const menuTasksBtn = document.getElementById("navTasksBtn");

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      main.innerHTML = "";
      switch (btn.id) {
        case "dashboard":
          dashboardMenuController.view.render();
          // const dashboardMenu = document.getElementById("dashboardMenu");
          const dashboardTasks = document.getElementById("dashboardTasks");
          const dashboardTasksComponentController =
            new TasksComponentController(curTasksToday, "dashboard", "today");
          dashboardTasksComponentController.init(dashboardTasks);
          break;
        case "tasks":
          tasksMenuController.tasksMenuView.render();
          const tasksMenu = document.getElementById("tasksMenu");
          //prettier-ignore
          const tasksComponentController = new TasksComponentController(curTasks,"tasks","all");

          tasksComponentController.init(tasksMenu);
          break;
        case "projects":
          main.innerHTML = projectsMarkup;
          break;
        case "habits":
          main.innerHTML = habitsMarkup;
          break;
        case "calendar":
          main.innerHTML = calendarMarkup;
          break;
        case "yearInPixels":
          main.innerHTML = yearInPixelsMarkup;
          break;
      }
    });
  });

  //
  // SIGN OUT
  const signoutBtn = document.getElementById("signoutBtn");
  signoutBtn.addEventListener("click", (e) => {
    signOut(auth).then((_) => {
      window.location.pathname = "/auth.html";
    });
  });
}
