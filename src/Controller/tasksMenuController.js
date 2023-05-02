import { curTasks } from "../Model/main/TaskModel";
import TasksMenuView from "../View/menus/TasksMenuView";
import TasksComponentController from "./TasksComponentController";

export default class TasksMenuController {
  constructor() {
    if (TasksMenuController.instance) return TasksMenuController.instance;

    this.view = new TasksMenuView();
    this.tasksComponentController = new TasksComponentController(
      curTasks,
      "tasks",
      "all"
    );
    TasksMenuController.instance = this;
  }

  init() {
    this.view.render();
    const tasksMenu = document.getElementById("tasksMenu");
    this.tasksComponentController.init(tasksMenu);
    this.tasksComponentController.model.state.menu = "tasks";
  }
}
