import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TaskModel, { curTasks } from "../Model/main/TaskModel";
import TaskCardView from "../View/main/tasks/TaskCardView";
import TasksMenuController from "../View/main/tasks/tasksMenuView";
import { renderCards, renderTasksMenu } from "./TasksMenuController";
import Timer from "easytimer.js";

export default class TaskCardController {
  taskCardView;
  taskCardModel;

  numId = 0;
  stopwatch = new Timer();

  playTime() {
    this.stopwatch.start({
      precision: "seconds",
      startValues: {
        seconds: this.taskCardModel.timeTracked.tracked.split(":")[2],
        minutes: this.taskCardModel.timeTracked.tracked.split(":")[1],
        hours: this.taskCardModel.timeTracked.tracked.split(":")[0],
      },
      callback: (stopwatch) => {
        const timeValuesStr = stopwatch.getTimeValues().toString();
        const timeValues = stopwatch.getTimeValues();

        localStorage.setItem(
          `timeElapsed-${this.taskCardModel.id}`,
          timeValues
        );
        this.taskCardModel.timeTracked.tracked = timeValuesStr;
        this.taskCardView.renderPlayTimer(this.taskCardModel.id);
      },
    });
  }

  pauseTime() {
    this.stopwatch.pause();
    this.taskCardView.renderPauseTimer(this.taskCardModel.id);
  }

  eventListeners() {
    const taskCardContainer = document.getElementById(
      `taskCard-${this.taskCardModel.id}`
    );
    taskCardContainer.addEventListener("click", (e) => {
      const id = this.taskCardModel.id;
      const clickedId = e.target.id;
      if (clickedId === `taskCheckboxUnfinished-${id}`) {
        this.checkTask(true);
      }
      if (clickedId === `taskCheckboxFinished-${id}`) {
        this.checkTask(false);
      }
      if (clickedId === `cardToggleIcon-${id}`) {
        this.toggleInfo();
      }
      if (clickedId === `cardTimerIcon-${id}`) {
        this.toggleTimer();
      }
      if (clickedId === `playTimer-${id}`) {
        this.playTime();
      }
      if (clickedId === `pauseTimer-${id}`) {
        this.pauseTime();
      }
      if (
        clickedId.startsWith("cardCheckpointUnfinished") &&
        clickedId.endsWith(id)
      ) {
        this.checkCheckpoint(clickedId, true);
      }
      if (
        clickedId.startsWith("cardCheckpointFinished") &&
        clickedId.endsWith(id)
      ) {
        this.checkCheckpoint(clickedId, false);
      }
    });
  }

  toggleInfo(id = this.taskCardModel.id) {
    const isToggled = this.taskCardView.renderToggleInfo(id);
    isToggled
      ? (this.taskCardModel.isInfoToggled = true)
      : (this.taskCardModel.isInfoToggled = false);
  }

  toggleTimer(id = this.taskCardModel.id) {
    const isToggled = this.taskCardView.renderToggleTimer(id);
    isToggled
      ? (this.taskCardModel.isTimerToggled = true)
      : (this.taskCardModel.isTimerToggled = false);
  }

  checkCheckpoint(clickedId, isChecked) {
    if (isChecked) {
      this.taskCardModel.checkpoints.forEach((cp) => {
        if (cp.id === clickedId.replace("Unfinished", "")) {
          cp.checked = true;
        }
      });
    } else {
      this.taskCardModel.checkpoints.forEach((cp) => {
        if (cp.id === clickedId.replace("Finished", "")) {
          cp.checked = false;
        }
      });
    }

    this.taskCardView.renderToggleCheckCp(clickedId);
    this.taskCardModel.checkpoints;
  }

  checkTask(isChecked, id = this.taskCardModel.id) {
    this.taskCardModel.checked = isChecked;
    this.taskCardView.renderToggleCheckTask(id);
  }

  render(parentEl, cardData = this.taskCardModel) {
    const taskCardView = new TaskCardView();
    taskCardView.render(parentEl, cardData);
    cardData.checkpoints.forEach((cp) => {
      taskCardView.renderCps(
        cp["name"],
        cp["checked"],
        this.numId,
        cardData.id
      );
      cp.id = `cardCheckpoint-${this.numId}-${cardData.id}`;
      this.numId++;
    });
    this.numId = 0;
    this.taskCardView = taskCardView;
  }
}

export function getTask(id) {
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTasksRef = collection(docUserRef, "tasks");
  const docTaskRef = doc(colTasksRef, id);
  return docTaskRef;
}
