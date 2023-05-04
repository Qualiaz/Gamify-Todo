import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import initUser from "./initUserController";
import Model from "../Model/main/Model";
import DashboardMenuController from "./dashboardController";
import TasksMenuController from "./tasksMenuController";
import { curTasks } from "../Model/main/TaskModel";
import HabitsMenuController from "./Menus/habitsMenuController";
import { Spinner } from "spin.js";
import { spinnerOpts } from "../helpers/spinnerOpts";
import View from "../View/View";
import YipMenuController from "./Menus/YipMenuController";
import { state } from "../Model/main/Model";
import { setLocalHabitsFromDb } from "./Habits/HabitCardController";

export default class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  async init() {
    await initUser();
    await this.model.getUser().then(({ profile, stats }) => {
      state.userStats = stats;
      state.userProfile = profile;
    });
    await this.model.setLocalStateUserPictureUrl();
    this.view.render(state);
    const main = document.getElementById("main");
    const spinner = new Spinner(spinnerOpts).spin(main);

    // await initUser();
    // will change after refactor

    await this.model.createTasksFromDb();
    await setLocalHabitsFromDb();
    await this.model.setLocalEnergy();
    await this.model.setDbEnergy();
    await this.model.getAllYipDays();
    await this.model.addYipToday();
    await this.model.setYipMoodsToUserStatsDb();
    await this.model.setHabitsToUserStatsFromDb();

    await this.model
      .getDbEnergy()
      .then((energy) => this.view.renderEnergy(energy));
    this.view.renderNameSidebar(state.userProfile.displayName);

    spinner.stop();

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
      if (e.target.id === "profileImg") {
        this.view.renderProfileCard(state);
        this.model.getStorageUserPicture();
      }

      if (e.target.id === "profileCardCloseBtn") {
        this.view.removeProfileModal();
      }

      if (e.target.id === "profileCardImg") {
        this.model.initChangeUserPicture().then(() => {
          console.log("nob");
          this.view.changeUserPicture(state.userProfile.picture);
        });
      }

      if (e.target.id === "profileCardSignOutBtn") {
        signOut(auth).then((_) => {
          // const localStorageUser = localStorage.getItem("user");
          localStorage.removeItem("user");
          window.location.href = "/home.html";
        });
      }
    });
  }
}
