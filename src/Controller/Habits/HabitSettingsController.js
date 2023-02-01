import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import HabitModel, { allHabits } from "../../Model/main/HabitModel";
import HabitSettingsView from "../../View/main/habits/HabitSettingsView";
import HabitCardController from "./HabitCardController";

const main = document.getElementById("main");
export default class HabitSettingsController {
  constructor() {
    this.view = new HabitSettingsView();
    this.model = new HabitModel();
  }

  eventListeners() {
    const {
      habitSettingsContainer,
      habitSettingsEnergy,
      habitSettingsDifficulty,
    } = this.view.getElems();
    console.log(habitSettingsContainer);

    const newHabit = () => {
      let { habitSettingsForm } = this.view.getElems();
      habitSettingsForm.addEventListener("click", (e) => {
        const clickedId = e.target.id;
        if (clickedId === "habitSettingsDoneBtn") {
          this.model.initHabit().then(() => {
            const habitCard = new HabitCardController();
            habitCard.model = this.model;
            this.model.isCardCreated = true;
            habitCard.init();
          });
          //the check also occurs in modal but if is true it must remove element sync
          if (this.model.isFormChecks()) habitSettingsContainer.remove();
          else {
            this.view.renderFormError();
          }
        }
      });
    };

    const existingHabit = () => {
      const { habitSettingsForm } = this.view.getElems(this.model.habitData.id);
      console.log(habitSettingsForm);
      console.log(this.model.habitData.id);
      habitSettingsForm.addEventListener("click", (e) => {
        const clickedId = e.target.id;
        if (clickedId === `habitSettingsDoneBtn-${this.model.habitData.id}`) {
          if (this.model.isFormChecks()) habitSettingsContainer.remove();
          else {
            this.view.renderFormError();
          }
        }
      });
    };

    if (this.model.isCardCreated) existingHabit();
    else newHabit();

    habitSettingsContainer.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === "habitSettingsCancelBtn") {
        habitSettingsContainer.remove();
      }
    });

    habitSettingsDifficulty.querySelectorAll("option").forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(habitSettingsEnergy);
        const minValueDifficulty = this.model.changeEnergyValues(
          e.target.value
        );
        this.view.renderChangesInEnergyDisplay(minValueDifficulty);
      });
    });

    habitSettingsEnergy.addEventListener("input", (e) => {
      this.view.renderChangesInEnergyDisplay(e.target.value);
    });
  }

  initChangeHabit() {
    this.view.renderExistingHabit(this.model.habitData);
    this.model.setElems(this.view.getElems(this.model.habitData.id));
    this.eventListeners();
  }

  initAddHabit() {
    this.view.render();
    this.model.setElems(this.view.getElems());
    this.eventListeners();
  }
}
