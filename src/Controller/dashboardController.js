import { curTasksToday } from "../Model/main/TaskModel";
import DashboardMenuView from "../View/menus/DashboardView";
import TasksComponentController from "./TasksComponentController";
import HabitsComponentController from "./Habits/HabitsComponentController";
import YipDayController from "./YipDayController";
import { state } from "../Model/main/Model";

class DashboardMenuController {
  constructor() {
    this.view = new DashboardMenuView();
  }

  initTasks() {
    const { dashboardTasks } = this.view.getElems();

    const tasksComponentController = new TasksComponentController(
      curTasksToday,
      "dashboard",
      "today"
    );

    // console.log(dashboardTasks)
    tasksComponentController.init(dashboardTasks);
    tasksComponentController.model.state.menu = "dashboard";
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

export const dashboardMenuController = new DashboardMenuController();
