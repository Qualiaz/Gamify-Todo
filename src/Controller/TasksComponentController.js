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

export let userId;
export let tasksComponentView;
export let curFilter = {};

export default class TasksComponentController {
  constructor(tasks) {
    this.tasksComponentView = new TasksComponentView();
    this.tasks = this.getTasks(tasks);
    this.id = (((1 + Math.random()) * 0x10000) | 0).toString(4).substring(1);
  }

  eventListeners(parentEl) {
    document.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === `addTaskBtn-${this.id}`) {
        addTaskControllerInit();
      }
      // TODAY
      if (clickedId === `filterBtn-${this.id}-today`) {
        let todayTasks = removeDuplicateTasks(curTasksToday);
        //prettier-ignore
        this.tasksComponentView.render(parentEl,"Today",todayTasks,this.id);
      }
      // TOMORROW
      if (clickedId === `filterBtn-${this.id}-tomorrow`) {
        //prettier-ignore
        this.tasksComponentView.render(parentEl,"Tomorrow",curTasksTomorrow,this.id);
      }
      // ALL
      if (clickedId === `filterBtn-${this.id}-all`) {
        this.tasksComponentView.render(parentEl, "All", curTasks, this.id);
      }
      // THIS WEEK
      if (clickedId === `filterBtn-${this.id}-thisWeek`) {
        let weekTasks = removeDuplicateTasks(curTasksThisWeek);
        //prettier-ignore
        this.tasksComponentView.render(parentEl, "This Week", weekTasks, this.id);
      }
      if (clickedId === `filterBtn-${this.id}-whenever`) {
        //prettier-ignore
        this.tasksComponentView.render(parentEl, "Whenever", curTasksWhenever, this.id);
      }
    });
  }

  getTasks(tasks) {
    this.tasks = tasks;
  }

  init(parentEl) {
    this.eventListeners(parentEl);
    this.tasksComponentView.render(parentEl, "All", curTasks, this.id);
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
