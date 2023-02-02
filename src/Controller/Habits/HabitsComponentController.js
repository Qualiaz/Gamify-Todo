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
    habitsComponentEl.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === "addHabitBtn") {
        const habitSettingsController = new HabitSettingsController();
        habitSettingsController.initAddHabit();
      }
    });
  }

  renderHabits() {
    const compEl = document.querySelector("habits-component__container");
    // HabitCardController.render()
    allHabits.forEach((habit) => {
      habit.init();
      // habit.render(compEl);
    });
    // take all habitCardController and render
  }

  init(parentEl) {
    this.view.render(parentEl);
    this.renderHabits();
    this.eventListeners();
  }
}
