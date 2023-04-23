import { curTasksToday } from "../Model/main/TaskModel";
import DashboardMenuView from "../View/menus/DashboardView";
import TasksComponentController from "./TasksComponentController";
import HabitsComponentController from "./Habits/HabitsComponentController";
import YipComponentController from "./YipComponentController";

class DashboardMenuController {
  constructor() {
    this.view = new DashboardMenuView();
  }

  initTasks() {
    const { dashboardTasks } = this.view.getElems();
    const dashboardTasksComponentController = new TasksComponentController(
      curTasksToday,
      "dashboard",
      "today"
    );
    dashboardTasksComponentController.init(dashboardTasks);
    dashboardTasksComponentController.curView.menu = "dashboard";
  }

  initHabits() {
    const { dashboardHabits } = this.view.getElems();
    const habitsComponentController = new HabitsComponentController();
    habitsComponentController.init(dashboardHabits);
  }

  initYip() {
    const { dashboardYip } = this.view.getElems();
    const yipComponentController = new YipComponentController();
    yipComponentController.init(dashboardYip);
  }

  init() {
    this.view.render();
    this.initTasks();
    this.initHabits();
    this.initYip();
  }
}

export const dashboardMenuController = new DashboardMenuController();
