import TasksComponentView from "../View/main/tasks/TasksComponentView";

import {
  curTasks,
  curTasksToday,
  curTasksTomorrow,
  TasksComponentModel,
} from "../Model/main/TaskModel";
import TaskSettingsController from "./Tasks/AddTaskController";

export let userId;
export let tasksComponentView;
export let curFilter = {};

export default class TasksComponentController {
  constructor(tasks, menu, filter) {
    this.view = new TasksComponentView();
    this.model = new TasksComponentModel(tasks, menu, filter);

    this.model.observeTaskCards(curTasks, this);
    this.model.arrangeTasksInArrays();
    this.model.setFilterState(this.model.state.filter);
    this.model.orderTasks();
  }

  update() {
    this.model.arrangeTasksInArrays();
    this.model.setFilterState(this.model.state.filter);

    console.log(this.model.state);
    console.log(this.model.state.menu);
    console.log(window.location.hash);
    if (
      this.model.state.menu === "dashboard" &&
      window.location.hash === "#/dashboard"
    ) {
      console.log("update dashboard");
      this.init(document.getElementById("dashboardTasks"));
    }

    if (
      this.model.state.menu === "tasks" &&
      window.location.hash === "#/tasks"
    ) {
      this.init(document.getElementById("tasksMenu"));
      console.log("update tasks");
    }
  }

  eventListeners(parentEl) {
    const id = this.model.state.id;
    const {
      filterSelections,
      orderSelections,
      optionOrderDirectionAscending,
      optionOrderDirectionDescending,
    } = this.view.getElems(id);

    const viewSettingsBtn = document.getElementById(
      `tmComponentViewSettingsBtn-${id}`
    );

    const addTaskBtn = document.getElementById(`addTaskBtn-${id}`);
    const resetViewBtn = document.getElementById("resetAllViewBtn");

    viewSettingsBtn.addEventListener("click", () => {
      const backgroundEl = this.view.addModalBackground("10px");
      this.model.state.isTaskViewOpen = true;
      this.view.renderViewSettings(id, this.model.state.isTaskViewOpen);

      backgroundEl.addEventListener("click", () => {
        this.model.state.isTaskViewOpen = false;
        backgroundEl.remove();
        this.view.renderViewSettings(id, this.model.state.isTaskViewOpen);
      });
    });

    filterSelections.addEventListener("change", (e) => {
      e.preventDefault();
      const optionEl = e.target.options[e.target.selectedIndex].value;
      this.model.setFilterState(optionEl);
      this.model.arrangeTasksInArrays();

      this.init(parentEl);
    });

    orderSelections.addEventListener("change", (e) => {
      const option = e.target.options[e.target.selectedIndex].value;
      this.model.setOrderTasks(option);
      this.model.orderTasks();
      this.init(parentEl);
    });

    optionOrderDirectionAscending.addEventListener("click", () => {
      this.model.state.order.direction = "ascending";
      this.model.orderTasks();
      this.init(parentEl);
    });

    optionOrderDirectionDescending.addEventListener("click", () => {
      this.model.state.order.direction = "descending";
      this.model.orderTasks();
      this.init(parentEl);
    });

    resetViewBtn.addEventListener("click", () => {
      this.model.resetState();
      this.model.orderTasks();
      this.init(parentEl);
    });

    addTaskBtn.addEventListener("click", () => {
      const taskSettingsController = new TaskSettingsController(this);
      taskSettingsController.init();
      // this.model.subToTaskSettingsModel(taskSettingsController.model);
      // taskSettingsController.model.obs.add(this);
    });
  }

  init(parentEl) {
    console.log(curTasksToday);
    console.log("RENDERING");
    this.model.orderTasks();
    this.render(parentEl);

    this.view.renderViewSettings(
      this.model.state.id,
      this.model.state.isTaskViewOpen
    );

    this.eventListeners(parentEl);
  }

  render(parentEl, state = this.model.state, id = this.model.state.id) {
    this.view.render(parentEl, state, id);
  }
}

/////////////////////////////////////////
/////////////////////////////////////////
