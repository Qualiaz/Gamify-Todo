import HabitModel from "../../Model/main/HabitModel";
import HabitCardView from "../../View/main/habits/HabitCardView";
import HabitSettingsController from "./HabitSettingsController";

export default class HabitCardController {
  constructor() {
    this.view = new HabitCardView();
    this.model;
  }

  eventListeners() {
    const id = this.model.habitData.id;
    const habitCardEl = document.getElementById(`habitCard-${id}`);

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
      }
    });
  }

  render() {
    const container = document.querySelector(".habits-component__container");
    const cardState = this.model.getLocalStorage();
    if (!!cardState) {
      this.view.render(container, cardState);
    } else {
      this.view.render(container, this.model.habitData);
    }
  }

  init() {
    this.render();
    this.eventListeners();
    console.log(this.model.habitData);
  }
}
