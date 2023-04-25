import HabitModel from "../../Model/main/HabitModel";
import HabitCardView from "../../View/main/habits/HabitCardView";
import HabitSettingsController from "./HabitSettingsController";

export default class HabitCardController {
  constructor() {
    this.view = new HabitCardView();
    this.model = new HabitModel();
    this.settingsController = new HabitSettingsController();
  }

  eventListeners() {
    const id = this.model.habitData.id;
    const habitCardEl = document.getElementById(`habitCard-${id}`);
    const habitCardPositiveBtn = document.getElementById(
      `habitCardPositiveBtn-${id}`
    );

    const habitCardNegativeBtn = document.getElementById(
      `habitCardNegativeBtn-${id}`
    );

    const habitCardPositiveStreak = document.getElementById(
      `habitCardPositiveStreak-${id}`
    );

    const habitCardNegativeStreak = document.getElementById(
      `habitCardNegativeStreak-${id}`
    );

    habitCardPositiveBtn.addEventListener("click", (e) => {
      const energyNav = document.getElementById("energyNav");
      habitCardPositiveStreak.innerText = `+ ${++this.model.habitData
        .streakPositive}`;
      this.model.updateHabitDb();
      this.model.initEnergy().then(() => {
        this.model.getDbEnergy().then((energy) => {
          this.view.initEnergyPopup(this.model.habitData.energy);
          energyNav.innerText = energy;
        });
      });
    });

    habitCardNegativeBtn.addEventListener("click", (e) => {
      habitCardNegativeStreak.innerText = `- ${++this.model.habitData
        .streakNegative}`;
      this.model.updateHabitDb();
    });

    habitCardEl.addEventListener("click", (e) => {
      if (e.target.id === `habitCardMainTop-${id}`) {
        // open card task settings
        console.log(this.model.habitData);
        this.settingsController.initChangeHabit(this.model.habitData);
        this.settingsController.habitCard = this;
      }

      if (e.target.id === `habitCardToggleImgBtn-${id}`) {
        this.model.habitData.isCardToggle = !this.model.habitData.isCardToggle;
        this.view.toggleCard(id, this.model.habitData.isCardToggle);
        this.model.setLocalStorage();
        this.model.updateHabitDb();
      }
    });
  }

  render() {
    const container = document.querySelector(".habits-component__container");
    // const cardState = this.model.getLocalStorage();
    // console.log(this.model.habitData);
    // if (!!cardState) {
    //   this.view.render(container, cardState);
    // } else {
    // }
    this.view.render(container, this.model.habitData);
  }

  init() {
    console.log(this.model.habitData);
    this.render();
    this.eventListeners();
  }
}
