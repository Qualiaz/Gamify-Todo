import TasksMenuView from "../View/menus/TasksMenuView";

export default class TasksMenuController {
  constructor() {
    this.tasksMenuView = new TasksMenuView();
  }

  cl() {
    console.log(this.tasksMenuView);
  }
}

export const tasksMenuController = new TasksMenuController();
