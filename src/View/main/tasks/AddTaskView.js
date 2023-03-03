import iconDelete from "./assets/delete-icon.svg";
import iconDrag from "./assets/icon-drag.svg";
import iconEnergy from "./assets/energy-icon.svg";
import { swapElems } from "../../../helpers/drag";

export default class TaskSettingsView {
  _generateMarkup({
    name,
    notes,
    repeat,
    difficulty,
    checkpoints,
    energy,
    startDate,
    id,
  }) {
    return `
    <div id="${
      id ? "taskSettings" + "-" + id : "taskSettings"
    }" class="task-settings">
     <div id="taskSettingsContainer" class="task-settings__container">
    <div id="taskSettingsHeader" class="task-settings__header task-settings-header">
      <div id="taskSettingsHeaderNameWrapper" class="task-settings-header__name-wrapper">
        <h3 id="taskSettingsHeaderName" class="task-settings-header__name">Add Task</h3>
      </div>
      <div id="taskSettingsHeaderBtnsContainer" class="task-settings-header__btns-container">
        <div id="taskSettingsHeaderBtnCancelWrapper" class="task-settings-header__btn-cancel-wrapper">
          <button id="taskSettingsBtnCancel" class="task-settings-header__btn-cancel">Cancel</button>
        </div>
        <div id="taskSettingsHeaderBtnDoneWrapper" class="task-settings-header-btn-done-wrapper">
          <button id="taskSettingsBtnDone" class="task-settings-header__btn-done">Done</button>
        </div>
      </div>
      </div>
      <form id="taskSettingsForm" class="task-settings__form" action="POST">  
      <div id="taskSettingsNameContainer" class="task-settings__name task-settings__el-container">
          <label id="taskSettingsNameLabel" class="task-settings__name-label" for="taskSettingsName">Name *</label>
          <input type="text" id="taskSettingsName" class="task-settings__name-input" value="${
            name ? name : ""
          }" />
          <span id="taskSettingsNameCheckFail" class="task-settings__name-error hidden">At least one character</span>
      </div>
      <div id="taskSettingsNotesContainer" class="task-settings__notes task-settings__el-container">
         <label id="taskSettingsNotesLabel" for="taskSettingsNotes">Notes</label>
           <textarea data-provide="markdown" id="taskSettingsNotes"> ${
             notes ? notes : ""
           }</textarea>
      </div>
      <div id="taskSettingsDateWrapper" class="task-settings__date task-settings__el-container">
         <label id="taskSettingsStartDateLabel" for="taskSettingsStartDate">Start Date</label>
         <input id="taskSettingsStartDate" type="date" name="date" min=${
           new Date().toISOString().split("T")[0]
         } value="${
      startDate ? startDate.replace("/", "-").replace("/", "-") : ""
    }" />              
      </div>
      <div id="taskSettingsRepeatContainer" class="task-settings__repeat task-settings__el-container">
         <span id="taskSettingsSpanRepeatDailyFail" class="task-settings__repeat-span hidden">Only numbers allowed</span>
         <div id="taskSettingsRepeatSelectWrapper" class="task-settings__repeat-container">
            <label id="taskSettingsRepeatLabel" class="task-settings__repeat-label" for="taskSettingsRepeatSelect">Repeat</label>
            <select name="repetition" class="task-settings__repeat-selection" id="taskSettingsRepeatSelect">
               <option id="taskSettingsOptionRepeatNoRepeat" class="task-settings__repeat-option-no-repeat" value="no-repeat">No Repeat</option>
               <option id="taskSettingsOptionRepeatEveryOtherDay" class="task-settings__repeat-option-every-other-day" value="daily">Every Other Day</option>
               <option id="taskSettingsOptionRepeatEveryWeek" class="task-settings__repeat-option-every-week" value="weekly">Every Week</option>
            </select>
         </div>
         <div class="hidden" id="taskSettingsRepeatEveryOtherDayWrapper">
            <input id="taskSettingsRepeatEveryOtherDayInput" type="text" />                    
         </div>      
         <div class="hidden" id="taskSettingsRepeatWeekContainer">
            <input
               class="task-settings__repeat__week-el day__selected--true"
               type="button"
               value="Mon"
               id="taskSettingsBtnRepeatWeekMon"
               />
            <input
               class="task-settings__repeat__week-el day__selected--true"
               value="Tue"
               type="button"
               id="taskSettingsBtnRepeatWeekTue"
               />
            <input
               class="task-settings__repeat__week-el day__selected--true"
               value="Wed"
               type="button"
               id="taskSettingsBtnRepeatWeekWed"
               />
            <input
               class="task-settings__repeat__week-el day__selected--true"
               value="Thu"
               type="button"
               id="taskSettingsBtnRepeatWeekThu"
               />
            <input
               class="task-settings__repeat__week-el day__selected--true"
               value="Fri"
               type="button"
               id="taskSettingsBtnRepeatWeekFri"
               />
            <input
               class="task-settings__repeat__week-el day__selected--true"
               value="Sat"
               type="button"
               id="taskSettingsBtnRepeatWeekSat"
               />
            <input
               class="task-settings__repeat__week-el day__selected--true"
               value="Sun"
               type="button"
               id="taskSettingsBtnRepeatWeekSun"
               />
         </div>     
      </div>
      <div id="taskSettingsDifficultyContainer" class="task-settings__difficulty task-settings__el-container">
         <label id="taskSettingsDifficultySelectLabel" for="taskSettingsDifficultySelect">Difficulty</label>
         <select name="difficulty" id="taskSettingsDifficultySelect">
            <option id="taskSettingsDifficultyOptionTrivial" value="trivial">Trivial</option>
            <option id="taskSettingsDifficultyOptionEasy" value="easy">Easy</option>
            <option id="taskSettingsDifficultyOptionMedium" value="medium">Medium</option>
            <option id="taskSettingsDifficultyOptionHard" value="hard">Hard</option>
            <option id="taskSettingsDifficultyOptionChallenge" value="challenge">Challenge</option>
         </select>
      </div>
      <div id="taskSettingsEnergyContainer" class="task-settings__energy task-settings__el-container">
        <div class="task-settings__energy-top-container">
          <label for="taskSettingsEnergyInput" class="task-settings__energy-label">Energy gain</label> 
          <img id="taskSettingsEnergyIcon" class="task-settings__energy-icon" src=${iconEnergy} /> 
          <span id="taskSettingsEnergyValue" class="task-settings__energy-display">1</span>                  
        </div>
         <input type="range" value="1" min="1" max="6" id="taskSettingsEnergyInput" class="task-settings__energy-input" />
      </div>
      <div id="taskSettingsCheckpointsContainer" class="task-settings__checkpoints task-settings__el-container">              
        <span>Checkpoints</span>
        <div id="taskSettingsCheckpointContainer1" class="task-settings__checkpoint">
           <input type="text" id="taskSettingsCheckpointInput1" class="checkpoint__input" />
           <div class="checkpoint__icons__container hidden">                        
               <div class="checkpoint__icon-delete__wrapper">
                   <img class="checkpoint__icon-delete__img" src=${iconDelete} />
               </div>                  
               <div class="checkpoint__icon-drag__wrapper">
                  <img class="checkpoint__icon-drag__img" src=${iconDrag} />
               </div>
           </div>
        </div>              
     </div>      
      </form>
    </div>      
    </div>
`;
  }

  _generateCheckpointMarkup(id, name) {
    return `
      <div id="taskSettingsCpCont-${id}" class="checkpoint__container">
         <input type="text" id="taskSettingsCheckpointInput-${id}" class="checkpoint__input" value="${
      name ? name : ""
    }" />
         <div class="cps__icons__container hidden">
              <div class="cp__icon--delete__wrapper">
                  <img class="cp__icon--delete" src=${iconDelete} />
              </div>
              <div class="cp__icon--drag__wrapper">
                 <img class="cp__icon--drag" src=${iconDrag} />
              </div>
         </div>
      </div>    
      `;
  }

  _generateExistingCardMarkup() {
    return `
      <div>
        <button type="button" id="taskSettingsDeleteBtn">Delete</button>
      </div>
  `;
  }

  renderExistingCardSettings(id) {
    const { mainButtonsCont } = this.getElems();
    mainButtonsCont.insertAdjacentHTML(
      "beforebegin",
      this._generateExistingCardMarkup()
    );
  }

  setSelectedRepeatOption(curRepeat) {
    const {
      repeatNoRepeat,
      repeatEveryOtherDay,
      repeatEveryWeek,
      repeatEveryDay,
      repeatDailyInput,
      repeatWeek,
    } = this.getElems();

    console.log(curRepeat);
    if (curRepeat.type === "daily") {
      repeatEveryOtherDay.setAttribute("selected", "selected");
      repeatEveryDay.classList.remove("hidden");
      repeatDailyInput.value = curRepeat.everyOtherDay;
    }

    if (curRepeat.type === "weekly") {
      repeatEveryWeek.setAttribute("selected", "selected");
      repeatWeek.classList.remove("hidden");

      Array.from(repeatWeek.children).forEach((day) => {
        day.classList.remove("day__selected");
      });

      curRepeat.days.forEach((day) => {
        const dayUpperCase = day.slice(0, 1).toUpperCase() + day.slice(1);
        const dayEl = document.getElementById(
          `taskSettingsRepeatWeek${dayUpperCase}`
        );
        dayEl.classList.add("day__selected");
      });
    }

    if (curRepeat.type === "no-repeat") {
      repeatNoRepeat.setAttribute("selected", "selected");
    }
  }

  setSelectedDifficultyOption(difficulty) {
    const difficultyUpperCase =
      difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1);
    const difficultyOptionEl = document.getElementById(
      `taskSettingsDifficulty${difficultyUpperCase}`
    );
    difficultyOptionEl.setAttribute("selected", "selected");
  }

  getElems(id) {
    const taskSettings = document.getElementById("taskSettings");
    const repeatWeek = document.getElementById("taskSettingsRepeatWeek");
    const repeatEveryDay = document.getElementById("taskSettingsRepeatDaily");
    const repeatDailyFail = document.getElementById(
      "taskSettingsRepeatDailyFail"
    );
    const repeatDailyInput = document.getElementById("repeatDailyInput");
    const cpsCont = document.getElementById("checkpointsContainer");
    const cpCont = document.getElementById("taskSettingsCpCont-1");
    const name = document.getElementById("taskSettingsName");
    const repeat = document.getElementById("taskSettingsRepeat");
    const repeatNoRepeat = document.getElementById("repeatNoRepeat");
    const repeatEveryOtherDay = document.getElementById("repeatEveryOtherDay");
    const repeatEveryWeek = document.getElementById("repeatEveryWeek");
    const difficulty = document.getElementById("taskSettingsDifficulty");
    const energy = document.getElementById("taskSettingsEnergy");
    const energyValueDisplay = document.getElementById("energyValueDisplay");
    const weekly = document.getElementsByClassName(
      "repeat__week__el day__selected"
    );
    const startDate = document.getElementById("taskSettingsStartDate");
    const repeatDaily = document.getElementById("repeatDailyInput");
    const notes = document.getElementById("markedInput");
    const cpsChildrenContArr = Array.from(cpsCont.children);
    const cpIconDelete = document.querySelectorAll(".cp__icon--delete");
    const closeBtn = document.getElementById("taskSettingsCloseBtn");
    const doneBtn = document.getElementById("taskSettingsDoneBtn");
    const deleteBtn = document.getElementById("taskSettingsDeleteBtn");
    const mainButtonsCont = document.getElementById(
      `taskSettingsButtonsContainer`
    );

    return {
      taskSettings,
      cpIconDelete,
      repeatWeek,
      repeatEveryWeek,
      repeatNoRepeat,
      repeatEveryDay,
      repeatEveryOtherDay,
      repeatDailyFail,
      repeatDailyInput,
      cpsCont,
      cpsChildrenContArr,
      cpCont,
      name,
      repeat,
      difficulty,
      energy,
      energyValueDisplay,
      weekly,
      repeatDaily,
      notes,
      startDate,
      closeBtn,
      doneBtn,
      deleteBtn,
      mainButtonsCont,
    };
  }

  hoverDisplayCpIcons(cpsCont) {
    const handleMouseEnter = (el) => {
      el.addEventListener("mouseenter", () => {
        if (this.isOnlyOneCp(cpsCont)) return;
        const curCheckpointIcons = el.querySelector(".cps__icons__container");
        curCheckpointIcons.classList.remove("hidden");
      });
    };

    const handleMouseLeave = (el) => {
      el.addEventListener("mouseleave", () => {
        const cpIcons = el.querySelector(".cps__icons__container");
        cpIcons.classList.add("hidden");
      });
    };

    Array.from(cpsCont.children).forEach((el) => {
      handleMouseEnter(el);
      handleMouseLeave(el);
    });
  }

  renderNoRepeat() {
    const { repeatWeek, repeatEveryDay, repeatDailyFail, repeatDailyInput } =
      this.getElems();

    repeatWeek.classList.add("hidden");
    repeatEveryDay.classList.add("hidden");
    repeatDailyFail.classList.add("hidden");
    repeatDailyInput.value = "";
  }

  renderRepeatEveryOtherDay() {
    const { repeatWeek, repeatEveryDay } = this.getElems();
    repeatEveryDay.classList.remove("hidden");
    repeatWeek.classList.add("hidden");
  }

  renderRepeatEveryWeek() {
    const { repeatWeek, repeatEveryDay, repeatDailyFail, repeatDailyInput } =
      this.getElems();
    repeatWeek.classList.remove("hidden");
    repeatEveryDay.classList.add("hidden");
    repeatDailyFail.classList.add("hidden");
    repeatDailyInput.value = "";
  }

  renderNewCheckpoint(id, name) {
    const { cpsCont } = this.getElems();
    cpsCont.insertAdjacentHTML(
      "beforeend",
      this._generateCheckpointMarkup(id, name)
    );
    const curCpCont = document.getElementById(`taskSettingsCpCont-${id}`);
    curCpCont.firstElementChild.focus();
    return curCpCont;
  }

  setCheckpoints(checkpoints) {
    const { cpCont, name } = this.getElems();
    cpCont.remove();
    checkpoints.forEach((checkpoint, i) => {
      this.renderNewCheckpoint(i, checkpoint.name);
    });
    name.focus();
  }

  isOnlyOneCp(cpsCont) {
    return Array.from(cpsCont.children).length === 1;
  }

  dragIcons(targetIcon) {
    if (targetIcon.classList.contains("cp__icon--drag")) {
      const container = targetIcon.closest(".checkpoints__container");
      swapElems(container, "cp__icon--drag");
    }
  }

  hideCpIcons(cpsCont) {
    cpsCont.firstElementChild
      .querySelector(".cps__icons__container")
      .classList.add("hidden");
  }

  setEnergyValueDisplay(el) {
    const { energyValueDisplay } = this.getElems();
    energyValueDisplay.textContent = el.value;
  }

  setEnergyRange(difficulty, energy) {
    const { energyValueDisplay, energy: energyEl } = this.getElems();
    const setEnergyValues = (min, max, energy) => {
      console.log(energyEl);
      energyEl.min = min.toString();
      energyEl.max = max.toString();
      energyEl.value = energy.toString();
      energyValueDisplay.textContent = energy.toString();
    };

    switch (difficulty) {
      case "trivial":
        setEnergyValues(1, 6, energy);
        break;
      case "easy":
        setEnergyValues(7, 19, energy);
        break;
      case "medium":
        setEnergyValues(20, 59, energy);
        break;
      case "hard":
        setEnergyValues(60, 99, energy);
        break;
      case "challenge":
        setEnergyValues(100, 200, energy);
        break;
    }
  }

  toggleDayOfWeek(weekEl) {
    weekEl.classList.toggle("day__selected");
  }

  deleteCp(deleteIconBtn) {
    if (deleteIconBtn.classList.contains("cp__icon--delete"))
      deleteIconBtn.closest(".checkpoint__container").remove();
  }

  render(parentEl, state) {
    parentEl.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(state ? state : {})
    );
    console.log(state);
    if (state) {
      this.setSelectedRepeatOption(state.repeat);
      this.setSelectedDifficultyOption(state.difficulty);
      this.setEnergyRange(state.difficulty, state.energy);
      if (state.checkpoints.length >= 1) {
        this.setCheckpoints(state.checkpoints);
      }
    }
  }
}
