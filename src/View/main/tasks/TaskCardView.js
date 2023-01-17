import timerIcon from "./assets/timer-icon.svg";
import toggleIcon from "./assets/toggle-icon.svg";
import difficultyIcon from "./assets/icon-difficulty-trivial.svg";
import energyIcon from "./assets/energy-icon.svg";
import pauseTimerIcon from "./assets/pauseTimer-icon.svg";
import playTimerIcon from "./assets/playTimer-icon.svg";

export default class TaskCardView {
  _generateMarkup({ name, difficulty, checked, repeat, date, energy, id }) {
    return `
  <div id="taskCard-${id}">
    <div class="task-card__container">

      <div class="task-card__checkbox__container">
        <span class="task-card__checkbox--unfinished ${
          checked ? "hidden" : console.log("checked is false")
        }" id="taskCheckboxUnfinished-${id}"></span> 
        <span class="task-card__checkbox--finished ${
          checked ? console.log("checked is true") : "hidden"
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
              <img id="cardToggleIcon-${id}" draggable="false" class="reverse-icon task-card__toggle-icon" src=${toggleIcon} />
            </div>
          </div>
        </div>

        <div class="task-card__timer__container">
          <span id="timer-${id}" class="task-card__timer">${id}</span>
          <img class="task-card__timer__pause-icon hidden" src=${pauseTimerIcon} id="pauseTimer-${id}" class="hidden"/>
          <img class="task-card__timer__play-icon" src=${playTimerIcon} id="playTimer-${id}" />
        </div>

        <div class="task-card__line-break"></div>

        <div class="task-card__notes__container">
          <p>
            Hello there, Those are the notes tasks I hope you have a
            wonderful meditation day! - pupic
          </p>
          <br />
          <p>ds</p>
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
              <img class="task-card__difficulty__icon" src="./icon-difficulty-${difficulty}.svg" />
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
      checked ? "hidden" : ""
    }></span>
      <span id="cardCheckpointFinished-${num}-${id}" class="task-card__checkpoint--finished ${
      checked ? "" : "hidden"
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

  render(parentEl, cardData) {
    console.log(cardData.checked);
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(cardData));
  }
}
