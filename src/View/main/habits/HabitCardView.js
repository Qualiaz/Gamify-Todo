import "./assets/habit-plus.svg";
import "./assets/habit-minus.svg";
import "./assets/toggle.svg";
import { marked } from "marked";

export default class HabitCardView {
  _generateMarkup({ id, name, notes, energy, streakPositive, streakNegative }) {
    return `
    <div id="habitCard-${id}">
      <div class="habit-card__container">
        <div id="habitCardPositiveWrapper-${id}" class="habit-card__positive__wrapper">
          <button id="habitCardPositiveBtn-${id}" class="habit-card__positive__btn">
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
            ${notes ? marked.parse(notes) : ""}
            </div>
            <hr id="habitCardLineBreak2-${id}" class="habit-card__main__line-break" />
            <div class="habit-card__main__additional-info">
              <div class="habit-card__main__energy__wrapper">
                  <img class="habit-card__main__energy-icon" src="./energy-icon.svg" />
                  <span id="habitCardEnergy-${id}" >
                    ${energy}
                  </span>
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
          <button id="habitCardNegativeBtn-${id}" class="habit-card__negative__btn">
            <img src="./habit-minus.svg" alt="add negative habit" />
          </button>
        </div>
      </div>
    </div>
`;
  }
  _getElems(id) {
    const habitCardMainInfoContainer = document.getElementById(
      `habitCardMainInfoContainer-${id}`
    );
    const habitCardToggleImgBtn = document.getElementById(
      `habitCardToggleImgBtn-${id}`
    );
    const habitCardPositiveBtn = document.getElementById(
      `habitCardPositiveBtn-${id}`
    );
    const habitCardNegativeBtn = document.getElementById(
      `habitCardNegativeBtn-${id}`
    );

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
      habitCardMainInfoContainer,
      habitCardToggleImgBtn,
      habitCardPositiveBtn,
      habitCardNegativeBtn,
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
    habitCardEnergy.textContent = habitData.energy;
    habitCardPositiveStreak.textContent = `+ ${habitData.streakPositive}`;
    habitCardNegativeStreak.textContent = `- ${habitData.streakNegative}`;

    const parsedNotes = marked.parse(habitData.notes);
    habitCardNotes.textContent = "";
    habitCardNotes.insertAdjacentHTML("afterbegin", parsedNotes);

    this.renderColorBasedOnDifficulty(habitData);
    this.toggleLineBreaks(habitData.id);
  }

  renderColorBasedOnDifficulty({ id, difficulty }) {
    const {
      habitCardPositiveWrapper,
      habitCardNegativeWrapper,
      habitCardPositiveBtn,
      habitCardNegativeBtn,
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
        if (!el) return;
        el.style.setProperty("--difficultyColor", color);
      });
    };

    const setColorHover = (initialColor, colorHover) => {
      const onEnter = (btn, el) => {
        btn.addEventListener("mouseenter", () => {
          el.style.setProperty("--difficultyColorHover", colorHover);
          el.style.setProperty("--difficultyColor", colorHover);
        });
      };

      const onLeave = (btn, el) => {
        btn.addEventListener("mouseleave", () => {
          el.style.setProperty("--difficultyColor", initialColor);
        });
      };

      onEnter(habitCardPositiveBtn, habitCardPositiveWrapper);
      onEnter(habitCardNegativeBtn, habitCardNegativeWrapper);
      onLeave(habitCardPositiveBtn, habitCardPositiveWrapper);
      onLeave(habitCardNegativeBtn, habitCardNegativeWrapper);
    };

    if (difficulty === "trivial") {
      setColor("#EDAE1F");
      setColorHover("#EDAE1F", "#fdbd28");
    }
    if (difficulty === "easy") {
      setColor("#469B46");
      setColorHover("#469B46", "#57c557");
    }
    if (difficulty === "medium") {
      setColor("#0DBF9B");
      setColorHover("#0DBF9B", "#14dab2");
    }
    if (difficulty === "hard") {
      setColor("#BC2C1A");
      setColorHover("#BC2C1A", "#db3520");
    }
    if (difficulty === "challenge") {
      setColor("#6457A6");
      setColorHover("#6457A6", "#7a6ac9");
    }
  }

  render(habitComponent, cardState) {
    habitComponent.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(cardState)
    );
    this.renderColorBasedOnDifficulty(cardState);

    this.toggleLineBreaks(cardState.id);
    this.renderState(cardState);
  }

  toggleLineBreaks(id) {
    const { habitCardNotes, habitCardLineBreak1 } = this._getElems(id);
    if (!habitCardNotes.textContent.trim()) {
      habitCardLineBreak1.classList.add("hidden");
    } else {
      habitCardLineBreak1.classList.remove("hidden");
    }
  }

  renderState(cardState) {
    console.log(cardState);
    this.toggleCard(cardState.id, cardState.isCardToggle);
  }

  toggleCard(id, isToggled) {
    console.log(isToggled);
    const { habitCardMainInfoContainer, habitCardToggleImgBtn } =
      this._getElems(id);
    if (isToggled) {
      habitCardMainInfoContainer.classList.remove("hidden");
      habitCardToggleImgBtn.style.transform = `rotateZ(0deg)`;
    } else {
      habitCardMainInfoContainer.classList.add("hidden");
      habitCardToggleImgBtn.style.transform = `rotateZ(180deg)`;
    }
  }
}
