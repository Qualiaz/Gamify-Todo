import HabitSettingsView from "../../View/main/habits/HabitSettingsView";

const main = document.getElementById("main");
export default class HabitSettingsController {
  habit;

  constructor() {
    this.view = new HabitSettingsView();
  }

  change() {}
  add() {
    this.view.render(main);
    // this.view.renderAddHabit();
    this.view.renderChangeHabit();
  }

  getValuesForm() {}
  setValuesForm() {}

  _getElems() {}
  eventListeners() {}
}
