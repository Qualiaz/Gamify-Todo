import iconDelete from "./assets/delete-icon.svg";
import iconDrag from "./assets/icon-drag.svg";
import iconEnergy from "./assets/energy-icon.svg";
import iconDifficultyTrivial from "./assets/icon-difficulty-trivial.svg";

class AddTaskView {
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
           <input type="date" name="date" id="taskSettingsStartDate" />
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
           <label for="taskSettingsDifficulty">Difficulty <img id="taskSettingsIconDifficulty" src=${iconDifficultyTrivial}/></label>
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
              
              <div id="checkpointContainer-1" class="checkpoint__container">
                 <input type="text" id="checkpointInput-1" class="checkpoint__input" />
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

  renderNewCheckpoint(parentEl) {
    parentEl.insertAdjacentHTML("afterbegin", this._generateCheckpointMarkup);
  }

  render(parentEl) {
    parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());
  }
}

export const addTaskView = new AddTaskView();
