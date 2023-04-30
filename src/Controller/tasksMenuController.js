import { curTasks } from "../Model/main/TaskModel";
import TasksMenuView from "../View/menus/TasksMenuView";
import TasksComponentController from "./TasksComponentController";

let instance = null;

export default class TasksMenuController {
  constructor() {
    if (instance) {
      return instance;
    }
    console.log(curTasks);
    this.view = new TasksMenuView();
    this.tasksComponentController = new TasksComponentController(
      curTasks,
      "tasks",
      "all"
    );
    instance = this;
  }

  init() {
    this.view.render();
    const tasksMenu = document.getElementById("tasksMenu");
    this.tasksComponentController.init(tasksMenu);
    this.tasksComponentController.model.state.menu = "tasks";
  }
}
