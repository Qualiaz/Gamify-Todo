import HabitModel from "../../Model/main/HabitModel";
import HabitSettingsView from "../../View/main/habits/HabitSettingsView";

const main = document.getElementById("main");
export default class HabitSettingsController {
  habit;

  constructor() {
    this.view = new HabitSettingsView();
  }

  eventListeners() {
    const habitSettings = document.getElementById("habitSettingsForm");
    habitSettings.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      console.log(clickedId);
      if (clickedId === "habitSettingsDoneBtn") {
        this.addHabit();
        console.log(HabitModel.allHabits);
      }
    });
  }

  _getElems() {
    const habitSettingsEl = document.querySelector(
      ".habit-settings__container"
    );
    const habitSettingsName = document.getElementById("habitSettingsName");
    const habitSettingsNotes = document.getElementById("habitSettingsNotes");
    const habitSettingsDifficulty = document.getElementById(
      "habitSettingsDifficulty"
    );
    const habitSettingsProjectAssociated = document.getElementById(
      "habitSettingsProjectAssociated"
    );
    const habitSettingsEnergy = document.getElementById("habitSettingsEnergy");
    return {
      habitSettingsEl,
      habitSettingsName,
      habitSettingsNotes,
      habitSettingsDifficulty,
      habitSettingsProjectAssociated,
      habitSettingsEnergy,
    };
  }

  change() {
    this.view.renderChangeHabit();
  }

  addHabit() {
    const { habitSettingsEl } = this._getElems();
    const habitData = this.getValuesForm();
    new HabitModel(habitData);

    habitSettingsEl.remove();
  }

  cancel() {}

  done() {}

  render() {
    this.view.render(main);
  }

  getValuesForm() {
    const {
      habitSettingsName,
      habitSettingsNotes,
      habitSettingsDifficulty,
      habitSettingsProjectAssociated,
      habitSettingsEnergy,
    } = this._getElems();

    const habitSettingsNameValue = habitSettingsName.value;
    const habitSettingsNotesValue = habitSettingsNotes.value;
    const habitSettingsDifficultyValue = habitSettingsDifficulty.value;
    const habitSettingsProjectAssociatedValue =
      habitSettingsProjectAssociated.value;
    const habitSettingsEnergyValue = habitSettingsEnergy.value;

    return {
      name: habitSettingsNameValue,
      notes: habitSettingsNotesValue,
      difficulty: habitSettingsDifficultyValue,
      projectAssociated: habitSettingsProjectAssociatedValue,
      energy: habitSettingsEnergyValue,
    };
  }

  setValuesForm() {}

  init() {
    this.eventListeners();
  }
}
