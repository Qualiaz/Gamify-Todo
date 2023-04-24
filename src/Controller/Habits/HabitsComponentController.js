import HabitCardController from "./HabitCardController";
import HabitModel, { allHabits } from "../../Model/main/HabitModel";
import HabitsComponentView from "../../View/main/habits/HabitsComponentView";
import HabitSettingsController from "./HabitSettingsController";

export default class HabitsComponentController {
  constructor() {
    this.view = new HabitsComponentView();
  }

  eventListeners() {
    const habitsComponentEl = document.querySelector(
      ".habits-component__container"
    );
    console.log("HEY");
    habitsComponentEl.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === "addHabitBtn" || clickedId === "addHabitBtnImg") {
        const habitSettingsController = new HabitSettingsController();
        habitSettingsController.initAddHabit();
      }
    });
  }

  renderHabits() {
    console.log(allHabits);
    allHabits.forEach((habit) => {
      habit.init();
    });
  }

  init(parentEl) {
    this.view.render(parentEl);
    this.renderHabits();
    this.eventListeners();
  }
}
