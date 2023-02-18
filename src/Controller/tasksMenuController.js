import { curTasks } from "../Model/main/TaskModel";
import TasksMenuView from "../View/menus/TasksMenuView";
import TasksComponentController from "./TasksComponentController";

export default class TasksMenuController {
  constructor() {
    this.tasksMenuView = new TasksMenuView();
    this.tasksComponentController = new TasksComponentController(
      curTasks,
      "tasks",
      "all"
    );
  }

  init() {
    console.log(this.tasksComponentController);
    this.tasksMenuView.render();
    const tasksMenu = document.getElementById("tasksMenu");
    this.tasksComponentController.init(tasksMenu);
  }
}

export const tasksMenuController = new TasksMenuController();
