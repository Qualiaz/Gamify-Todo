import {
  addDoc,
  collection,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import TaskCardController from "../../Controller/TaskCardController";
import { auth, db } from "../../firebase/config";

export const curTasks = [];
export const curTasksToday = [];
export const curTasksTomorrow = [];
export const curTasksThisWeek = [];
export const curTasksWhenever = [];

export class TaskSettingsModel {
  state = {
    curCpId: 1,
  };

  setValue() {}

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

  //prettier-ignore
  addTask({ name,notes,startDate,difficulty,energy,repeat,repeatDaily,daysOfWeek,cps,}) {
    const colTasksRef = this.getTasksCol()
    
    const taskCardController = new TaskCardController();
    taskCardController.model.addTaskDataCardState({name, notes, startDate, repeat,repeatDaily,daysOfWeek, difficulty, energy, cps})

    this.state = taskCardController.model.cardState
    const taskData = Object.assign({}, taskCardController.model.cardState)

    this.addDocDb(taskCardController, taskData, colTasksRef)
    
    return taskCardController
  }

  addDocDb(taskCardController, taskData, colTaskRef) {
    addDoc(colTaskRef, taskData).then((doc) => {
      taskCardController.model.id = doc.id;
      if (document.getElementById(`taskCard-${doc.id}`)) return;
      curTasks.push(taskCardController);
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
    console.log(repeat);
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
    console.log(repeatDaily);
    console.log(daysOfWeek);

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
    console.log(this.cardState);
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
}
