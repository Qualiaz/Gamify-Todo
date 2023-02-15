const root = document.getElementById("root");

export default class HabitSettingsView {
  _generateMarkup({ id }) {
    return `
  <div class="habit-settings__container">
    <div class="habit-settings__background"></div>
    <form id="${
      id ? "habitSettingsForm" + "-" + id : "habitSettingsForm"
    }" class="habit-settings__form">
      <div class="habit-settings__header">
        <div class="habit-settings__header__name__wrapper">
          <h1 class="habit-settings__header__name">${
            id ? "Change habit" : "Add habit"
          }</h1>
        </div>
        <div class="habit-settings__cancel-button__wrapper">
          <button id="habitSettingsCancelBtn" class="habit-settings__cancel-button" type="button">
            Cancel
          </button>
        </div>
        <div class="habit-settings__done-button__wrapper">
          <button id="${
            id ? "habitSettingsDoneBtn" + "-" + id : "habitSettingsDoneBtn"
          }" class="habit-settings__done-button" type="button">
            Done
          </button>
        </div>
      </div>
      <div id="habitSettingsMain" class="habit-settings__main">
        <div class="habit-settings__name__container">
          <label
            id="habitSettingsNameLabel"
            class="habit-settings__name__label"
            for="habitSettingsName"
            >
              Name *             
            </label >         
          <input
            class="habit-settings__name__input"
            type="text"
            id="habitSettingsName"
          />
        </div>
        <div class="habit-settings__notes__container">
          <label for="habitSettingsNotes">Notes</label>
          <textarea
            name="habit-notes"
            id="habitSettingsNotes"
            cols="30"
            rows="5"
            data-provide="markdown"
            class="habit-settings__notes__textarea"            
          ></textarea>
        </div>
        <div class="habit-settings__difficulty__container">
          <label
            class="habit-settings__difficulty__label"
            for="habitSettingsDifficulty"
            >Difficulty</label
          >
          <select name="difficulty" id="habitSettingsDifficulty">
            <option id="habitSettingsDifficultyTrivial" value="trivial">Trivial</option>
            <option id="habitSettingsDifficultyEasy" value="easy">Easy</option>
            <option id="habitSettingsDifficultyMedium" value="medium">Medium</option>
            <option id="habitSettingsDifficultyHard" value="hard">Hard</option>
            <option id="habitSettingsDifficultyChallenge" value="challenge">Challenge</option>
          </select>
        </div>
        <div class="habit-settings__project__container">
          <label
            class="habit-settings__project__label"
            for="habitSettingsProjectAssociated"
            >Project</label
          >
          <select
            name="project-associated"
            id="habitSettingsProjectAssociated"
          >
            <option value="Choose..." selected disabled hidden>Choose...</option>
           
          </select>
        </div>
        <div class="habit-settings__energy">
          <label
            class="habit-settings__energy-label"
            for="habitSettingsEnergy"
            >
            Energy  
            <span id="habitSettingsEnergyDispay">1</span>
          </label>  
          <input
            id="habitSettingsEnergy"
            class="habit-settings__energy-input"
            type="range"
            min="1"
            value="1"
            max="3"
          />
        </div>
        
      </div>
    </form>
  </div>
    `;
  }

  _generateAdditionalExistingHabitMarkup() {
    return `
    <div class="habit-settings__streak__container">
    <label
      class="habit-settings__streak__label"
      for="habitSettingsSetStreak"
      >Set streak</label
    >
    <div class="habit-settings__streak-inputs">
      <div class="habit-settings__streak--positive__wrapper">
        <input
          id="habitSettingsStreakPositiveInput"
          class="habit-settings__streak--positive__input"
          type="type"
          value="0"
        />
        <button
          id="habitSettingsStreakPositiveBtn"
          type="button"
          class="habit-settings__streak--positive__button"          
          >
          <img id="habitSettingsStreakPositiveImgBtn" src="./habit-plus.svg" alt="" />
        </button>
      </div>
      <div class="habit-settings__streak--negative__wrapper">
        <input
          id="habitSettingsStreakNegativeInput"
          class="habit-settings__streak--negative__input"
          type="text"
          value="0"
        />
        <button
         type="button"
          class="habit-settings__streak--negative__button"
          id="habitSettingsStreakNegativeBtn"
        >
          <img id="habitSettingsStreakNegativeImgBtn" src="./habit-minus.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
  <div class="habit-settings__delete-button__wrapper">
    <button id="habitSettingsDeleteBtn" class="habit-settings__delete-button" type="button">
      Delete
    </button>
  </div>
  </div>
  </form>
</div> 
`;
  }

  getElems(id = null) {
    const habitsComponentEl = document.querySelector(
      ".habits-component__container"
    );
    const habitSettingsContainer = document.querySelector(
      ".habit-settings__container"
    );
    const habitSettingsForm = document.getElementById(
      id ? "habitSettingsForm" + "-" + id : "habitSettingsForm"
    );
    const habitSettingsMain = document.getElementById("habitSettingsMain");
    const habitSettingsName = document.getElementById("habitSettingsName");
    const habitSettingsNameLabel = document.getElementById(
      "habitSettingsNameLabel"
    );
    const habitSettingsNotes = document.getElementById("habitSettingsNotes");
    const habitSettingsDifficulty = document.getElementById(
      "habitSettingsDifficulty"
    );
    const habitSettingsProjectAssociated = document.getElementById(
      "habitSettingsProjectAssociated"
    );
    const habitSettingsEnergy = document.getElementById("habitSettingsEnergy");
    const habitSettingsEnergyDispay = document.getElementById(
      "habitSettingsEnergyDispay"
    );
    const habitSettingsStreakPositiveInput = document.getElementById(
      "habitSettingsStreakPositiveInput"
    );
    const habitSettingsStreakNegativeInput = document.getElementById(
      "habitSettingsStreakNegativeInput"
    );
    const habitSettingsDeleteBtn = document.getElementById(
      "habitSettingsDeleteBtn"
    );
    const habitSettingsStreakPositiveBtn = document.getElementById(
      "habitSettingsStreakPositiveBtn"
    );
    const habitSettingsStreakNegativeBtn = document.getElementById(
      "habitSettingsStreakNegativeBtn"
    );

    return {
      habitsComponentEl,
      habitSettingsContainer,
      habitSettingsForm,
      habitSettingsMain,
      habitSettingsName,
      habitSettingsNameLabel,
      habitSettingsNotes,
      habitSettingsDifficulty,
      habitSettingsProjectAssociated,
      habitSettingsEnergy,
      habitSettingsEnergyDispay,
      habitSettingsStreakPositiveInput,
      habitSettingsStreakNegativeInput,
      habitSettingsDeleteBtn,
      habitSettingsStreakPositiveBtn,
      habitSettingsStreakNegativeBtn,
    };
  }

  renderChangesInEnergyDisplay(value) {
    const { habitSettingsEnergyDispay } = this.getElems();
    habitSettingsEnergyDispay.textContent = value;
  }

  renderExistingHabit(habitData = null) {
    this.render(habitData);
    const { habitSettingsMain } = this.getElems(habitData.id);
    habitSettingsMain.insertAdjacentHTML(
      "beforeend",
      this._generateAdditionalExistingHabitMarkup()
    );
  }

  render(habitData = null) {
    root.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(habitData ? habitData : {})
    );
  }

  renderFormError() {
    const { habitSettingsNameLabel } = this.getElems();
    const nameErrorMarkup = `<span id="habitSettingsNameError" class="habit-settings__name__error">At least one character</span>`;
    habitSettingsNameLabel.insertAdjacentHTML("beforeend", nameErrorMarkup);
  }
}
