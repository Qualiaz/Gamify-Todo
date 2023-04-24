import Timer from "easytimer.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import TaskCardController, {
  getTask,
} from "../../Controller/TaskCardController";
import { auth, db } from "../../firebase/config";
import TaskSettingsController from "../../Controller/Tasks/AddTaskController";
import Model from "./Model";

export const curTasks = [];
export const curTasksToday = [];
export const curTasksTomorrow = [];
export const curTasksThisWeek = [];
export const curTasksWhenever = [];

export class TaskSettingsModel {
  // state = {
  //   curCpId: 1,
  // };

  // incrementCurCpId() {
  //   return ++this.state.curCpId;
  // }

  isCpElemFocusedLast(cpEl) {
    const curCpCont = cpEl.closest(".task-settings__checkpoint");
    return curCpCont.nextElementSibling ? false : true;
  }

  getCurCpId() {
    const cpsContainer = document.getElementById(
      "taskSettingsCheckpointsContainer"
    );
    return ++cpsContainer.lastElementChild.id.split("-")[1];
  }

  getTasksCol() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colTasksRef = collection(docUserRef, "tasks");

    return colTasksRef;
  }

  resetCurCpId() {
    this.state.curCpId = 1;
  }
  //prettier-ignore
  async addTask({ name,notes,startDate,difficulty,energy,repeat,repeatEveryOtherDay,repeatEveryWeek,cps}) {
    const colTasksRef = this.getTasksCol()
    console.log( repeatEveryWeek)
    if (!this.validFormCheck(name, repeatEveryOtherDay).ok) return
    // TO BE MOVED
    const tasksComponentTasksMenu = document.querySelector('.TM__component__tasks--tasksMenu')
    const tasksComponentDashboardMenu = document.querySelector('.TM__component__tasks--dashboardMenu')
    //  
    const taskCardController = new TaskCardController();
    taskCardController.model.addTaskDataCardState({name, notes, startDate, repeat,repeatEveryOtherDay,repeatEveryWeek, difficulty, energy, cps})

    this.state = taskCardController.model.cardState
    const taskData = Object.assign({}, taskCardController.model.cardState)

    const taskDataDb = this.addDocDb(taskCardController, taskData, colTasksRef)
    taskDataDb.then((data) => {
      taskCardController.model.cardState.id = data.id
      if (tasksComponentTasksMenu)
        taskCardController.view.render(tasksComponentTasksMenu, data)
      if (tasksComponentDashboardMenu)
        taskCardController.view.render(tasksComponentDashboardMenu, data)  
      taskCardController.eventListeners()
    })

    this.state.curCpId = 1
    return taskCardController
  }

  async addDocDb(taskCardController, taskData, colTaskRef) {
    return addDoc(colTaskRef, taskData).then((doc) => {
      taskCardController.model.cardState.id = doc.id;
      if (document.getElementById(`taskCard-${doc.id}`)) return;
      curTasks.push(taskCardController);
      return taskCardController.model.cardState;
    });
  }

  removeDocDb() {
    const taskRef = getTask(this.state.id);
    deleteDoc(taskRef);
  }

  updateTaskDb(cardState) {
    const docTaskRef = getTask(this.state.id);
    updateDoc(docTaskRef, cardState);
  }

  setEnergyRange(difficulty, energy, energyValueDisplay) {
    const setEnergyValues = (min, max) => {
      energy.min = min.toString();
      energy.max = max.toString();
      energy.value = min.toString();
      energyValueDisplay.textContent = min.toString();
    };

    switch (difficulty.value) {
      case "trivial":
        setEnergyValues(1, 6);
        break;
      case "easy":
        setEnergyValues(7, 19);
        break;
      case "medium":
        setEnergyValues(20, 59);
        break;
      case "hard":
        setEnergyValues(60, 99);
        break;
      case "challenge":
        setEnergyValues(100, 200);
        break;
    }
  }

  validFormCheck(name, repeatDaily) {
    const nameCheckFail = document.getElementById("taskSettingsNameCheckFail");
    const repeatDailyFail = document.getElementById(
      "taskSettingsRepeatCheckFail"
    );
    const taskSettingsRepeat = document.getElementById(
      "taskSettingsRepeatSelect"
    );

    let ok = true;
    let check = {
      name: true,
      repeatDaily: true,
    };

    if (name) {
      console.log(nameCheckFail);
      console.log(repeatDaily);
      check.name = true;
      nameCheckFail.classList.add("hidden");
    } else {
      check.name = false;
      nameCheckFail.classList.remove("hidden");
    }

    if (taskSettingsRepeat.value === "daily") {
      if (repeatDaily.match(/^[0-9]+$/)) {
        check.repeatDaily = true;
        repeatDailyFail.classList.add("hidden");
      } else {
        check.repeatDaily = false;
        repeatDailyFail.classList.remove("hidden");
      }
    }

    Object.values(check).forEach((value) => {
      if (!value) ok = false;
    });

    return { ok };
  }
}

export default class TaskCardModel extends Model {
  #stopwatch = new Timer();
  cardState = {
    checked: false,
    timeTracked: "00:00:00",
    checkpoints: [],
    isInfoToggled: true,
    isTimerToggled: false,
    repeat: {
      type: "no-repeat",
    },
  };

  addTaskDataCardState({
    name,
    notes,
    startDate,
    repeat,
    repeatEveryOtherDay,
    repeatEveryWeek,
    difficulty,
    energy,
    cps,
  }) {
    this.cardState.name = name;
    this.cardState.startDate = startDate;
    this.cardState.repeat.type = repeat;
    this.addRepeatDataCardState({ repeatEveryWeek, repeatEveryOtherDay });
    this.cardState.difficulty = difficulty;
    this.cardState.energy = energy;
    this.cardState.notes = notes;

    cps.forEach((cp) => {
      if (!cp) return;
      this.addCpDataCardState(cp);
    });
    this.cardState.createdTime = new Date().getTime();
    return this.cardState;
  }

  addCpDataCardState = (name) => {
    this.cardState.checkpoints.push({
      checked: false,
      name: name,
    });
  };

  setCardState(data) {
    this.cardState.name = data.name;
    this.cardState.notes = data.notes;
    this.cardState.repeat.type = data.repeat;
    this.addRepeatDataCardState(data.repeat);
    this.cardState.energy = data.energy;
    this.cardState.difficulty = data.difficulty;
    this.cardState.startDate = data.startDate;
    this.cardState.checkpoints = [];
    data.cps.forEach((cpName) => {
      this.addCpDataCardState(cpName);
    });
    this.addRepeatDataCardState(data);

    return this.cardState;
  }

  addRepeatDataCardState = ({ repeatEveryWeek, repeatEveryOtherDay }) => {
    if (this.cardState.repeat.type === "weekly") {
      this.cardState.repeat.daysOfWeek = repeatEveryWeek;
    } else if (this.cardState.repeat.type === "every-other-day") {
      this.cardState.repeat.everyOtherDay = Number(repeatEveryOtherDay);
    } else {
      // reset whole object
      this.cardState.repeat.type = "no-repeat";
    }
  };

  checkCheckpoint(clickedId, isChecked) {
    if (isChecked) {
      this.cardState.checkpoints.forEach((cp) => {
        cp.checked = true;
        this.sendToDb.updateIsCpChecked(true, clickedId, this.cardState.id);
      });
    }
    //
    else {
      this.cardState.checkpoints.forEach((cp) => {
        cp.checked = false;
        this.sendToDb.updateIsCpChecked(false, clickedId, this.cardState.id);
      });
    }
  }

  deleteTask() {
    const index = this.findTaskIndexInArr();
    const deletedTask = curTasks.splice(index, 1);
    return deletedTask;
  }

  findTaskIndexInArr() {
    const taskIndex = curTasks.findIndex((task, i) => {
      return task.model.cardState.id === this.cardState.id;
    });
    return taskIndex;
  }

  async checkTask(isChecked, id = this.cardState.id) {
    this.cardState.checked = isChecked;
    this.sendToDb.updateChecked(isChecked, id);
    await this.initEnergy();
  }

  openTaskSettings() {
    const taskSettingsState = this.taskSettingsController.model.state;
    console.log(taskSettingsState);
    this.taskSettingsController.init(taskSettingsState);
  }

  createTaskSettingsController() {
    this.taskSettingsController = new TaskSettingsController();
    this.taskSettingsController.model.state = this.cardState;
    return this.taskSettingsController;
  }

  toggleTimer(id = this.cardState.id) {
    if (!this.cardState.isTimerToggled) {
      this.cardState.isTimerToggled = true;
      this.sendToDb.updateIsTimerToggled(true, id);
    } else {
      this.cardState.isTimerToggled = false;
      this.sendToDb.updateIsTimerToggled(false, id);
    }
  }

  toggleInfo(id = this.cardState.id) {
    if (this.cardState.isInfoToggled) {
      this.cardState.isInfoToggled = true;
      this.sendToDb.updateIsInfoToggled(true, id);
    } else {
      this.cardState.isInfoToggled = false;
      this.sendToDb.updateIsInfoToggled(false, id);
    }
  }

  playTime(cardView) {
    this.#stopwatch.start({
      precision: "seconds",
      startValues: {
        seconds: this.cardState.timeTracked.split(":")[2],
        minutes: this.cardState.timeTracked.split(":")[1],
        hours: this.cardState.timeTracked.split(":")[0],
      },
      callback: (stopwatch) => {
        const timeValuesStr = stopwatch.getTimeValues().toString();
        const timeValues = stopwatch.getTimeValues();

        localStorage.setItem(`timeElapsed-${this.cardState.id}`, timeValues);
        this.cardState.timeTracked = timeValuesStr;
        cardView.renderPlayTimer(this.cardState.id);
      },
    });
  }

  pauseTime(cardView) {
    this.#stopwatch.pause();
    const timeValuesStr = this.#stopwatch.getTimeValues().toString();
    this.sendToDb.updateTimeTracked(timeValuesStr, this.cardState.id);
    cardView.renderPauseTimer(this.cardState.id);
  }

  sendToDb = {
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
      console.log(docTaskRef);
      updateDoc(docTaskRef, {
        isInfoToggled: isToggled,
      });
    },
    updateIsTimerToggled(isToggled, id) {
      console.log("timer toggle");
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
      console.log(cpsData);
      updateDoc(docTaskRef, {
        checkpoints: cpsData,
      });
    },
  };
}
