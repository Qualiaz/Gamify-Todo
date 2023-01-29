import HabitCardView from "../../View/main/habits/HabitCardView";

export default class HabitCardController {
  constructor() {
    this.view = new HabitCardView();
    // this.model = new HabitCardModel(habitData);
  }

  eventListeners() {
    const infoCont = document.querySelector(
      ".habit-card__main__info__container"
    );
    const toggleBtn = document.querySelector(
      ".habit-card__main__toggle__button"
    );
    toggleBtn.addEventListener("click", () => {
      infoCont.classList.toggle("hidden");
    });
  }

  toggleInfo() {
    this.view.renderToggleInfo(model.id);
  }

  render(parentEl) {
    this.view.render(parentEl, this.model);
  }

  init(parentEl) {
    this.render(parentEl);
    this.eventListeners();
  }
}
