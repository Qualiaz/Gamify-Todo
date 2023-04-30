import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TasksComponentView from "../View/main/tasks/TasksComponentView";
import TaskCardController from "./TaskCardController";
//prettier-ignore
import {curTasks,curTasksTomorrow,curTasksToday,curTasksThisWeek, curTasksWhenever, TasksComponentModel} from "../Model/main/TaskModel";
//prettier-ignore
import {addTasksWeekDaysFilter,addTasksOtherDayFilter,addTasksNoRepeatFilter} from "../helpers/filters";
import { removeDuplicateTasks } from "../helpers/removeDuplicate";
import OrderTask from "../helpers/orderTask";
import TaskSettingsController from "./Tasks/AddTaskController";

export let userId;
export let tasksComponentView;
export let curFilter = {};

export default class TasksComponentController {
  constructor(tasks, menu, filter) {
    this.view = new TasksComponentView();
    this.model = new TasksComponentModel(tasks, menu, filter);

    curTasks.forEach((taskCard) => {
      taskCard.model.obs.sub(this);
    });
    this.model.arrangeTasksInArrays();
    this.model.setFilterState(this.model.state.filter);
    this.model.orderTasks();
  }

  update() {
    this.model.arrangeTasksInArrays();
    this.model.setFilterState(this.model.state.filter);
    console.log("IM UPDATED");
    if (this.model.state.menu === "dashboard") {
      console.log("do i init dashboard?");
      this.init(document.getElementById("dashboardTasks"));
    }
    if (this.model.state.menu === "tasks") {
      console.log("do i init tasks?");
      this.init(document.getElementById("tasksMenu"));
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
      console.log(this.model.state.tasks);
      console.log(curTasksTomorrow);

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
    this.render(parentEl);

    this.view.renderViewSettings(
      this.model.state.id,
      this.model.state.isTaskViewOpen
    );

    this.eventListeners(parentEl);
  }

  render(parentEl, state = this.model.state, id = this.model.state.id) {
    console.log("RENDERING");
    this.view.render(parentEl, state, id);
  }
}

/////////////////////////////////////////
/////////////////////////////////////////
