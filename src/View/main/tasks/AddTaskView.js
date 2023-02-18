import iconDelete from "./assets/delete-icon.svg";
import iconDrag from "./assets/icon-drag.svg";
import iconEnergy from "./assets/energy-icon.svg";
import { swapElems } from "../../../helpers/drag";

export default class TaskSettingsView {
  _generateMarkup() {
    return `
  <div id="taskSettings" class="task__settings__background">
    <div class="task__settings__container">
     <form action="POST">
        <div class="task__settings__el task__settings__name">
           <label for="taskSettingsName">Name <span id="taskSettingsNameCheckFail" class="hidden">At least one character</span> </label>
           <input type="text" id="taskSettingsName" />
        </div>
        <div class="task__settings__el task__settings__notes">
           <label>Notes</label>
           <textarea data-provide="markdown" id="markedInput"></textarea>
        </div>
        <div class="task__settings__el task__settings__start-date">
           <label for="taskSettingsStartDate">Start Date</label>
           <input type="date" name="date" min=${
             new Date().toISOString().split("T")[0]
           } id="taskSettingsStartDate" />
        </div>
        <div id="repeatContainer" class="task__settings__el task__settings__repeat">
           <label for="taskSettingsRepeat">Repeat <span id="taskSettingsRepeatDailyFail" class="hidden">Only numbers allowed</span></label>

           <select name="repetition" id="taskSettingsRepeat">
              <option id="repeatNoRepeat" value="no-repeat">No Repeat</option>
              <option id="repeatEveryOtherDay" value="daily">Every Other Day</option>
              <option id="repeatEveryWeek"value="weekly">Every Week</option>
           </select>

           <div class="hidden" id="taskSettingsRepeatDaily">
               <div class="repeat__daily__wrapper">
                  <input id="repeatDailyInput" type="text" />
               </div>
           </div>

           <div class="hidden" id="taskSettingsRepeatWeek">
              <input
                 class="repeat__week__el day__selected"
                 type="button"
                 value="Mon"
                 id="taskSettingsRepeatWeekMon"
                 />
              <input
                 class="repeat__week__el day__selected"
                 value="Tue"
                 type="button"
                 id="taskSettingsRepeatWeekTue"
                 />
              <input
                 class="repeat__week__el day__selected"
                 value="Wed"
                 type="button"
                 id="taskSettingsRepeatWeekWed"
                 />
              <input
                 class="repeat__week__el day__selected"
                 value="Thu"
                 type="button"
                 id="taskSettingsRepeatWeekThu"
                 />
              <input
                 class="repeat__week__el day__selected"
                 value="Fri"
                 type="button"
                 id="taskSettingsRepeatWeekFri"
                 />
              <input
                 class="repeat__week__el day__selected"
                 value="Sat"
                 type="button"
                 id="taskSettingsRepeatWeekSat"
                 />
              <input
                 class="repeat__week__el day__selected"
                 value="Sun"
                 type="button"
                 id="taskSettingsRepeatWeekSun"
                 />
           </div>

        </div>
        <div class="task__settings__el task__settings__difficulty">
           <label for="taskSettingsDifficulty">Difficulty</label>
           <select name="difficulty" id="taskSettingsDifficulty">
              <option id="taskSettingsDifficultyTrivial" value="trivial">Trivial</option>
              <option id="taskSettingsDifficultyEasy" value="easy">Easy</option>
              <option id="taskSettingsDifficultyMedium" value="medium">Medium</option>
              <option id="taskSettingsDifficultyHard" value="hard">Hard</option>
              <option id="taskSettingsDifficultyChallenge" value="challenge">Challenge</option>
           </select>
        </div>
        <div class="task__settings__el task__settings__energy">
           <label for="taskSettingsEnergy">Energy gain <img id="taskSettingsEnergyIcon" src=${iconEnergy} /> <span id="energyValueDisplay">1</span></label>
           <input type="range" value="1" min="1" max="100" id="taskSettingsEnergy" />
        </div>
        <div class="task__settings__el task__settings__checkpoints">
           <label for="taskSettingsCheckpoints">Checkpoints</label>
           
         <div id="checkpointsContainer" class="checkpoints__container">
              
              <div id="taskSettingsCpCont-1" class="checkpoint__container">
                 <input type="text" id="taskSettingsCheckpointInput-1" class="checkpoint__input" />
                 <div class="cps__icons__container hidden">
                     <div class="cp__icon--delete__wrapper">
                         <img class="cp__icon--delete" src=${iconDelete} />
                     </div>
            
                     <div class="cp__icon--drag__wrapper">
                        <img class="cp__icon--drag" src=${iconDrag} />
                     </div>
                 </div>
              </div>              
           </div>
        </div>

        <div class="task__settings__el task__settings__buttons">
           <button type="button" id="taskSettingsDoneBtn">Done</button>
           <button type="button" id="taskSettingsCloseBtn">Close</button>
        </div>        
     </form>
  </div>
</div>
`;
  }

  _generateCheckpointMarkup(id) {
    return `
      <div id="taskSettingsCpCont-${id}" class="checkpoint__container">
         <input type="text" id="taskSettingsCheckpointInput-${id}" class="checkpoint__input" />
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

  getElems() {
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

  renderNewCheckpoint(id) {
    const { cpsCont } = this.getElems();
    cpsCont.insertAdjacentHTML("beforeend", this._generateCheckpointMarkup(id));
    const curCpCont = document.getElementById(`taskSettingsCpCont-${id}`);
    curCpCont.firstElementChild.focus();
    return curCpCont;
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

  toggleDayOfWeek(weekEl) {
    weekEl.classList.toggle("day__selected");
  }

  deleteCp(deleteIconBtn) {
    if (deleteIconBtn.classList.contains("cp__icon--delete"))
      deleteIconBtn.closest(".checkpoint__container").remove();
  }

  render(parentEl) {
    parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());
  }
}
