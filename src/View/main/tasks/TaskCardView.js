import timerIcon from "./assets/timer-icon.svg";
import toggleIcon from "./assets/toggle-icon.svg";
import difficultyIcon from "./assets/icon-difficulty-trivial.svg";
import energyIcon from "./assets/energy-icon.svg";
import pauseTimerIcon from "./assets/pauseTimer-icon.svg";
import playTimerIcon from "./assets/playTimer-icon.svg";
import { marked } from "marked";

export default class TaskCardView {
  //prettier-ignore
  _generateMarkup({name,difficulty,checked,repeat,date,energy,id,isInfoToggled,isTimerToggled,timeTracked,notes,}) {
    return `
  <div id="taskCard-${id}">
    <div class="task-card__container">

      <div id="taskCardCheckboxContainer-${id}" class="task-card__checkbox__container">
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
      isInfoToggled ? null : "reverse-icon"
    } task-card__toggle-icon" src=${toggleIcon} />
            </div>
          </div>
        </div>

        <div id="taskCardTimerContainer-${id}" class="task-card__timer__container ${
      isTimerToggled ? null : "hidden"
    }">
          <span id="timer-${id}" class="task-card__timer">${timeTracked}</span>
       
          <img class="task-card__timer__pause-icon hidden" src=${pauseTimerIcon} id="pauseTimer-${id}"/>
          <img class="task-card__timer__play-icon" src=${playTimerIcon} id="playTimer-${id}" />
        </div>

      <div id="taskInfo-${id}" class="${isInfoToggled ? null : "hidden"}">
        <hr id="taskCardLineBreak-1-${id}" class="task-card__line-break">

        <div id="taskCardNotes-${id}" class="task-card__notes__container">
          ${marked.parse(notes)}
          <br />
        </div>
        
        <hr id="taskCardLineBreak-2-${id}" class="task-card__line-break">
        
        <div id="cardCheckpoints-${id}" class="task-card__checkpoints__container">
        
        </div>

        <hr id="taskCardLineBreak-3-${id}" class="task-card__line-break">

          <div id="taskCardAdditionalInfo-${id}" class="task-card__additional-info">
            <div class="task-card__energy__container">
              <img class="task-card__energy__icon" src=${energyIcon} />
              <span class="task-card__energy__points">${energy}</span>
            </div>          
        </div>          
      </div>
    </div>
  </div>
`;
  }

  // <div class="task-card__difficulty">
  //             <img class="task-card__difficulty__icon" src="./icon-difficulty-${difficulty}.svg" />
  //           </div>

  _generateCheckpoint(cpName, checked, num, id) {
    return `
    <div id="cardCheckpoint-${num}-${id}" class="task-card__checkpoint__container">           
      <span id="cardCheckpointUnfinished-${num}-${id}" class="task-card__checkpoint--unfinished ${
      checked ? "hidden" : null
    }" ></span>
      <span id="cardCheckpointFinished-${num}-${id}" class="task-card__checkpoint--finished ${
      checked ? null : "hidden"
    }"></span>
        <input type="checkbox" class="task-card__checkpoint-input" />
      <span>${cpName}</span>
    </div>
    `;
  }

  _renderCps(cardData) {
    const cardCheckpoints = document.getElementById(
      `cardCheckpoints-${cardData.id}`
    );
    cardData.checkpoints.forEach((cp, i) => {
      cardCheckpoints.insertAdjacentHTML(
        "beforeend",
        this._generateCheckpoint(cp["name"], cp["checked"], i, cardData.id)
      );
    });
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

  renderToggleInfo(id) {
    const taskInfo = document.getElementById(`taskInfo-${id}`);
    const cardToggleIcon = document.getElementById(`cardToggleIcon-${id}`);

    const isToggled = taskInfo.classList.contains("hidden");

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

  _renderColorDifficulty(cardData) {
    const id = cardData.id;
    const difficulty = cardData.difficulty;
    const cps = cardData.checkpoints;
    const taskCardCheckboxContainer = document.getElementById(
      `taskCardCheckboxContainer-${id}`
    );
    const taskCheckboxFinished = document.getElementById(
      `taskCheckboxFinished-${id}`
    );
    const taskCardLineBreak1 = document.getElementById(
      `taskCardLineBreak-1-${id}`
    );
    const taskCardLineBreak2 = document.getElementById(
      `taskCardLineBreak-2-${id}`
    );
    const taskCardLineBreak3 = document.getElementById(
      `taskCardLineBreak-3-${id}`
    );

    const setColor = (color, id = cardData.id) => {
      taskCheckboxFinished.style.setProperty("--difficultyColor", color);
      cps.forEach((_, i) => {
        const unfinishedCp = document.getElementById(
          `cardCheckpointUnfinished-${i}-${id}`
        );
        const finishedCp = document.getElementById(
          `cardCheckpointFinished-${i}-${id}`
        );
        finishedCp.style.setProperty("--difficultyColor", color);
        unfinishedCp.style.setProperty("--difficultyColor", color);
      });
      [
        taskCardCheckboxContainer,
        taskCardLineBreak1,
        taskCardLineBreak2,
        taskCardLineBreak3,
      ].forEach((e) => {
        e.style.setProperty("--difficultyColor", color);
      });
    };

    if (difficulty === "trivial") {
      setColor("#EDAE1D");
    }
    if (difficulty === "easy") {
      setColor("#469B46");
    }
    if (difficulty === "medium") {
      setColor("#0DBF9B");
    }
    if (difficulty === "hard") {
      setColor("#BC2C1A");
    }
    if (difficulty === "challenge") {
      setColor("#6457A6");
    }
  }

  _removeGeneratedLastBrMarkdownNotes(cardData) {
    const br = document.getElementById(
      `taskCardNotes-${cardData.id}`
    ).lastElementChild;
    br.remove();
  }

  _removeLinebreaks(cardData) {
    const cpsContainer = document.getElementById(
      `cardCheckpoints-${cardData.id}`
    );
    const taskCardLineBreak3 = document.getElementById(
      `taskCardLineBreak-3-${cardData.id}`
    );
    const taskCardLineBreak2 = document.getElementById(
      `taskCardLineBreak-2-${cardData.id}`
    );
    const taskCardNotes = document.getElementById(
      `taskCardNotes-${cardData.id}`
    );

    if (!taskCardNotes.firstElementChild) {
      taskCardNotes.remove();
      taskCardLineBreak2.remove();
    }

    if (!cpsContainer.firstElementChild) {
      cpsContainer.remove();
      taskCardLineBreak3.remove();
    }
    console.log(cpsContainer.firstElementChild);
  }

  render(parentEl, cardData) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(cardData));
    this._renderCps(cardData);
    this._renderColorDifficulty(cardData);
    this._removeGeneratedLastBrMarkdownNotes(cardData);
    this._removeLinebreaks(cardData);
  }
}
