import { curTasks } from "../Model/main/TaskModel";
import TasksMenuView from "../View/menus/TasksMenuView";
import TasksComponentController from "./TasksComponentController";

export default class TasksMenuController {
  constructor() {
    if (TasksMenuController.instance) return TasksMenuController.instance;
    this.view = new TasksMenuView();

    TasksMenuController.instance = this;
  }

  initTasksComponentController() {
    const tasksMenu = document.getElementById("tasksMenu");
    if (!this.tasksComponentController) {
      this.tasksComponentController = new TasksComponentController(
        curTasks,
        "tasks",
        "all"
      );
    }

    this.tasksComponentController.model.state.menu = "tasks";
    this.tasksComponentController.init(tasksMenu);
  }

  init() {
    this.view.render();
    this.initTasksComponentController();
  }
}
