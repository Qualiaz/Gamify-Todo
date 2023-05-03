import { curTasksToday } from "../Model/main/TaskModel";
import DashboardMenuView from "../View/menus/DashboardView";
import TasksComponentController from "./TasksComponentController";
import HabitsComponentController from "./Habits/HabitsComponentController";
import { state } from "../Model/main/Model";

export default class DashboardMenuController {
  constructor() {
    if (DashboardMenuController.instance)
      return DashboardMenuController.instance;

    this.view = new DashboardMenuView();

    DashboardMenuController.instance = this;
  }

  initTasks() {
    const { dashboardTasks } = this.view.getElems();

    if (!this.tasksComponentController) {
      this.tasksComponentController = new TasksComponentController(
        curTasksToday,
        "dashboard",
        "today"
      );
    }

    this.tasksComponentController.init(dashboardTasks);
    this.tasksComponentController.model.state.menu = "dashboard";
  }

  initHabits() {
    const { dashboardHabits } = this.view.getElems();
    const habitsComponentController = new HabitsComponentController();
    habitsComponentController.init(dashboardHabits);
  }

  initYip() {
    const { dashboardYip } = this.view.getElems();
    state.initYipDayController.init(dashboardYip);
  }

  init() {
    this.view.render();
    this.initTasks();
    this.initHabits();
    this.initYip();
  }
}

// export const dashboardMenuController = new DashboardMenuController();
