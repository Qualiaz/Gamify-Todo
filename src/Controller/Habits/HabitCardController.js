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
        this.model.setIsCardToggleLocalStorage();
        const lsCardState = this.model.getLocalStorageParsedObj();
        this.view.toggleCard(id, lsCardState.isHabitCardToggled);
        console.log(this.model.localStorageObj);
        console.log(this.model);
      }
    });
  }

  render() {
    const container = document.querySelector(".habits-component__container");
    const lsCard = this.model.getLocalStorageParsedObj();
    this.view.render(container, this.model.habitData, lsCard);
    // this.view.renderState(lsParsedObj)
  }

  init() {
    this.render();
    this.eventListeners();
  }
}
