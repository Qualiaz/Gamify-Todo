const root = document.getElementById("root");

export default class HabitSettingsView {
  _generateMarkup() {
    return `
    <div class="habit-settings__container">
    <div class="habit-settings__background"></div>
    <form id="habitSettingsForm" class="habit-settings__form">
      <div class="habit-settings__header">
        <div class="habit-settings__header__name__wrapper">
          <h1 class="habit-settings__header__name">Add habit</h1>
        </div>
        <div class="habit-settings__cancel-button__wrapper">
          <button class="habit-settings__cancel-button" type="button">
            Cancel
          </button>
        </div>
        <div class="habit-settings__done-button__wrapper">
          <button class="habit-settings__done-button" type="button">
            Done
          </button>
        </div>
      </div>
      <div id="habitSettingsMain" class="habit-settings__main">
        <div class="habit-settings__name__container">
          <label
            class="habit-settings__name__label"
            for="habitSettingsName"
            >Name</label
          >
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
            <option value="trivial">Trivial</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="challenge">Challenge</option>
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
            <option value="none">None</option>
          </select>
        </div>
        <div class="habit-settings__energy">
          <label
            class="habit-settings__energy-label"
            for="habitSettingsEnergy"
            >Energy</label
          >
          <input
            class="habit-settings__energy-input"
            type="range"
            min="1"
            max="100"
          />
        </div>
        
      </div>
    </form>
  </div>
    `;
  }

  _generateMarkupChangeHabit() {
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
          class="habit-settings__streak--positive__input"
          type="type"
        />
        <button
          type="button"
          class="habit-settings__streak--positive__button"
        >
          <img src="./habit-plus.svg" alt="" />
        </button>
      </div>
      <div class="habit-settings__streak--negative__wrapper">
        <input
          class="habit-settings__streak--negative__input"
          type="text"
        />
        <button
          type="button"
          class="habit-settings__streak--negative__button"
        >
          <img src="./habit-minus.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
  <div class="habit-settings__delete-button__wrapper">
    <button class="habit-settings__delete-button" type="button">
      Delete
    </button>
  </div>
    `;
  }

  renderChangeHabit() {
    const mainForm = document.getElementById("habitSettingsMain");
    mainForm.insertAdjacentHTML("beforeend", this._generateMarkupChangeHabit());
  }

  render(parentEl) {
    root.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
