import { curTasks } from "../Model/main/TaskModel";
import TasksMenuView from "../View/menus/TasksMenuView";
import TasksComponentController from "./TasksComponentController";

class TasksMenuController {
  isInit = false;

  constructor() {
    this.view = new TasksMenuView();
    this.tasksComponentController = new TasksComponentController(
      curTasks,
      "tasks",
      "all"
    );
  }

  init() {
    this.view.render();
    const tasksMenu = document.getElementById("tasksMenu");
    this.tasksComponentController.init(tasksMenu);
  }
}

export const tasksMenuController = new TasksMenuController();
