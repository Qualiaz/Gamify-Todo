import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TasksComponentView from "../View/main/tasks/TasksComponentView";
import TaskCardController from "./TaskCardController";
import addTaskControllerInit from "./Tasks/AddTaskController";
//prettier-ignore
import {curTasks,curTasksTomorrow,curTasksToday,curTasksThisWeek, curTasksWhenever} from "../Model/main/TaskModel";
//prettier-ignore
import {addTasksWeekDaysFilter,addTasksOtherDayFilter,addTasksNoRepeatFilter} from "../helpers/filters";
import { removeDuplicateTasks } from "../helpers/removeDuplicate";
import OrderTask from "../helpers/orderTask";

export let userId;
export let tasksComponentView;
export let curFilter = {};

export default class TasksComponentController {
  curView = {
    isTaskSettings: false,
    filter: "all",
    order: {
      name: "timeCreated",
      direction: "ascending",
    },
    tasks: [],
  };

  constructor(tasks) {
    this.tasksComponentView = new TasksComponentView();
    this.id = (((1 + Math.random()) * 0x10000) | 0).toString(4).substring(1);
    this.curView.tasks = tasks;
  }

  eventListeners(parentEl) {
    document.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === `addTaskBtn-${this.id}`) {
        addTaskControllerInit();
      }
      // CHANGE VIEW
      if (clickedId === `tmComponentViewSettings-${this.id}`) {
        this.tasksComponentView.renderViewSettings(this.id);
        this.curView.isTaskSettings = true;
      }
      /////////////// FILTER ////////////
      // TODAY
      if (clickedId === `filterSelectionToday-${this.id}`) {
        let tasksToday = removeDuplicateTasks(curTasksToday);
        this.curView.tasks = tasksToday;
        this.curView.filter = "today";
        this.render(parentEl);
      }

      // TOMORROW
      if (clickedId === `filterSelectionTomorrow-${this.id}`) {
        let tasksTomorrow = removeDuplicateTasks(curTasksTomorrow);
        this.curView.tasks = tasksTomorrow;
        this.curView.filter = "tomorrow";
        this.render(parentEl);
      }
      // THIS WEEK
      if (clickedId === `filterSelectionThisWeek-${this.id}`) {
        let tasksThisWeek = removeDuplicateTasks(curTasksThisWeek);
        this.curView.tasks = tasksThisWeek;
        this.curView.filter = "thisWeek";
        this.render(parentEl);
      }
      // ALL
      if (clickedId === `filterSelectionAll-${this.id}`) {
        let tasksAll = removeDuplicateTasks(curTasks);
        this.curView.tasks = tasksAll;
        this.curView.filter = "all";
        this.render(parentEl);
      }
      // WHENEVER
      if (clickedId === `filterSelectionWhenever-${this.id}`) {
        let tasksWhenever = removeDuplicateTasks(curTasksWhenever);
        this.curView.tasks = tasksWhenever;
        this.curView.filter = "whenever";
        this.render(parentEl);
      }
      /////////////// ORDER ////////////
      // TYPE //
      if (clickedId === `orderSelectionTimeCreated-${this.id}`) {
        this.curView.order.name = "timeCreated";
        this.render(parentEl);
      }
      if (clickedId === `orderSelectionDifficulty-${this.id}`) {
        this.curView.order.name = "difficulty";
        this.render(parentEl);
      }
      if (clickedId === `orderSelectionEnergy-${this.id}`) {
        this.curView.order.name = "energy";
        this.render(parentEl);
      }

      // DIRECTION //
      if (clickedId === `taskSettingsAscBtn-${this.id}`) {
        this.curView.order.direction = "ascending";
        this.curView.tasks = this.orderTasks();
        this.render(parentEl);
      }
      if (clickedId === `taskSettingsDescBtn-${this.id}`) {
        this.curView.order.direction = "descending";
        this.curView.tasks = this.orderTasks();
        this.render(parentEl);
      }
    });
  }

  orderTasks(
    tasks = this.curView.tasks,
    orderType = this.curView.order.name,
    orderDirection = this.curView.order.direction
  ) {
    this.curView.order.direction = orderDirection;
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
    this.curView.tasks = this.orderTasks(curTasks, "timeCreated", "ascending");
    this.eventListeners(parentEl);
    this.render(parentEl);
  }

  render(parentEl, view = this.curView, id = this.id) {
    this.tasksComponentView.render(parentEl, view, id);
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
    taskCard.taskCardModel = doc.data();
    taskCard.taskCardModel.id = doc.id;
    const localTimeTracked = localStorage.getItem(`timeElapsed-${doc.id}`);
    if (localTimeTracked) {
      taskCard.taskCardModel.timeTracked = localTimeTracked;
    }
    curTasks.push(taskCard);
    // filter tasks
    if (taskCard.taskCardModel.startDate) {
      if (taskCard.taskCardModel.repeat.type === "daily") {
        const everyOtherDay = taskCard.taskCardModel.repeat.everyOtherDay;
        addTasksOtherDayFilter(everyOtherDay, taskCard);
        return;
      }
      if (taskCard.taskCardModel.repeat.type === "weekly") {
        const days = taskCard.taskCardModel.repeat.days;
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
