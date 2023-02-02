import "./assets/habit-plus.svg";
import "./assets/habit-minus.svg";
import "./assets/toggle.svg";

export default class HabitCardView {
  _generateMarkup({ id, name, notes, energy, streakPositive, streakNegative }) {
    return `
    <div id="habitCard-${id}">
      <div class="habit-card__container">
        <div id="habitCardPositiveWrapper-${id}" class="habit-card__positive__wrapper">
          <button class="habit-card__positive__btn">
            <img src="./habit-plus.svg" alt="add positive habit" />
          </button>
        </div>
        <div class="habit-card__main__container">
          <div id="habitCardMainTop-${id}" class="habit-card__main__top__container">
            <div id="habitCardName-${id}" class="habit-card__main__name__wrapper">${name}</div>
            <div class="habit-card__main__toggle__wrapper">
              <button class="habit-card__main__toggle__button">
                <img
                  class="habit-card__main__toggle"
                  src="./toggle.svg"
                  alt=""
                  id="habitCardToggleImgBtn-${id}"       
                />
              </button>
            </div>
          </div>
          <div id="habitCardMainInfoContainer-${id}" class="habit-card__main__info__container hidden">
            <hr id="habitCardLineBreak1-${id}" class="habit-card__main__line-break" />
            <div id="habitCardNotes-${id}" class="habit-card__main__notes">
              ${notes}
            </div>
            <hr id="habitCardLineBreak2-${id}" class="habit-card__main__line-break" />
            <div class="habit-card__main__additional-info">
              <div class="habit-card__main__energy__wrapper">
                  <span id="habitCardEnergy-${id}" >${energy}</span>
              </div>
              <div class="habit-card__main__streak__container">
                  <span id="habitCardPositiveStreak-${id}">+ ${streakPositive}</span>
                  <span> | </span>
                  <span id="habitCardNegativeStreak-${id}">- ${streakNegative}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="habitCardNegativeWrapper-${id}" class="habit-card__negative__wrapper">
          <button class="habit-card__negative__btn">
            <img src="./habit-minus.svg" alt="add negative habit" />
          </button>
        </div>
      </div>
    </div>
`;
  }

  _getElems(id) {
    const habitCardName = document.getElementById(`habitCardName-${id}`);
    const habitCardNotes = document.getElementById(`habitCardNotes-${id}`);
    const habitCardEnergy = document.getElementById(`habitCardEnergy-${id}`);

    const habitCardPositiveStreak = document.getElementById(
      `habitCardPositiveStreak-${id}`
    );
    const habitCardNegativeStreak = document.getElementById(
      `habitCardNegativeStreak-${id}`
    );

    const habitCardPositiveWrapper = document.getElementById(
      `habitCardPositiveWrapper-${id}`
    );
    const habitCardNegativeWrapper = document.getElementById(
      `habitCardNegativeWrapper-${id}`
    );
    const habitCardLineBreak1 = document.getElementById(
      `habitCardLineBreak1-${id}`
    );
    const habitCardLineBreak2 = document.getElementById(
      `habitCardLineBreak2-${id}`
    );
    return {
      habitCardName,
      habitCardNotes,
      habitCardEnergy,
      habitCardPositiveStreak,
      habitCardNegativeStreak,
      habitCardPositiveWrapper,
      habitCardNegativeWrapper,
      habitCardLineBreak1,
      habitCardLineBreak2,
    };
  }

  renderChanges(habitData) {
    const {
      habitCardName,
      habitCardNotes,
      habitCardEnergy,
      habitCardPositiveStreak,
      habitCardNegativeStreak,
    } = this._getElems(habitData.id);

    habitCardName.textContent = habitData.name;
    habitCardNotes.textContent = habitData.notes;
    habitCardEnergy.textContent = habitData.energy;
    habitCardPositiveStreak.textContent = `+ ${habitData.streakPositive}`;
    habitCardNegativeStreak.textContent = `- ${habitData.streakNegative}`;

    this.renderColorBasedOnDifficulty(habitData);
  }

  renderColorBasedOnDifficulty({ id, difficulty }) {
    const {
      habitCardPositiveWrapper,
      habitCardNegativeWrapper,
      habitCardLineBreak1,
      habitCardLineBreak2,
    } = this._getElems(id);

    const setColor = (color) => {
      [
        habitCardPositiveWrapper,
        habitCardNegativeWrapper,
        habitCardLineBreak1,
        habitCardLineBreak2,
      ].forEach((el) => {
        el.style.setProperty("--difficultyColor", color);
      });
    };

    if (difficulty === "trivial") {
      setColor("#EDAE1D");
    }
    if (difficulty === "easy") {
      setColor("#469B46");
    }
    if (difficulty === "medium") {
      setColor("#0DBF9B");
    }
    if (difficulty === "hard") {
      setColor("#BC2C1A");
    }
    if (difficulty === "challenge") {
      setColor("#6457A6");
    }
  }

  render(habitComponent, habitData) {
    habitComponent.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(habitData)
    );
    this.renderColorBasedOnDifficulty(habitData);
  }

  toggleCard(id) {
    const habitCardMainInfoContainer = document.getElementById(
      `habitCardMainInfoContainer-${id}`
    );
    habitCardMainInfoContainer.classList.toggle("hidden");
  }
}
