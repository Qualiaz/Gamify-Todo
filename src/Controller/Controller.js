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
import { setLocalHabitsFromDb } from "../Model/main/HabitModel";
import View from "../View/View";
import { yipMenuController } from "./Menus/YipMenuController";
import YipDayController from "./YipDayController";
import { state } from "../Model/main/Model";

export default async function Controller() {
  const model = new Model();
  const view = new View();
  view.render();

  const main = document.getElementById("main");
  const spinner = new Spinner(spinnerOpts).spin(main);

  initUser();

  await createTasksFromDb();
  await setLocalHabitsFromDb();
  await model.setLocalEnergy();
  await model.setDbEnergy();
  await model.getAllYipDays();
  await model.addYipToday();

  model.getDbEnergy().then((energy) => view.renderEnergy(energy));

  spinner.stop();

  const nav = document.getElementById("nav");
  const menuBtns = nav.querySelectorAll("a");

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
          yipMenuController.init();
          break;
      }
    });
  });

  // SIGN OUT
  const signoutBtn = document.getElementById("signoutBtn");
  signoutBtn.addEventListener("click", (e) => {
    signOut(auth).then((_) => {
      window.location.href = "/auth.html";
    });
  });
}
