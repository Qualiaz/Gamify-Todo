export default class TaskModel {
  checked = false;
  timeTracked = "time tracked";
  checkpoints = [];

  constructor(name, startDate, repeat, difficulty) {
    this.name = name;
    this.startDate = startDate;
    this.repeat = repeat;
    this.difficulty = difficulty;
  }

  addCp(name) {
    this.checkpoints.push({
      checked: false,
      name: name,
    });
  }
}
