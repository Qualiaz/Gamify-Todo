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
import OrderTask from "../../helpers/orderTask";
import TaskCardController, {
  getTask,
} from "../../Controller/TaskCardController";
import { auth, db } from "../../firebase/config";
import TaskSettingsController from "../../Controller/Tasks/AddTaskController";
import Model from "./Model";
import { removeDuplicateTasks } from "../../helpers/removeDuplicate";

export const curTasks = [];
export let curTasksToday = [];
export let curTasksTomorrow = [];
export let curTasksThisWeek = [];
export let curTasksWhenever = [];

export class TaskSettingsModel extends Model {
  state = {};
  constructor(tasksComponentController) {
    super();
    // this.state = state;
    this.tasksComponentController = tasksComponentController;
  }

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
    if (!this.validFormCheck(name, repeatEveryOtherDay).ok) return
    //  
    const taskCardController = new TaskCardController();
    taskCardController.model.obs.sub(this.tasksComponentController)
    taskCardController.model.addTaskDataCardState({name, notes, startDate, repeat,repeatEveryOtherDay,repeatEveryWeek, difficulty, energy, cps})

    // when you open tasks you set state to the card controller model
    this.state = taskCardController.model.cardState

    const taskData = Object.assign({}, taskCardController.model.cardState)
    const taskDataDb = this.addDocDb(taskCardController, taskData, colTasksRef)
    
    taskDataDb.then((data) => {
      taskCardController.model.cardState.id = data.id

      curTasks.push(taskCardController)      
      taskCardController.model.obs.notify(taskCardController.model.cardState)
    })

    this.state.curCpId = 1
  
    return taskCardController
  }

  async addDocDb(taskCardController, taskData, colTaskRef) {
    return addDoc(colTaskRef, taskData).then((doc) => {
      taskCardController.model.cardState.id = doc.id;
      if (document.getElementById(`taskCard-${doc.id}`)) return;
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

  constructor() {
    super();
    this.observers = [];
  }

  cardState = {
    checked: false,
    timeTracked: "00:00:00",
    checkpoints: [],
    isInfoToggled: true,
    isTimerToggled: false,
    repeat: {
      type: "no-repeat",
      // every-other-day - weekly:
    },
  };

  obs = {
    sub: (obs) => {
      this.observers.push(obs);
    },
    notify: (data) => {
      this.observers.forEach((obs) => {
        console.log(this.observers);
        obs.update(data);
      });
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

    this.obs.notify(this.cardState);

    return this.cardState;
  }

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
    this.obs.notify();

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

  addCpDataCardState = (name) => {
    this.cardState.checkpoints.push({
      checked: false,
      name: name,
    });
  };

  /////
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
    this.taskSettingsController.init(this.taskSettingsController.model.state);
  }

  createTaskSettingsController() {
    this.taskSettingsController = new TaskSettingsController(this.cardState);
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
      updateDoc(docTaskRef, {
        checkpoints: cpsData,
      });
    },
  };
}

export class TasksComponentModel extends Model {
  state = {};
  constructor(tasks, menu, filter) {
    super();
    //prettier-ignore
    this.state.id = (((1 + Math.random()) * 0x10000) | 0)
      .toString(4)
      .substring(1),
    //prettier-ignore
    this.state.tasks = tasks;
    this.state.menu = menu;
    this.state.filter = filter;
    this.state.order = {
      name: "timeCreated",
      direction: "descending",
    };
    this.state.isTaskViewOpen;
  }

  //// VIEW CHANGE ////
  setFilterState(optionEl) {
    if (optionEl === "tomorrow") {
      let tasksTomorrow = removeDuplicateTasks(curTasksTomorrow);
      this.state.tasks = tasksTomorrow;
      this.state.filter = "tomorrow";
    }
    if (optionEl === "today") {
      let tasksToday = removeDuplicateTasks(curTasksToday);
      this.state.tasks = tasksToday;
      this.state.filter = "today";
    }
    if (optionEl === "thisWeek") {
      let tasksThisWeek = removeDuplicateTasks(curTasksThisWeek);
      this.state.tasks = tasksThisWeek;
      this.state.filter = "thisWeek";
    }
    if (optionEl === "whenever") {
      let tasksWhenever = removeDuplicateTasks(curTasksWhenever);
      this.state.tasks = tasksWhenever;
      this.state.filter = "whenever";
    }
    if (optionEl === "all") {
      let tasksAll = removeDuplicateTasks(curTasks);
      this.state.tasks = tasksAll;
      this.state.filter = "all";
    }
  }

  arrangeTasksInArrays() {
    curTasksToday = [];
    curTasksTomorrow = [];
    curTasksThisWeek = [];
    curTasksWhenever = [];

    curTasks.forEach((task) => {
      this.filterTask(task);
    });
  }

  setOrderTasks(option) {
    if (option === "difficulty") this.state.order.name = "difficulty";
    if (option === "energy") this.state.order.name = "energy";
    if (option === "timeCreated") this.state.order.name = "timeCreated";
  }

  orderTasks(
    tasks = this.state.tasks,
    orderType = this.state.order.name,
    orderDirection = this.state.order.direction
  ) {
    const tasksOrderInst = new OrderTask(tasks);

    if (orderType === "difficulty") {
      const orderedTasks = tasksOrderInst.difficulty(orderDirection);
      this.state.tasks = orderedTasks;
      // return orderedTasks;
    }
    if (orderType === "energy") {
      const orderedTasks = tasksOrderInst.energy(orderDirection);
      this.state.tasks = orderedTasks;
      // return orderedTasks;
    }
    if (orderType === "timeCreated") {
      const orderedTasks = tasksOrderInst.timeCreated(orderDirection);
      this.state.tasks = orderedTasks;
      // return orderedTasks;
    }
  }

  resetState() {
    if (this.state.menu === "tasks") {
      this.state.filter = "all";
      this.state.name = "timeCreated";
      this.state.order.direction = "descending";
      this.state.order.name = "timeCreated";
      this.state.tasks = curTasks;
    }
    if (this.state.menu === "dashboard") {
      this.state.filter = "today";
      this.state.name = "timeCreated";
      this.state.order.direction = "descending";
      this.state.order.name = "timeCreated";
      this.state.tasks = curTasksToday;
    }
  }
}
