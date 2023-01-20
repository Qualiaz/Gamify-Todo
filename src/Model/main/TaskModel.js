export const curTasks = [];

export default class TaskModel {
  checked = false;
  timeTracked = { isPlaying: false, tracked: "00:00:00" };
  checkpoints = [];
  isInfoToggled = true;
  isTimerToggled = false;

  constructor(name, startDate, repeat, difficulty, energy) {
    this.name = name;
    this.startDate = startDate;
    this.repeat = repeat;
    this.difficulty = difficulty;
    this.energy = energy;
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
