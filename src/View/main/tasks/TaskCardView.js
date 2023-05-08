import timerIcon from "./assets/timer-icon.svg";
import toggleIcon from "./assets/toggle-icon.svg";
import difficultyIcon from "./assets/icon-difficulty-trivial.svg";
import energyIcon from "./assets/energy-icon.svg";
import pauseTimerIcon from "./assets/pauseTimer-icon.svg";
import playTimerIcon from "./assets/playTimer-icon.svg";
import { marked } from "marked";
import View from "../../View";

export default class TaskCardView extends View {
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
        <input class="task-card__checkbox-input" type="checkbox" name="" id="taskCheckboxInput-${id}" />
      </div>

      <div class="task-card__main__container">
        <div id="taskCardTop-${id}" class="task-card__top__container">
          <span class="task-card__name" id="taskCardName-${id}">${name}</span>
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
          ${notes ? marked.parse(notes) : null}
          <br />
        </div>
        
        <hr id="taskCardLineBreak-2-${id}" class="task-card__line-break">
        
        <div id="cardCheckpoints-${id}" class="task-card__checkpoints__container">
        
        </div>

        <hr id="taskCardLineBreak-3-${id}" class="task-card__line-break">

          <div id="taskCardAdditionalInfo-${id}" class="task-card__additional-info">
            <div class="task-card__energy__container">
              <img class="task-card__energy__icon" src=${energyIcon} />
              <span id="taskCardEnergy-${id}" class="task-card__energy__points">${energy}</span>
            </div>          
        </div>          
      </div>
    </div>
  </div>
`;
  }

  getElems(id) {
    const taskCard = document.getElementById(`taskCard-${id}`);
    const name = document.getElementById(`taskCardName-${id}`);
    const notes = document.getElementById(`taskCardNotes-${id}`);
    const lineBreak1 = document.getElementById(`taskCardLineBreak-1-${id}`);
    const energy = document.getElementById(`taskCardEnergy-${id}`);

    return { taskCard, name, notes, lineBreak1, energy };
  }

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
    let cardCheckpoints = document.getElementById(
      `cardCheckpoints-${cardData.id}`
    );

    cardCheckpoints.textContent = "";
    cardData.checkpoints.forEach((cp, i) => {
      if (!cp.name) return;
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

    taskInfo.classList.toggle("hidden");
    !cardToggleIcon.classList.toggle("reverse-icon");
  }

  renderToggleTimer(id) {
    const timerContainer = document.getElementById(
      `taskCardTimerContainer-${id}`
    );
    timerContainer.classList.toggle("hidden");
  }

  renderToggleCheckTask(id) {
    console.log(id);
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
        if (unfinishedCp)
          unfinishedCp.style.setProperty("--difficultyColor", color);

        if (finishedCp)
          finishedCp.style.setProperty("--difficultyColor", color);
      });
      [
        taskCardCheckboxContainer,
        taskCardLineBreak1,
        taskCardLineBreak2,
        taskCardLineBreak3,
      ].forEach((e) => {
        if (!e) return;
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
    br?.remove();
  }

  _removeLinebreaks(id) {
    const cpsContainer = document.getElementById(`cardCheckpoints-${id}`);
    const taskCardLineBreak3 = document.getElementById(
      `taskCardLineBreak-3-${id}`
    );
    const taskCardLineBreak2 = document.getElementById(
      `taskCardLineBreak-2-${id}`
    );
    const taskCardNotes = document.getElementById(`taskCardNotes-${id}`);

    if (taskCardNotes) {
      if (!taskCardNotes.firstElementChild) {
        taskCardNotes.classList.add("hidden");
        taskCardLineBreak2.classList.add("hidden");
      } else {
        taskCardNotes.classList.remove("hidden");
        taskCardLineBreak2.classList.remove("hidden");
      }
    }

    if (cpsContainer) {
      if (!cpsContainer.firstElementChild) {
        cpsContainer.classList.add("hidden");
        taskCardLineBreak3.classList.add("hidden");
      } else {
        cpsContainer.classList.remove("hidden");
        taskCardLineBreak3.classList.remove("hidden");
      }
    }
  }

  addNotes({ notes, id }) {
    const { lineBreak1 } = this.getElems(id);
    const notesEl = document.createElement("div");
    const lineBreak2 = document.createElement("hr");
    notesEl.id = `taskCardNotes-${id}`;
    notesEl.className = "task-card__notes__container";
    lineBreak2.id = `taskCardLineBreak-2-${id}`;
    lineBreak2.className = "task-card__line-break";
    ///
    notesEl.insertAdjacentHTML("afterbegin", marked.parse(notes));
    lineBreak1.insertAdjacentElement("afterend", notesEl);
    notesEl.insertAdjacentElement("afterend", lineBreak2);
  }

  changeNotes({ notes, id }) {
    const { notes: notesEl } = this.getElems(id);
    notesEl.textContent = "";
    if (notes) {
      notesEl.insertAdjacentHTML("afterbegin", marked.parse(notes));
    } else {
      this._removeLinebreaks(id);
    }
  }

  _setEnergy({ energy, id }) {
    const { energy: energyEl } = this.getElems(id);
    energyEl.textContent = energy;
  }

  setCardData(cardData) {
    const { name, notes } = this.getElems(cardData.id);
    name.textContent = cardData.name;
    if (!notes) {
      this.addNotes(cardData);
    } else {
      this.changeNotes(cardData);
    }

    this._renderCps(cardData);
    this._renderColorDifficulty(cardData);
    this._setEnergy(cardData);
    this._removeLinebreaks(cardData.id);
  }

  render(parentEl, cardData) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(cardData));
    this._renderCps(cardData);
    this._renderColorDifficulty(cardData);
    this._removeGeneratedLastBrMarkdownNotes(cardData);
    this._removeLinebreaks(cardData.id);
  }
}
