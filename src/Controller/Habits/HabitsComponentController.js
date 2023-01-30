import HabitCardController from "./HabitCardController";
import HabitModel from "../../Model/main/HabitModel";
import HabitsComponentView from "../../View/main/habits/HabitsComponentView";
import HabitSettingsController from "./HabitSettingsController";

export default class HabitsComponentController {
  constructor() {
    this.view = new HabitsComponentView();
    this.habits = HabitModel.allHabits;
  }

  eventListeners() {
    const habitsComponentEl = document.querySelector(
      ".habits-component__container"
    );
    habitsComponentEl.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === "addHabitBtn") {
        const habitSettingsController = new HabitSettingsController();
        habitSettingsController.render();
        habitSettingsController.eventListeners();

        // habitSettingsController.change();
      }
    });
  }

  openHabitSettings() {
    // add to allHabits

    const habit = new HabitModel({
      name: "Make bed",
      difficulty: "easy",
      energy: 2,
      notes: "Whtaever",
      id: "whateverId",
    });

    console.log(HabitModel.allHabits);
    return habit;
  }

  renderHabits(component) {
    const card = new HabitCardController();
    card.init(component);
  }

  updateHabits() {
    // update filters for habits
  }

  openViewSettings() {}

  init(parentEl) {
    this.view.render(parentEl);
    this.eventListeners();
  }
}
