import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import initUser from "./initUserController";
import Model from "../Model/main/Model";
import DashboardMenuController from "./dashboardController";
import TasksMenuController from "./tasksMenuController";
import { curTasks } from "../Model/main/TaskModel";
// import { createTasksFromDb } from "../Controller/TasksComponentController";
import HabitsMenuController from "./Menus/habitsMenuController";
import { Spinner } from "spin.js";
import { spinnerOpts } from "../helpers/spinnerOpts";
import View from "../View/View";
import YipMenuController from "./Menus/YipMenuController";
import { state } from "../Model/main/Model";

// export default async function Controller() {
//   const model = new Model();
//   const view = new View();
//   view.render();

//   const main = document.getElementById("main");
//   const spinner = new Spinner(spinnerOpts).spin(main);

//   initUser();
//   await model.getUser();
//   await model.createTasksFromDb();
//   // await model.setLocalHabitsFromDb();
//   await model.setLocalEnergy();
//   await model.setDbEnergy();
//   await model.getAllYipDays();
//   await model.addYipToday();
//   await model.setYipMoodsToUserStatsDb();

//   await model.getDbEnergy().then((energy) => view.renderEnergy(energy));
//   let userStats;
//   let profile;
//   await model.getUser().then(({ profile, stats }) => {
//     userStats = stats;
//     profile = profile;
//   });

//   spinner.stop();
//   console.log(curTasks);

//   const nav = document.getElementById("nav");
//   const menuBtns = nav.querySelectorAll("a");
//   menuBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       main.innerHTML = "";
//       switch (btn.id) {
//         case "dashboard":
//           new DashboardMenuController().init();
//           window.location.href = "/#/dashboard";
//           break;
//         case "tasks":
//           new TasksMenuController().init();
//           window.location.href = "/#/tasks";
//           break;
//         case "projects":
//           window.location.href = "/#/projects";
//           break;
//         case "habits":
//           new HabitsMenuController().init();
//           window.location.href = "/#/habits";
//           break;
//         case "yearInPixels":
//           window.location.href = "/#/yearinpixels";
//           new YipMenuController().init();
//           break;
//       }
//     });
//   });

//   //Profile modal
//   document.addEventListener("click", (e) => {
//     if (e.target.id === "profileCardCloseBtn") {
//       const profileModal = document.getElementById("profileModal");
//       profileModal.remove();
//     }

//     if (e.target.id === "profileImg") {
//       // console.log(userStats);
//       view.renderStats(userStats);
//     }

//     if (e.target.id === "profileCardImg") {
//       model.changeProfilePicture();
//     }
//   });

//   // SIGN OUT
//   const signoutBtn = document.getElementById("signoutBtn");
//   signoutBtn.addEventListener("click", (e) => {
//     signOut(auth).then((_) => {
//       window.location.href = "/auth.html";
//     });
//   });
// }

export default class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  async init() {
    this.view.render();

    const main = document.getElementById("main");
    const spinner = new Spinner(spinnerOpts).spin(main);

    initUser();
    await this.model.getUser();
    await this.model.createTasksFromDb();
    // await model.setLocalHabitsFromDb();
    await this.model.setLocalEnergy();
    await this.model.setDbEnergy();
    await this.model.getAllYipDays();
    await this.model.addYipToday();
    await this.model.setYipMoodsToUserStatsDb();

    await this.model
      .getDbEnergy()
      .then((energy) => this.view.renderEnergy(energy));
    let userStats;
    let profile;
    await this.model.getUser().then(({ profile, stats }) => {
      userStats = stats;
      profile = profile;
    });

    spinner.stop();
    console.log(curTasks);

    const nav = document.getElementById("nav");
    const menuBtns = nav.querySelectorAll("a");
    menuBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        main.innerHTML = "";
        switch (btn.id) {
          case "dashboard":
            new DashboardMenuController().init();
            window.location.href = "/#/dashboard";
            break;
          case "tasks":
            new TasksMenuController().init();
            window.location.href = "/#/tasks";
            break;
          case "projects":
            window.location.href = "/#/projects";
            break;
          case "habits":
            new HabitsMenuController().init();
            window.location.href = "/#/habits";
            break;
          case "yearInPixels":
            window.location.href = "/#/yearinpixels";
            new YipMenuController().init();
            break;
        }
      });
    });

    //Profile modal
    document.addEventListener("click", (e) => {
      if (e.target.id === "profileCardCloseBtn") {
        const profileModal = document.getElementById("profileModal");
        profileModal.remove();
      }

      if (e.target.id === "profileImg") {
        // console.log(userStats);
        this.view.renderStats(userStats);
      }

      if (e.target.id === "profileCardImg") {
        this.model.changeProfilePicture();
      }
    });

    // SIGN OUT
    const signoutBtn = document.getElementById("signoutBtn");
    signoutBtn.addEventListener("click", (e) => {
      signOut(auth).then((_) => {
        window.location.href = "/auth.html";
      });
    });
  }
}
