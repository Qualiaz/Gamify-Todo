export default function initTaskSettings() {
  const markup = `
  <div id="taskSettings" class="task__settings__background">
    <div class="task__settings__container">
     <form action="POST">
        <div class="task__settings__el task__settings__name">
           <label for="taskSettingsName">Name</label>
           <input type="text" id="taskSettingsName" />
        </div>
        <div class="task__settings__el task__settings__start-date">
           <label for="taskSettingsStartDate">Start Date</label>
           <input type="date" name="date" id="taskSettingsStartDate" />
        </div>
        <div class="task__settings__el task__settings__repeat">
           <label for="taskSettingsRepeat">Repeat</label>
           <select name="repetition" id="taskSettingsRepeat">
              <option value="one-time">One Time</option>
              <option value="every-day">Every Day</option>
              <option value="every-week">Every Week</option>
           </select>
           <label for="week">Week</label>
           <div id="taskSettingsRepeatWeek">
              <input
                 type="button"
                 value="Mon"
                 id="taskSettingsRepeatWeekMon"
                 />
              <input
                 value="Tue"
                 type="button"
                 id="taskSettingsRepeatWeekTue"
                 />
              <input
                 value="Wed"
                 type="button"
                 id="taskSettingsRepeatWeekWed"
                 />
              <input
                 value="Thu"
                 type="button"
                 id="taskSettingsRepeatWeekThu"
                 />
              <input
                 value="Fri"
                 type="button"
                 id="taskSettingsRepeatWeekFri"
                 />
              <input
                 value="Sat"
                 type="button"
                 id="taskSettingsRepeatWeekSat"
                 />
              <input
                 value="Sun"
                 type="button"
                 id="taskSettingsRepeatWeekSun"
                 />
           </div>
        </div>
        <div class="task__settings__el task__settings__difficulty">
           <label for="taskSettingsDifficulty">Difficulty</label>
           <select name="difficulty" id="taskSettingsDifficulty">
              <option value="trivial">Trivial</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="challenge">Challenge</option>
           </select>
        </div>
        <div class="task__settings__el task__settings__energy">
           <label for="taskSettingsEnergy">Energy</label>
           <input type="range" id="taskSettingsEnergy" />
        </div>
        <div class="task__settings__el task__settings__checkpoints">
           <label for="taskSettingsCheckpoints">Checkpoints</label>
           <div class="checkpoints__container">
              <div class="checkpoint__container" draggable="false">
                 <input type="text" class="checkpoint" />
                 <div class="checkpoint__icon-drag">
                    <div class="icon">X</div>
                 </div>
              </div>
              <div class="checkpoint__container" draggable="false">
                 <input type="text" class="checkpoint" />
                 <div class="checkpoint__icon-drag">
                    <div class="icon">X</div>
                 </div>
              </div>
           </div>
        </div>
        <div class="task__settings__el task__settings__deleteBtn">
           <button id="deleteTask">Delete</button>
        </div>
        <div class="task__settings__el task__settings__doneBtn">
           <button id="addTask">Done</button>
        </div>
     </form>
  </div>
</div>
`;
  return markup;
}
