import timerIcon from "./assets/timer-icon.svg";
import toggleIcon from "./assets/toggle-icon.svg";
import difficultyIcon from "./assets/icon-difficulty-trivial.svg";
import energyIcon from "./assets/energy-icon.svg";
import pauseTimerIcon from "./assets/pauseTimer-icon.svg";
import playTimerIcon from "./assets/playTimer-icon.svg";

export default class TaskCardView {
  _generateMarkup({
    name,
    difficulty,
    checked,
    repeat,
    date,
    energy,
    id,
    isInfoToggled,
    isTimerToggled,
    timeTracked,
    isTimeTracking,
  }) {
    return `
  <div id="taskCard-${id}">
    <div class="task-card__container">

      <div class="task-card__checkbox__container">
        <span class="task-card__checkbox--unfinished ${
          checked ? "hidden" : null
        }" id="taskCheckboxUnfinished-${id}"></span> 
        <span class="task-card__checkbox--finished ${
          checked ? null : "hidden"
        }" id="taskCheckboxFinished-${id}"></span> 
        <input class="task-card__checkbox-input" type="checkbox" name="" id="taskCheckboxInput" />
      </div>

      <div class="task-card__main__container">
        <div class="task-card__top__container">
          <span class="task-card__name">${name}</span>
          <div class="task-card__top__btns">
            <div class="task-card__timer-icon">
              <img id="cardTimerIcon-${id}" draggable="false" class="task-card__timer-icon" src=${timerIcon} />
            </div>
            <div class="task-card__toggle-icon">
              <img id="cardToggleIcon-${id}" draggable="false" class="${
      isInfoToggled ? "reverse-icon" : null
    } task-card__toggle-icon" src=${toggleIcon} />
            </div>
          </div>
        </div>

        <div id="taskCardTimerContainer-${id}" class="task-card__timer__container ${
      isTimerToggled ? "hidden" : null
    }">
          <span id="timer-${id}" class="task-card__timer">${
      timeTracked.tracked
    }</span>
       
          <img class="task-card__timer__pause-icon ${
            isTimeTracking ? null : "hidden"
          }" src=${pauseTimerIcon} id="pauseTimer-${id}"/>
          <img class="task-card__timer__play-icon ${
            isTimeTracking ? "hidden" : null
          }" src=${playTimerIcon} id="playTimer-${id}" />
        </div>

      <div id="taskInfo-${id}" class="${isInfoToggled ? null : "hidden"}">
        <div id="taskCardLineBreak-1-${id}" class="task-card__line-break"></div>

        <div id="taskCardNotes-${id}" class="task-card__notes__container">
          <p>
            Hello there, Those are the notes tasks I hope you have a
            wonderful meditation day! - pupic
          </p>
          <br />
          <p>ds</p>
        </div>
        
        <div id="taskCardLineBreak-2-${id}" class="task-card__line-break"></div>
        
        <div id="cardCheckpoints-${id}" class="task-card__checkpoints__container">
        
        </div>

        <div id="taskCardLineBreak-3-${id}" class="task-card__line-break"></div>

          <div id="taskCardAdditionalInfo-${id}" class="task-card__additional-info">
            <div class="task-card__energy__container">
              <img class="task-card__energy__icon" src=${energyIcon} />
              <span class="task-card__energy__points">${energy}</span>
            </div>

            <div class="task-card__difficulty">
              <img class="task-card__difficulty__icon" src="./icon-difficulty-${difficulty}.svg" />
            </div>
        </div>          
      </div>
    </div>
  </div>
`;
  }

  _generateCheckpoint(cpName, checked, num, id) {
    return `
    <div id="cardCheckpoint-${num}-${id}" class="task-card__checkpoint__container">           
      <span id="cardCheckpointUnfinished-${num}-${id}" class="task-card__checkpoint--unfinished" ${
      checked ? "hidden" : null
    }></span>
      <span id="cardCheckpointFinished-${num}-${id}" class="task-card__checkpoint--finished ${
      checked ? null : "hidden"
    }"></span>
        <input type="checkbox" class="task-card__checkpoint-input" />
      <span>${cpName}</span>
    </div>
    `;
  }

  renderCps(cpName, checked, num, id) {
    const cardCheckpoints = document.getElementById(`cardCheckpoints-${id}`);
    cardCheckpoints.insertAdjacentHTML(
      "beforeend",
      this._generateCheckpoint(cpName, checked, num, id)
    );
  }

  renderPlayTimer(id) {
    const timerEl = document.getElementById(`timer-${id}`);
    const playTimer = document.getElementById(`playTimer-${id}`);
    const pauseTimer = document.getElementById(`pauseTimer-${id}`);

    playTimer.classList.add("hidden");
    pauseTimer.classList.remove("hidden");

    timerEl.innerHTML = localStorage.getItem(`timeElapsed-${id}`);
  }

  renderPauseTimer(id) {
    const playTimer = document.getElementById(`playTimer-${id}`);
    const pauseTimer = document.getElementById(`pauseTimer-${id}`);

    pauseTimer.classList.add("hidden");
    playTimer.classList.remove("hidden");
  }

  render(parentEl, cardData) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(cardData));
  }

  renderToggleInfo(id) {
    const taskInfo = document.getElementById(`taskInfo-${id}`);
    const cardToggleIcon = document.getElementById(`cardToggleIcon-${id}`);

    const isToggled = !taskInfo.classList.contains("hidden");

    taskInfo.classList.toggle("hidden");
    !cardToggleIcon.classList.toggle("reverse-icon");

    // returns like this so it can sync in controller with the model state
    return isToggled;
  }

  renderToggleTimer(id) {
    const timerContainer = document.getElementById(
      `taskCardTimerContainer-${id}`
    );
    timerContainer.classList.toggle("hidden");

    // returns like this so it can sync in controller with the model state
    return !timerContainer.classList.contains("hidden");
  }

  renderToggleCheckTask(id) {
    const checkboxTaskUnfinished = document.getElementById(
      `taskCheckboxUnfinished-${id}`
    );
    const checkboxTaskFinished = document.getElementById(
      `taskCheckboxFinished-${id}`
    );
    // console.log()
    checkboxTaskUnfinished.classList.toggle("hidden");
    checkboxTaskFinished.classList.toggle("hidden");
  }

  renderToggleCheckCp(clickedId) {
    const cpNumber = clickedId.split("-")[1];
    const id = clickedId.split("-")[2];
    const unfinishedCp = document.getElementById(
      `cardCheckpointUnfinished-${cpNumber}-${id}`
    );
    const finishedCp = document.getElementById(
      `cardCheckpointFinished-${cpNumber}-${id}`
    );

    unfinishedCp.classList.toggle("hidden");
    finishedCp.classList.toggle("hidden");
  }
}
