import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TasksComponentView from "../View/main/tasks/TasksComponentView";
import TaskCardController from "./TaskCardController";
//prettier-ignore
import {curTasks,curTasksTomorrow,curTasksToday,curTasksThisWeek, curTasksWhenever} from "../Model/main/TaskModel";
//prettier-ignore
import {addTasksWeekDaysFilter,addTasksOtherDayFilter,addTasksNoRepeatFilter} from "../helpers/filters";
import { removeDuplicateTasks } from "../helpers/removeDuplicate";
import OrderTask from "../helpers/orderTask";
import TaskSettingsController from "./Tasks/AddTaskController";

export let userId;
export let tasksComponentView;
export let curFilter = {};

export default class TasksComponentController {
  #isInit = false;
  constructor(tasks, menu, filter) {
    this.view = new TasksComponentView();
    this.id = (((1 + Math.random()) * 0x10000) | 0).toString(4).substring(1);

    this.curView = {
      isTaskViewOpen: false,
      menu: menu,
      filter: filter,
      order: {
        name: "timeCreated",
        direction: "descending",
      },
      tasks: tasks,
    };
  }

  eventListeners(parentEl) {
    const {
      filterSelections,
      orderSelections,
      optionOrderDirectionAscending,
      optionOrderDirectionDescending,
    } = this.view.getElems(this.id);

    const viewSettingsBtn = document.getElementById(
      `tmComponentViewSettingsBtn-${this.id}`
    );

    const addTaskBtn = document.getElementById(`addTaskBtn-${this.id}`);
    const resetViewBtn = document.getElementById("resetAllViewBtn");

    viewSettingsBtn.addEventListener("click", () => {
      const backgroundEl = this.view.addModalBackground();
      this.curView.isTaskViewOpen = true;
      this.view.renderViewSettings(this.id, this.curView.isTaskViewOpen);

      backgroundEl.addEventListener("click", () => {
        this.curView.isTaskViewOpen = false;
        backgroundEl.remove();
        this.view.renderViewSettings(this.id, this.curView.isTaskViewOpen);
      });
    });

    filterSelections.addEventListener("change", (e) => {
      e.preventDefault();
      const backgroundEl = document.querySelector(".background-modal");
      const optionEl = e.target.options[e.target.selectedIndex].value;
      console.log(optionEl);
      if (optionEl === "tomorrow") {
        let tasksTomorrow = removeDuplicateTasks(curTasksTomorrow);
        this.curView.tasks = tasksTomorrow;
        this.curView.filter = "tomorrow";
      }
      if (optionEl === "today") {
        let tasksToday = removeDuplicateTasks(curTasksToday);
        this.curView.tasks = tasksToday;
        this.curView.filter = "today";
        // this.init(parentEl);
      }
      if (optionEl === "nextWeek") {
        let tasksNextWeek = removeDuplicateTasks(curTasksNextWeek);
        this.curView.tasks = tasksNextWeek;
        this.curView.filter = "nextWeek";
      }
      if (optionEl === "thisWeek") {
        let tasksThisWeek = removeDuplicateTasks(curTasksThisWeek);
        this.curView.tasks = tasksThisWeek;
        this.curView.filter = "thisWeek";
        // this.init(parentEl);
      }
      if (optionEl === "whenever") {
        let tasksWhenever = removeDuplicateTasks(curTasksWhenever);
        this.curView.tasks = tasksWhenever;
        this.curView.filter = "whenever";
        // this.init(parentEl);
      }
      if (optionEl === "all") {
        let tasksAll = removeDuplicateTasks(curTasks);
        this.curView.tasks = tasksAll;
        this.curView.filter = "all";
        // this.init(parentEl);
      }
      // backgroundEl.remove();
      this.init(parentEl);
    });

    orderSelections.addEventListener("change", (e) => {
      const backgroundEl = document.querySelector(".background-modal");
      const option = e.target.options[e.target.selectedIndex].value;
      if (option === "difficulty") {
        this.curView.order.name = "energy";
        this.init(parentEl);
      }
      if (option === "energy") {
        this.curView.order.name = "difficulty";
        this.init(parentEl);
      }
      if (option === "timeCreated") {
        this.curView.order.name = "timeCreated";
        this.init(parentEl);
      }
      // backgroundEl.remove();
    });

    optionOrderDirectionAscending.addEventListener("click", () => {
      this.curView.order.direction = "ascending";
      this.init(parentEl);
    });

    optionOrderDirectionDescending.addEventListener("click", () => {
      this.curView.order.direction = "descending";
      this.init(parentEl);
    });

    resetViewBtn.addEventListener("click", () => {
      this.curView.filter = "all";
      this.curView.name = "timeCreated";
      this.curView.order.direction = "descending";
      this.curView.order.name = "timeCreated";
      this.curView.tasks = curTasks;
      this.init(parentEl);
    });

    addTaskBtn.addEventListener("click", () => {
      const taskSettingsController = new TaskSettingsController();
      taskSettingsController.init();
    });
  }

  orderTasks(
    tasks = this.curView.tasks,
    orderType = this.curView.order.name,
    orderDirection = this.curView.order.direction
  ) {
    const tasksOrderInst = new OrderTask(tasks);

    if (orderType === "difficulty") {
      const orderedTasks = tasksOrderInst.difficulty(orderDirection);
      return orderedTasks;
    }
    if (orderType === "energy") {
      const orderedTasks = tasksOrderInst.energy(orderDirection);
      return orderedTasks;
    }
    if (orderType === "timeCreated") {
      const orderedTasks = tasksOrderInst.timeCreated(orderDirection);
      return orderedTasks;
    }
  }

  init(parentEl) {
    this.render(parentEl);
    this.curView.tasks = this.orderTasks();
    this.view.renderViewSettings(this.id, this.curView.isTaskViewOpen);
    this.eventListeners(parentEl);
  }

  render(parentEl, view = this.curView, id = this.id) {
    this.view.render(parentEl, view, id);
  }
}

/////////////////////////////////////////
/////////////////////////////////////////
export async function createTasksFromDb() {
  const docUserRef = doc(db, "users", localStorage.getItem("user"));
  const colTaskRef = collection(docUserRef, "tasks");
  const tasksDocs = await getDocs(colTaskRef);

  tasksDocs.forEach((doc) => {
    const taskCard = new TaskCardController();
    taskCard.model.cardState = doc.data();
    taskCard.model.cardState.id = doc.id;
    console.log(taskCard.model.cardState);
    const localTimeTracked = localStorage.getItem(`timeElapsed-${doc.id}`);
    if (localTimeTracked) {
      taskCard.model.cardState.timeTracked = localTimeTracked;
    }

    const taskSettingsController =
      taskCard.model.createTaskSettingsController();
    taskSettingsController.curTaskCard = taskCard;
    curTasks.push(taskCard);
    // filter tasks
    if (taskCard.model.cardState.startDate) {
      if (taskCard.model.cardState.repeat.type === "daily") {
        const everyOtherDay = taskCard.model.cardState.repeat.everyOtherDay;
        addTasksOtherDayFilter(everyOtherDay, taskCard);
        return;
      }
      if (taskCard.model.cardState.repeat.type === "weekly") {
        const days = taskCard.model.cardState.repeat.daysOfWeek;
        addTasksWeekDaysFilter(days, taskCard);
        return;
      }
      addTasksNoRepeatFilter(taskCard);
    } else {
      // no selected date
      curTasksWhenever.push(taskCard);
    }
  });
}
