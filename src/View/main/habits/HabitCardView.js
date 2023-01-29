import "./assets/habit-plus.svg";
import "./assets/habit-minus.svg";
import "./assets/toggle.svg";

export default class HabitCardView {
  _generateMarkup() {
    return `
    <div id="habitCard">
      <div class="habit-card__container">
        <div class="habit-card__positive__wrapper">
          <button class="habit-card__positive__btn">
            <img src="./habit-plus.svg" alt="add positive habit" />
          </button>
        </div>
        <div class="habit-card__main__container">
          <div class="habit-card__main__top__container">
            <div class="habit-card__main__name__wrapper">NAME</div>
            <div class="habit-card__main__toggle__wrapper">
              <button class="habit-card__main__toggle__button">
                <img
                  class="habit-card__main__toggle"
                  src="./toggle.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div class="habit-card__main__info__container hidden">
            <hr class="habit-card__main__line-break" />
            <div class="habit-card__main__notes">
              <h4>Oki</h4>
              <p>Pro Player</p>
              <p>69</p>
            </div>
            <hr class="habit-card__main__line-break" />
            <div class="habit-card__main__additional-info">
              <p>Here I am</p>
            </div>
          </div>
        </div>
        <div class="habit-card__negative__wrapper">
          <button class="habit-card__negative__btn">
            <img src="./habit-minus.svg" alt="add negative habit" />
          </button>
        </div>
      </div>
    </div>
`;
  }

  render(habitComponent, model) {
    habitComponent.insertAdjacentHTML("beforeend", this._generateMarkup());
  }

  toggleCard() {}
}
