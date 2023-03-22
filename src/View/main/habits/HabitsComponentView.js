import addImgBtn from "../../../assets/images/add.svg";
import viewSettingsImgBtn from "../../../assets/images/view-settings.svg";

export default class HabitsComponentView {
  _generateMarkup() {
    return `
    <section class="habits-component__container" style="color: white">
     <section class="habits-component__top__container">   
        <span>Habits</span>
        <button id="addHabitBtn" class="habits-component__add-habit-btn" >
          <img class="habits-component__add-habit-btn-img" id="addHabitBtnImg" src="${addImgBtn}" alt="add habit button" />
        </button>
        <button id="viewSettingsHabitsBtn" class="habits-component__view-settings-btn" >
          <img id="viewSettingsHabitsBtnImg" class="habits-component__view-settings-btn-img" src="${viewSettingsImgBtn}" alt="open habbit view button" />
        </button>      
      </section>
    </section>`;
  }

  render(parentEl, view) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(view));
  }
}
