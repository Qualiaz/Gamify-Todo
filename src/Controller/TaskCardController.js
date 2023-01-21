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
  #stopwatch = new Timer();

  eventListeners() {
    const taskCardContainer = document.getElementById(
      `taskCard-${this.taskCardModel.id}`
    );
    const root = document.getElementById("root");
    taskCardContainer.addEventListener("click", (e) => {
      const id = this.taskCardModel.id;
      const clickedId = e.target.id;
      if (clickedId === `taskCheckboxUnfinished-${id}`) {
        this.checkTask(true);
        this.#sendToDb.updateChecked(true, id);
      }
      if (clickedId === `taskCheckboxFinished-${id}`) {
        this.checkTask(false);
        this.#sendToDb.updateChecked(false, id);
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

  playTime() {
    this.#stopwatch.start({
      precision: "seconds",
      startValues: {
        seconds: this.taskCardModel.timeTracked.split(":")[2],
        minutes: this.taskCardModel.timeTracked.split(":")[1],
        hours: this.taskCardModel.timeTracked.split(":")[0],
      },
      callback: (stopwatch) => {
        const timeValuesStr = stopwatch.getTimeValues().toString();
        const timeValues = stopwatch.getTimeValues();

        localStorage.setItem(
          `timeElapsed-${this.taskCardModel.id}`,
          timeValues
        );
        this.taskCardModel.timeTracked = timeValuesStr;
        this.taskCardView.renderPlayTimer(this.taskCardModel.id);
      },
    });
  }

  pauseTime() {
    this.#stopwatch.pause();
    const timeValuesStr = this.#stopwatch.getTimeValues().toString();

    this.taskCardView.renderPauseTimer(this.taskCardModel.id);
    this.#sendToDb.updateTimeTracked(timeValuesStr, this.taskCardModel.id);
  }

  toggleInfo(id = this.taskCardModel.id) {
    const isToggled = this.taskCardView.renderToggleInfo(id);
    if (isToggled) {
      this.taskCardModel.isInfoToggled = true;
      this.#sendToDb.updateIsInfoToggled(true, this.taskCardModel.id);
    } else {
      this.taskCardModel.isInfoToggled = false;
      this.#sendToDb.updateIsInfoToggled(false, this.taskCardModel.id);
    }
  }

  toggleTimer(id = this.taskCardModel.id) {
    const isToggled = this.taskCardView.renderToggleTimer(id);
    if (isToggled) {
      this.taskCardModel.isTimerToggled = true;
      this.#sendToDb.updateIsTimerToggled(true, this.taskCardModel.id);
    } else {
      this.taskCardModel.isTimerToggled = false;
      this.#sendToDb.updateIsTimerToggled(false, this.taskCardModel.id);
    }
  }

  checkCheckpoint(clickedId, isChecked) {
    if (isChecked) {
      this.taskCardModel.checkpoints.forEach((cp) => {
        if (cp.id === clickedId.replace("Unfinished", "")) {
          cp.checked = true;
          this.#sendToDb.updateIsCpChecked(
            true,
            clickedId,
            this.taskCardModel.id
          );
        }
      });
    }
    //
    else {
      this.taskCardModel.checkpoints.forEach((cp) => {
        if (cp.id === clickedId.replace("Finished", "")) {
          cp.checked = false;
          this.#sendToDb.updateIsCpChecked(
            false,
            clickedId,
            this.taskCardModel.id
          );
        }
      });
    }

    this.taskCardView.renderToggleCheckCp(clickedId);
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

  #sendToLocalStorage = {
    toggleInfo(isToggled, id) {
      localStorage.setItem(`taskCardInfoToggled-${id}`, isToggled);
    },
    toggleTimer(isToggled, id) {
      localStorage.setItem(`taskCardTimerToggled-${id}`, isToggled);
    },
  };

  #sendToDb = {
    updateChecked(isChecked, id) {
      const docTaskRef = getTask(id);
      updateDoc(docTaskRef, {
        checked: isChecked,
      });
    },
    updateTimeTracked(time, id) {
      const docTaskRef = getTask(id);
      updateDoc(docTaskRef, {
        timeTracked: time,
      });
    },
    updateIsInfoToggled(isToggled, id) {
      const docTaskRef = getTask(id);
      updateDoc(docTaskRef, {
        isInfoToggled: isToggled,
      });
    },
    updateIsTimerToggled(isToggled, id) {
      const docTaskRef = getTask(id);
      updateDoc(docTaskRef, {
        isTimerToggled: isToggled,
      });
    },
    async updateIsCpChecked(isChecked, clickedId, id) {
      const docTaskRef = getTask(id);
      const docTask = await getDoc(docTaskRef);
      const clickedNumId = clickedId.split("-")[1];

      const cpsData = docTask.data().checkpoints;
      const cpData = cpsData[clickedNumId];
      cpData.checked = isChecked;
      cpsData.splice(clickedNumId, 1, cpData);

      updateDoc(docTaskRef, {
        checkpoints: cpsData,
      });
    },
  };
}

export function getTask(id) {
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTasksRef = collection(docUserRef, "tasks");
  const docTaskRef = doc(colTasksRef, id);
  return docTaskRef;
}
