import timerIcon from "./assets/timer-icon.svg";
import toggleIcon from "./assets/toggle-icon.svg";
import difficultyIcon from "./assets/icon-difficulty-trivial.svg";
import energyIcon from "./assets/energy-icon.svg";
import pauseTimerIcon from "./assets/pauseTimer-icon.svg";
import playTimerIcon from "./assets/playTimer-icon.svg";

export default class TaskCardView {
  _generateMarkup({ name, difficulty, repeat, date, energy, id }) {
    return `
  <div id="taskCard-${id}">
    <div class="task-card__container">

      <div class="task-card__checkbox__container">
        <span class="task-card__checkbox--unfinished" id="taskCheckboxUnfinished"></span> 
        <span class="task-card__checkbox--finished hidden" id="taskCheckboxFinished"></span> 
        <input class="task-card__checkbox-input" type="checkbox" name="" id="taskCheckboxInput" />
      </div>

      <div class="task-card__main__container">
        <div class="task-card__top__container">
          <span class="task-card__name">${name}</span>
          <div class="task-card__top__btns">
            <div class="task-card__timer-icon">
              <img id="cardTimerIcon" class="task-card__timer-icon" src=${timerIcon} />
            </div>
            <div class="task-card__toggle-icon">
              <img id="cardToggleIcon" class="reverse-icon task-card__toggle-icon" src=${toggleIcon} />
            </div>
          </div>
        </div>

        <div class="task-card__timer__container">
          <span id="timer-${id}" class="task-card__timer">${id}</span>
          <img class="task-card__timer__pause-icon hidden" src=${pauseTimerIcon} id="pauseTimer" class="hidden"/>
          <img class="task-card__timer__play-icon" src=${playTimerIcon} id="playTimer" />
        </div>

        <div class="task-card__line-break"></div>

        <div class="task-card__notes__container">
          <p>
            Hello there, Those are the notes tasks I hope you have a
            wonderful meditation day! - pupic
          </p>
        </div>
        
        <div class="task-card__line-break"></div>
        
        <div id="cardCheckpoints-${id}" class="task-card__checkpoints__container">
        
        </div>

        <div class="task-card__line-break"></div>

          <div class="task-card__additional-info">
            <div class="task-card__energy__container">
              <img class="task-card__energy__icon" src=${energyIcon} />
              <span class="task-card__energy__points">${energy}</span>
            </div>

            <div class="task-card__difficulty">
              <img class="task-card__difficulty__icon"src=${difficultyIcon} />
            </div>
          
      </div>
    </div>
  </div>
`;
  }

  _generateCheckpoint(cpName, id) {
    return `
    <div id="cardCheckpoint-${id}" class="task-card__checkpoint__container">           
      <span class="task-card__checkpoint--unfinished"></span>
      <span class="task-card__checkpoint--finished hidden"></span>
        <input type="checkbox" class="task-card__checkpoint-input" />
      <span>${cpName}</span>
    </div>
    `;
  }

  renderCps(cpName, id) {
    const cardCheckpoints = document.getElementById(`cardCheckpoints-${id}`);
    cardCheckpoints.insertAdjacentHTML(
      "beforeend",
      this._generateCheckpoint(cpName, id)
    );
  }

  render(parentEl, cardData) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(cardData));
  }
}
