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
         <div class="task-settings__repeat-weekly-container hidden" id="taskSettingsRepeatWeekContainer">
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               type="button"
               value="Mon"
               data-selected="true"
               id="taskSettingsBtnRepeatWeekMon"
               />
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               value="Tue"
               type="button"
               data-selected="true"
               id="taskSettingsBtnRepeatWeekTue"
               />
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               value="Wed"
               type="button"
               data-selected="true"
               id="taskSettingsBtnRepeatWeekWed"
               />
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               value="Thu"
               type="button"
               data-selected="true"
               id="taskSettingsBtnRepeatWeekThu"
               />
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               value="Fri"
               type="button"
               data-selected="true"
               id="taskSettingsBtnRepeatWeekFri"
               />
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               value="Sat"
               type="button"
               data-selected="true"
               id="taskSettingsBtnRepeatWeekSat"
               />
            <input
               class="task-settings__repeat-weekly-el task-settings__day-selected"
               value="Sun"
               type="button"
               data-selected="true"
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
          <span id="taskSettingsEnergyValueDisplay" class="task-settings__energy-display">1</span>                  
        </div>
         <input type="range" value="1" min="1" max="6" id="taskSettingsEnergyInput" class="task-settings__energy-input" />
      </div>
      <span>Checkpoints</span>
      <div id="taskSettingsCheckpointsContainer" class="task-settings__checkpoints task-settings__el-container">              
        <div id="taskSettingsCheckpointContainer-1" draggable="false" class="task-settings__checkpoint">
           <input type="text" id="taskSettingsCheckpointInput-1" class="task-settings__checkpoint-input" />
           <div class="task-settings__checkpoint-icons-container ">                        
               <div class="task-settings__checkpoint-icon-delete-wrapper">
                   <img class="icon-drag task-settings__checkpoint-icon-delete" src=${iconDelete} />
               </div>                  
               <div class="task-settings__checkpoint-icon-drag-wrapper">
                  <img class="icon-drag task-settings__checkpoint-icon-drag" src=${iconDrag} />
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
      <div id="taskSettingsCheckpointContainer-${id}" draggable="false" class="task-settings__checkpoint">
         <input type="text" id="taskSettingsCheckpointInput-${id}" class="task-settings__checkpoint-input" value="${
      name ? name : ""
    }" />
         <div class="task-settings__checkpoint-icons-container hidden">
              <div class="task-settings__checkpoint-icon-delete-wrapper">
                  <img class="icon-drag task-settings__checkpoint-icon-delete" src=${iconDelete} />
              </div>
              <div class="task-settings__checkpoint-icon-drag-wrapper">
                 <img class="icon-drag task-settings__checkpoint-icon-drag" src=${iconDrag} />
              </div>
         </div>
      </div>    
      `;
  }

  _generateExistingCardMarkup() {
    return `
      <div>
        <button type="button" id="taskSettingsBtnDelete">Delete</button>
      </div>
  `;
  }

  getElems(id) {
    const root = document.getElementById("root");
    const taskSettings = document.getElementById(
      id ? `taskSettings-${id}` : "taskSettings"
    );
    const closeBtn = document.getElementById("taskSettingsBtnCancel");
    const doneBtn = document.getElementById("taskSettingsBtnDone");
    const deleteBtn = document.getElementById("taskSettingsBtnDelete");
    const mainButtonsCont = document.getElementById(
      `taskSettingsButtonsContainer`
    );
    console.log(mainButtonsCont);
    const name = document.getElementById("taskSettingsName");
    const notes = document.getElementById("taskSettingsNotes");
    const startDate = document.getElementById("taskSettingsStartDate");

    /////// REPEAT ///////
    const repeatSelect = document.getElementById("taskSettingsRepeatSelect");
    const repeatTextError = document.getElementById(
      "taskSettingsSpanRepeatDailyFail"
    );
    //repeat options
    const repeatOptionNoRepeat = document.getElementById(
      "taskSettingsOptionRepeatNoRepeat"
    );
    const repeatOptionEveryOtherDay = document.getElementById(
      "taskSettingsOptionRepeatEveryOtherDay"
    );
    const repeatOptionEveryWeek = document.getElementById(
      "taskSettingsOptionRepeatEveryWeek"
    );

    ////// every other day
    const repeatEveryOtherDayWrapper = document.getElementById(
      "taskSettingsRepeatEveryOtherDayWrapper"
    );
    const repeatInputEveryOtherDay = document.getElementById(
      "taskSettingsRepeatEveryOtherDayInput"
    );

    ////// every week
    const repeatWeekContainer = document.getElementById(
      "taskSettingsRepeatWeekContainer"
    );
    const repeatBtnMon = document.getElementById(
      "taskSettingsBtnRepeatWeekMon"
    );
    const repeatBtnTue = document.getElementById(
      "taskSettingsBtnRepeatWeekTue"
    );
    const repeatBtnWed = document.getElementById(
      "taskSettingsBtnRepeatWeekWed"
    );
    const repeatBtnThu = document.getElementById(
      "taskSettingsBtnRepeatWeekThu"
    );
    const repeatBtnFri = document.getElementById(
      "taskSettingsBtnRepeatWeekFri"
    );
    const repeatBtnSat = document.getElementById(
      "taskSettingsBtnRepeatWeekSat"
    );
    const repeatBtnSun = document.getElementById(
      "taskSettingsBtnRepeatWeekSun"
    );

    /////// DIFFICULTY ///////
    const difficultySelect = document.getElementById(
      "taskSettingsDifficultySelect"
    );

    const energyValueDisplay = document.getElementById(
      "taskSettingsEnergyValueDisplay"
    );
    const energy = document.getElementById("taskSettingsEnergyInput");

    /////// CHECKPOINTS ///////
    const cpsCont = document.getElementById("taskSettingsCheckpointsContainer");
    const cpCont = document.getElementById("taskSettingsCheckpointContainer-1");
    const cpsChildrenContArr = Array.from(cpsCont.children);

    const cpIconsCont = document.querySelectorAll(
      ".task-settings__checkpoint-icons-container"
    );
    const cpIconDelete = document.querySelectorAll(
      ".task-settings__checkpoint-icon-delete"
    );
    const cpIconDrag = document.querySelectorAll(
      ".task-settings__checkpoint-icon-drag"
    );

    const inputValues = () => {
      const getCpsValues = () => {
        const cpsValues = [];
        [...Array.from(cpsCont.children)].forEach((cp) => {
          cpsValues.push(cp.querySelector("input").value);
        });
        return cpsValues;
      };

      return {
        name: name.value,
        notes: notes.value,
        startDate: startDate.value,
        repeat: repeatSelect.value,
        repeatEveryWeek: {
          Mon: repeatBtnMon.dataset.selected,
          Tue: repeatBtnTue.dataset.selected,
          Wed: repeatBtnWed.dataset.selected,
          Thu: repeatBtnThu.dataset.selected,
          Fri: repeatBtnFri.dataset.selected,
          Sat: repeatBtnSat.dataset.selected,
          Sun: repeatBtnSun.dataset.selected,
        },
        repeatEveryOtherDay:
          repeatInputEveryOtherDay !== null
            ? repeatInputEveryOtherDay.value
            : null,
        difficulty: difficultySelect.value,
        energy: energy.value,
        cps: getCpsValues(),
      };
    };

    return {
      root,
      taskSettings,
      closeBtn,
      doneBtn,
      deleteBtn,
      mainButtonsCont,
      name,
      notes,
      startDate,

      // REPEAT
      repeatSelect,

      repeatTextError,
      repeatOptionNoRepeat,
      repeatOptionEveryOtherDay,
      repeatOptionEveryWeek,

      repeatEveryOtherDayWrapper,
      repeatInputEveryOtherDay,

      repeatWeekContainer,
      repeatBtnMon,
      repeatBtnTue,
      repeatBtnWed,
      repeatBtnThu,
      repeatBtnFri,
      repeatBtnSat,
      repeatBtnSun,
      //
      difficultySelect,
      energyValueDisplay,
      energy,
      //
      cpsCont,
      cpCont,
      cpsChildrenContArr,
      cpIconsCont,
      cpIconDelete,
      cpIconDrag,
      //
      inputValues,
    };
  }

  renderExistingCardSettings(id) {
    const { cpsCont } = this.getElems();
    cpsCont.insertAdjacentHTML("afterend", this._generateExistingCardMarkup());

    const { deleteBtn } = this.getElems();
    console.log(deleteBtn);
  }

  hoverDisplayCpIcons(cpsCont) {
    const handleMouseEnter = (el) => {
      el.addEventListener("mouseenter", () => {
        if (this.isOnlyOneCp(cpsCont)) return;
        const curCheckpointsIcons = el.querySelector(
          ".task-settings__checkpoint-icons-container"
        );
        curCheckpointsIcons.classList.remove("hidden");
      });
    };

    const handleMouseLeave = (el) => {
      el.addEventListener("mouseleave", () => {
        const curCheckpointsIcons = el.querySelector(
          ".task-settings__checkpoint-icons-container"
        );
        curCheckpointsIcons.classList.add("hidden");
      });
    };

    Array.from(cpsCont.children).forEach((el) => {
      if (!el.classList.contains("task-settings__checkpoint")) return;
      handleMouseEnter(el);
      handleMouseLeave(el);
    });
  }

  renderNoRepeat() {
    const {
      repeatWeekContainer,
      repeatEveryOtherDayWrapper,
      repeatTextError,
      repeatInputEveryOtherDay,
    } = this.getElems();

    repeatWeekContainer.classList.add("hidden");
    repeatEveryOtherDayWrapper.classList.add("hidden");
    repeatTextError.classList.add("hidden");
    repeatInputEveryOtherDay.value = "";
  }

  renderRepeatEveryOtherDay() {
    const { repeatWeekContainer, repeatEveryOtherDayWrapper } = this.getElems();
    repeatEveryOtherDayWrapper.classList.remove("hidden");
    repeatWeekContainer.classList.add("hidden");
  }

  renderRepeatEveryWeek() {
    const {
      repeatWeekContainer,
      repeatEveryOtherDayWrapper,
      repeatTextError,
      repeatInputEveryOtherDay,
    } = this.getElems();
    console.log(repeatWeekContainer);
    repeatWeekContainer.classList.remove("hidden");

    // resets
    repeatEveryOtherDayWrapper.classList.add("hidden");
    repeatTextError.classList.add("hidden");
    repeatInputEveryOtherDay.value = "";
  }

  renderNewCheckpoint(id, name) {
    const { cpsCont } = this.getElems();
    cpsCont.insertAdjacentHTML(
      "beforeend",
      this._generateCheckpointMarkup(id, name)
    );
    const curCpCont = document.getElementById(
      `taskSettingsCheckpointContainer-${id}`
    );
    console.log(curCpCont);
    curCpCont.firstElementChild.focus();
    return curCpCont;
  }

  setSelectedRepeatOption(curRepeat) {
    const {
      repeatOptionNoRepeat,
      repeatOptionEveryOtherDay,
      repeatOptionEveryWeek,
      repeatEveryOtherDayWrapper,
      repeatInputEveryOtherDay,
      repeatWeekContainer,
    } = this.getElems();

    // console.log(repeatEveryOtherDay);
    if (curRepeat.type === "daily") {
      repeatOptionEveryOtherDay.setAttribute("selected", "selected");
      repeatEveryOtherDayWrapper.classList.remove("hidden");
      repeatInputEveryOtherDay.value = curRepeat.everyOtherDay;
    }

    if (curRepeat.type === "weekly") {
      repeatOptionEveryWeek.setAttribute("selected", "selected");
      repeatWeekContainer.classList.remove("hidden");

      Array.from(repeatWeekContainer.children).forEach((day) => {
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
      repeatOptionNoRepeat.setAttribute("selected", "selected");
    }
  }

  setSelectedDifficultyOption(difficulty) {
    const difficultyUpperCase =
      difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1);
    const difficultyOptionEl = document.getElementById(
      `taskSettingsDifficultyOption${difficultyUpperCase}`
    );
    difficultyOptionEl.setAttribute("selected", "selected");
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

  setCheckpoints(checkpoints) {
    const { cpCont, name } = this.getElems();
    cpCont.remove();
    checkpoints.forEach((checkpoint, i) => {
      this.renderNewCheckpoint(i, checkpoint.name);
    });
    name.focus();
  }

  toggleDayOfWeek(weekEl) {
    if (weekEl.dataset.selected === "true") {
      weekEl.dataset.selected = "false";
    } else {
      weekEl.dataset.selected = "true";
    }
    weekEl.classList.toggle("task-settings__day-selected");
  }

  closeSettings() {
    root.removeChild(root.children[0]);
  }

  isOnlyOneCp(cpsCont) {
    return Array.from(cpsCont.children).length === 1;
  }

  dragIcons(targetIcon) {
    const container = document.querySelector(".task-settings__checkpoints");
    // const containers = document.getElementsByClassName(
    //   ".task-settings__checkpoint"
    // );
    swapElems(container, "task-settings__checkpoint-icon-drag");
  }

  deleteCp(deleteIconBtn) {
    if (
      deleteIconBtn.classList.contains("task-settings__checkpoint-icon-delete")
    )
      deleteIconBtn.closest(".task-settings__checkpoint").remove();
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
