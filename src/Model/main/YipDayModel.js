export default class YipDayModel {
  state = {};

  constructor() {
    this.state.date = "Today pixel";
    this.state.viewMode = "edit";
    this.state.logTitle = "Today's title";
    this.state.log = "What have you been up to?";
    this.state.moodColor = "#42BFDD";
  }

  changeDate(date) {
    this.state.date = date + " pixel";
  }

  changeViewMode() {
    if (this.state.viewMode === "view") {
      this.state.viewMode === "edit";
    } else {
      this.state.viewMode === "view";
    }
  }

  changeLogTitle(title) {
    this.state.logTitle = title;
  }

  changeLog(log) {
    this.state.log = log;
  }

  changeMoodColor(color) {
    this.state.moodColor = color;
  }

  getMoodColor(color) {
    if (color === "awful") {
      return "#181116";
    }
    if (color === "sad") {
      return "#891A29";
    }
    if (color === "good") {
      return "#5B9A63";
    }
    if (color === "ok") {
      return "#42BFDD";
    }
    if (color === "amazing") {
      return "#F9B624";
    }
  }
}
