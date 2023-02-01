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
    const habitCard = document.getElementById(`habitCard-${id}`);
    console.log(habitCard);
    habitCard.addEventListener("click", (e) => {
      if (e.target.id === `habitCardMainTop-${id}`) {
        // open card task settings
        const habitSettingsController = new HabitSettingsController();
        habitSettingsController.model = this.model;
        habitSettingsController.initChangeHabit();
        // habitSettingsController.initChangeHabit()
      }
    });
  }

  toggleInfo() {
    this.view.renderToggleInfo(model.id);
  }

  render() {
    const container = document.querySelector(".habits-component__container");
    console.log(this.model.habitData);
    this.view.render(container, this.model.habitData);
  }

  init() {
    this.render();
    this.eventListeners();
  }
}
