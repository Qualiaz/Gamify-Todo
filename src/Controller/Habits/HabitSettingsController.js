import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import HabitModel, { allHabits } from "../../Model/main/HabitModel";
import HabitSettingsView from "../../View/main/habits/HabitSettingsView";
import HabitCardController from "./HabitCardController";

const main = document.getElementById("main");
export default class HabitSettingsController {
  constructor(model) {
    this.view = new HabitSettingsView();
    this.model = model || new HabitModel();
  }

  eventListeners() {
    const {
      habitSettingsContainer,
      habitSettingsEnergy,
      habitSettingsDifficulty,
    } = this.view.getElems();

    const newHabit = () => {
      let { habitSettingsForm } = this.view.getElems();
      habitSettingsForm.addEventListener("click", (e) => {
        const clickedId = e.target.id;
        if (clickedId === "habitSettingsDoneBtn") {
          this.model.initHabit().then(() => {
            const habitCard = new HabitCardController();
            habitCard.model = this.model;
            habitCard.settingsController = this;
            this.model.isCardCreated = true;
            console.log(habitCard.model.habitData);
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

      habitSettingsForm.addEventListener("click", (e) => {
        const clickedId = e.target.id;
        if (clickedId === `habitSettingsDoneBtn-${this.model.habitData.id}`) {
          const {
            name,
            notes,
            difficulty,
            energy,
            projectAssociated,
            streakPositive,
            streakNegative,
          } = this.model.getValuesForm();

          this.model.changeHabit({
            name,
            notes,
            difficulty,
            energy,
            projectAssociated,
            streakPositive,
            streakNegative,
          });

          this.model.updateHabitDb();
          this.habitCard.view.renderChanges(this.model.habitData);
          //the check also occurs in modal but if is true it must remove element sync
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

  initChangeHabit(data) {
    this.view.renderExistingHabit(data || this.model.habitData);
    this.view.renderChangesInEnergyDisplay(
      data.energy || this.model.habitData.energy
    );
    this.model.setElems(this.view.getElems(data.id || this.model.habitData.id));
    this.model.setValuesForm();
    this.eventListeners();
  }

  initAddHabit() {
    this.view.render();
    this.model.setElems(this.view.getElems());
    this.eventListeners();
  }
}
