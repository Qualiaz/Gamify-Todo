import addImgBtn from "../../../assets/images/add.svg";
import viewSettingsImgBtn from "../../../assets/images/view-settings.svg";

export default class HabitsComponentView {
  _generateMarkup() {
    return `
     <section class="habits-component__container" style="color: white">
      <section class="habits-component__top-container">   
        <span>Habits</span>
        
        <div class="habits-component__view-settings-btn-wrapper">
         <button id="addHabitBtn" class="habits-component__add-habit-btn" >
           <img class="habits-component__add-habit-btn-img" id="addHabitBtnImg" src="${addImgBtn}" alt="add habit button" />
         </button>
        </div>

        <div class="habits-component__view-settings-btn-wrapper">
          <button id="viewSettingsHabitsBtn" class="habits-component__view-settings-btn" >
            <img id="viewSettingsHabitsBtnImg" class="habits-component__view-settings-btn-img" src="${viewSettingsImgBtn}" alt="open habbit view button" />
          </button>      
        </div>

       </section>
      <section id="habitsViewSettingsWrapper" class="habits-component__view-settings-wrapper">

      </section>
    </section>`;
  }

  _generateViewSettingsMarkup() {
    return `
       <div class="view-settings__container" id="viewSettingsHabitsContainer">
         <div class="view-settings__filter-container">
           <div class="view-settings__filter-name-wrapper">
             <span>Filter</span>
           </div>
         </div>
         <div class="view-settings__order-container">
           <div class="view-settings__order-main">
             <div class="view-settings__order-name__wrapper">
               <span>Order</span>
             </div>
             <select class="view-settings__order-selections">
               <option value="timeCreated">Time Created</option>
               <option value="difficulty">Difficulty</option>
               <option value="energy">Energy</option>
               <option value="streak">Streak</option>
             </select>
           </div>
           <div class="view-settings__order-type">
             <button>Ascending</button>
             <button>Descending</button>
           </div>
         </div>
         <hr class="view-settings__hr" />
         <div class="view-settings__reset-wrapper">
           <button class="view-settings__reset-btn">Reset All</button>
         </div>
       </div>    
`;
  }

  renderViewSettings() {
    const viewSettingsWrapper = document.getElementById(
      "habitsViewSettingsWrapper"
    );
    viewSettingsWrapper.insertAdjacentHTML(
      "afterbegin",
      this._generateViewSettingsMarkup()
    );
    const viewSettingsHabitsContainer = document.getElementById(
      "viewSettingsHabitsContainer"
    );
    if (viewSettingsHabitsContainer.style.display === "flex") {
      viewSettingsHabitsContainer.style.display = "none";
    } else {
      viewSettingsHabitsContainer.style.display = "flex";
    }
    return viewSettingsHabitsContainer;
  }

  addModalBackground() {
    const body = document.querySelector("body");
    const background = document.createElement("div");
    background.classList.add("background-modal");
    body.prepend(background);
    return background;
  }

  render(parentEl, view) {
    parentEl.innetHTML = "";
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(view));
  }
}
