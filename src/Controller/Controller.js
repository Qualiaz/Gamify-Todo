import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import initUser from "./initUserController";
import { dashboardMenuController } from "./dashboardController";
import TasksComponentController from "./TasksComponentController";
import { tasksMenuController } from "./tasksMenuController";
import { curTasks, curTasksToday } from "../Model/main/TaskModel";
import { createTasksFromDb } from "../Controller/TasksComponentController";
import habitsMenuController from "./Menus/habitsMenuController";
import Model from "../Model/main/Model";
import { Spinner } from "spin.js";
import { spinnerOpts } from "../helpers/spinnerOpts";
export default async function Controller() {
  const main = document.getElementById("main");
  const spinner = new Spinner(spinnerOpts).spin(main);

  initUser();
  const model = new Model();
  await createTasksFromDb();
  await model.setLocalHabitsFromDb();

  spinner.stop();

  // dashboardMenuController.init();
  console.log("doneController");
  const nav = document.getElementById("nav");
  const menuBtns = nav.querySelectorAll("a");
  console.log(main.children);

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      main.innerHTML = "";
      switch (btn.id) {
        case "dashboard":
          dashboardMenuController.init();
          window.location.href = "/#/dashboard";
          break;
        case "tasks":
          tasksMenuController.init();
          window.location.href = "/#/tasks";
          break;
        case "projects":
          window.location.href = "/#/projects";
          console.log("projects page");
          break;

        case "habits":
          habitsMenuController();
          window.location.href = "/#/habits";
          break;
        case "yearInPixels":
          window.location.href = "/#/yearinpixels";
          console.log("year in pixels page");
          break;
      }
    });
  });
  //
  // SIGN OUT
  const signoutBtn = document.getElementById("signoutBtn");
  signoutBtn.addEventListener("click", (e) => {
    signOut(auth).then((_) => {
      window.location.href = "/auth.html";
    });
  });
}
