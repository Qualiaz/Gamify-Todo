import { collection, doc, documentId, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TasksMenuView from "../View/main/tasks/tasksMenuView";
import TaskCardController from "./TaskCardController";
import { onAuthStateChanged } from "firebase/auth";
import addTaskControllerInit from "./Tasks/AddTaskController";
import TaskCardView from "../View/main/tasks/TaskCardView";
import { curTasks } from "../Model/main/TaskModel";

export let userId;
const main = document.getElementById("main");
let unsubTasksDb;

function eventListeners() {
  document.addEventListener("click", (e) => {
    const clickedId = e.target.id;
    if (clickedId === "addTaskBtn") {
      addTaskControllerInit();
    }
    if (clickedId === "filterBtn") {
    }
  });
}

export function renderTasksMenu() {
  TasksMenuView.render(main);
  const tomorrowTasksCards = document.getElementById("tomorrowTasksCards");
  renderCards(tomorrowTasksCards);
}

export function renderCards(parentEl) {
  const interval = setInterval(() => {
    if (curTasks.length > 0) {
      console.log(curTasks);
      parentEl.innerHTML = "";
      curTasks.forEach((task) => {
        task.render(parentEl);
        task.eventListeners();
        unsubTasksDb();
        clearInterval(interval);
      });
    }
  }, 100);
}

export default function tasksMenuControllerInit() {
  createTasksFromDb();
  renderTasksMenu();
  eventListeners();
}

export function createTasksFromDb() {
  const docUserRef = doc(db, "users", localStorage.getItem("user"));
  const colTaskRef = collection(docUserRef, "tasks");

  unsubTasksDb = onSnapshot(colTaskRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      const taskCard = new TaskCardController();
      taskCard.taskCardModel = doc.data();
      taskCard.taskCardModel.id = doc.id;
      curTasks.push(taskCard);
    });
  });
}
