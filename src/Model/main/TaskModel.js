import Timer from "easytimer.js";
import {
  addDoc,
  collection,
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

export const curTasks = [];
export const curTasksToday = [];
export const curTasksTomorrow = [];
export const curTasksThisWeek = [];
export const curTasksWhenever = [];
const root = document.getElementById("root");

export class TaskSettingsModel {
  state = {
    curCpId: 1,
  };

  setValues() {
    console.log(this.state);
  }

  incrementCurCpId() {
    return ++this.state.curCpId;
  }

  isCpElemFocusedLast(cpEl) {
    const curCpCont = cpEl.closest(".checkpoint__container");
    return curCpCont.nextElementSibling ? false : true;
  }

  getTasksCol() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colTasksRef = collection(docUserRef, "tasks");

    return colTasksRef;
  }

  closeSettings() {
    this.state.curCpId = 1;
    root.removeChild(root.children[0]);
  }
  //prettier-ignore
  async addTask({ name,notes,startDate,difficulty,energy,repeat,repeatDaily,daysOfWeek,cps}) {
    const colTasksRef = this.getTasksCol()
    
    if (!this.validFormCheck(name, repeatDaily).ok) return

    const taskCardController = new TaskCardController();
    taskCardController.model.addTaskDataCardState({name, notes, startDate, repeat,repeatDaily,daysOfWeek, difficulty, energy, cps})

    this.state = taskCardController.model.cardState
    const taskData = Object.assign({}, taskCardController.model.cardState)

    const taskDataDb = this.addDocDb(taskCardController, taskData, colTasksRef)
    taskDataDb.then((data) => {
      taskCardController.model.cardState.id = data.id
      taskCardController.view.render(tasksComponent, data)
      taskCardController.eventListeners()
    })
    this.state.curCpId = 1
    root.removeChild(root.children[0]);
    // TO BE MOVED
    const tasksComponent = document.querySelector('.TM__component__tasks--tasksMenu')
    //    
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

  setEnergyRange(difficulty, energy, energyValueDisplay) {
    const setEnergyValues = (min, max) => {
      energy.min = min.toString();
      energy.max = max.toString();
      energy.value = min.toString();
      energyValueDisplay.textContent = min.toString();
      console.log(energy.value);
      console.log(energyValueDisplay.textContent);
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
      "taskSettingsRepeatDailyFail"
    );
    const taskSettingsRepeat = document.getElementById("taskSettingsRepeat");

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

  getValues(getElems) {
    //prettier-ignore
    let {name, repeat, difficulty, energy, weekly, repeatDaily, notes, startDate} = getElems
    const daysOfWeek = [];
    const cps = [];

    Array.from(weekly).forEach((day) => {
      daysOfWeek.push(day.value);
    });

    for (let i = 0; i < checkpointsContainer.children.length; i++) {
      cps.push(checkpointsContainer.children[i].children[0].value);
    }

    name = name.value;
    repeat = repeat.value;
    difficulty = difficulty.value;
    energy = energy.value;
    repeatDaily = repeatDaily.value;
    notes = notes.value;
    startDate = startDate.value.replace("-", "/").replace("-", "/");

    return {
      name,
      notes,
      startDate,
      difficulty,
      energy,
      repeat,
      repeatDaily,
      daysOfWeek,
      cps,
    };
  }
}

export default class TaskCardModel {
  #stopwatch = new Timer();
  cardState = {
    checked: false,
    timeTracked: "00:00:00",
    checkpoints: [],
    isInfoToggled: true,
    isTimerToggled: false,
  };

  addTaskDataCardState({
    name,
    notes,
    startDate,
    repeat,
    repeatDaily,
    daysOfWeek,
    difficulty,
    energy,
    cps,
  }) {
    this.cardState.name = name;
    this.cardState.startDate = startDate;
    this.cardState.repeat = repeat;
    this.cardState.difficulty = difficulty;
    this.cardState.energy = energy;
    this.cardState.notes = notes;
    this.addRepeatDataCardState({ daysOfWeek, repeatDaily });
    cps.forEach((cp) => {
      if (!cp) return;
      this.addCpDataCardState(cp);
    });

    return this.cardState;
  }

  addCpDataCardState = (name) => {
    this.cardState.checkpoints.push({
      checked: false,
      name: name,
    });
  };

  addRepeatDataCardState = ({ daysOfWeek, repeatDaily }) => {
    if (this.cardState.repeat === "weekly") {
      this.cardState.repeat = {
        type: "weekly",
        days: daysOfWeek,
      };
    }
    if (this.cardState.repeat === "daily") {
      this.cardState.repeat = {
        type: "daily",
        everyOtherDay: Number(repeatDaily),
      };
    }
    if (this.cardState.repeat === "no-repeat") {
      this.cardState.repeat = false;
    }
  };

  checkCheckpoint(clickedId, isChecked) {
    if (isChecked) {
      // console.log(this.cardState);
      this.cardState.checkpoints.forEach((cp) => {
        // if (cp.id === clickedId.replace("Unfinished", "")) {
        cp.checked = true;
        this.sendToDb.updateIsCpChecked(true, clickedId, this.cardState.id);
        // }
      });
    }
    //
    else {
      this.cardState.checkpoints.forEach((cp) => {
        // if (cp.id === clickedId.replace("Finished", "")) {
        cp.checked = false;
        this.sendToDb.updateIsCpChecked(false, clickedId, this.cardState.id);
        // }
      });
    }
  }

  // _generateCpId() {
  //   let numId = 0;
  //   this.model.cardState.checkpoints.forEach((cp) => {
  //     cp.id = `cardCheckpoint-${numId}-${this.model.id}`;
  //     numId++;
  //   });
  // }

  checkTask(isChecked, id = this.cardState.id) {
    this.cardState.checked = isChecked;
    this.sendToDb.updateChecked(isChecked, id);
  }

  openTaskSettings() {
    const taskSettingsState = this.taskSettingsController.model.state;
    this.taskSettingsController.init(taskSettingsState);
  }

  // MOVE TO VIEW
  toggleTimer(id = this.cardState.id) {
    console.log(this.cardState.isTimerToggled);
    console.log(id);
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
