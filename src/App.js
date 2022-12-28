import initNav from "./Controller/nav";
import initTasks from "./View/main/tasks/tasks";
import initTaskSettings from "./View/main/tasks/taskSettings";
import initUser from "./Controller/initUserController";

class App {
  constructor() {}

  init() {
    initNav();
    initUser();
  }
}

export default new App();
