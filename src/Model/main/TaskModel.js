import { collection, doc, getDocs } from "firebase/firestore";
import TaskCardController from "../../Controller/TaskCardController";
import { auth, db } from "../../firebase/config";

export const curTasks = [];
export const curTasksToday = [];
export const curTasksTomorrow = [];
export const curTasksThisWeek = [];
// export const curTasksFriday = [];
export const curTasksWhenever = [];

export default class TaskModel {
  checked = false;
  timeTracked = "00:00:00";
  checkpoints = [];
  isInfoToggled = true;
  isTimerToggled = false;

  constructor(name, notes, startDate, repeat, difficulty, energy) {
    this.name = name;
    this.startDate = startDate;
    this.repeat = repeat;
    this.difficulty = difficulty;
    this.energy = energy;
    this.notes = notes;
  }

  addCp(name) {
    this.checkpoints.push({
      checked: false,
      name: name,
    });
  }

  addRepeat(value) {
    if (this.repeat === "weekly") {
      this.repeat = {
        type: "weekly",
        days: value,
      };
    }
    if (this.repeat === "daily") {
      this.repeat = {
        type: "daily",
        everyOtherDay: Number(value),
      };
    }
    if (this.repeat === "no-repeat") {
      this.repeat = false;
    }
  }
}
