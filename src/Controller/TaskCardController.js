import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TaskModel, { curTasks } from "../Model/main/TaskModel";
import TaskCardView from "../View/main/tasks/TaskCardView";
import Timer from "easytimer.js";
import { openTaskSettings } from "./Tasks/AddTaskController";

export default class TaskCardController {
  constructor() {
    this.view = new TaskCardView();
    this.model = new TaskModel();
  }

  eventListeners() {
    const id = this.model.cardState.id;
    // console.log(id);
    const taskCardContainer = document.getElementById(`taskCard-${id}`);
    taskCardContainer.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      console.log(clickedId);
      if (clickedId === `taskCard-${id}`) {
        console.log("hi");
      }
      if (clickedId === `taskCardTop-${id}`) {
        this.model.openTaskSettings();
      }
      if (clickedId === `taskCheckboxUnfinished-${id}`) {
        this.model.checkTask(true);
        this.view.renderToggleCheckTask(id);
      }
      if (clickedId === `taskCheckboxFinished-${id}`) {
        this.model.checkTask(false);
        this.view.renderToggleCheckTask(id);
      }
      if (clickedId === `cardToggleIcon-${id}`) {
        this.model.toggleInfo();
        this.view.renderToggleInfo(id);
      }
      if (clickedId === `cardTimerIcon-${id}`) {
        this.model.toggleTimer();
        this.view.renderToggleTimer(id);
      }
      if (clickedId === `playTimer-${id}`) {
        this.model.playTime(this.view);
      }
      if (clickedId === `pauseTimer-${id}`) {
        this.model.pauseTime(this.view);
      }
      if (
        clickedId.startsWith("cardCheckpointUnfinished") &&
        clickedId.endsWith(id)
      ) {
        this.model.checkCheckpoint(clickedId, true);
        this.view.renderToggleCheckCp(clickedId);
      }
      if (
        clickedId.startsWith("cardCheckpointFinished") &&
        clickedId.endsWith(id)
      ) {
        this.model.checkCheckpoint(clickedId, false);
        this.view.renderToggleCheckCp(clickedId);
      }
    });
  }
}

export function getTask(id) {
  console.log(id);
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTasksRef = collection(docUserRef, "tasks");
  const docTaskRef = doc(colTasksRef, id);
  console.log(docTaskRef);
  return docTaskRef;
}
