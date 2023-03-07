import { swapElems } from "../../helpers/drag";
import { turnElemsCursorInto } from "../../helpers/set-cursor";
import { TaskSettingsModel } from "../../Model/main/TaskModel";
import TaskSettingsView from "../../View/main/tasks/AddTaskView";

const root = document.getElementById("root");

export default class TaskSettingsController {
  curTaskCard;
  constructor() {
    this.view = new TaskSettingsView();
    this.model = new TaskSettingsModel();
  }

  async eventListeners() {
    const {
      energy,
      cpsCont,
      difficultySelect,
      energyValueDisplay,
      repeatOptionEveryWeek,
      repeatOptionNoRepeat,
      repeatOptionEveryOtherDay,
      repeatWeekContainer,
      closeBtn,
      doneBtn,
      deleteBtn,
      inputValues,
    } = this.view.getElems();
    console.log(deleteBtn);
    // console.log(doneBtn);
    doneBtn.addEventListener("click", (e) => {
      // const taskSettingsValues = this.view.getElems()
      // console.log(values());
      // if task exists

      // console.log(inputValues());
      if (this.curTaskCard) {
        const cardState = this.curTaskCard.model.setCardState(inputValues());
        this.curTaskCard.view.setCardData(cardState);
        this.model.state = cardState;
        this.model.updateTaskDb(cardState);
        this.curTaskCard.view.setCardData(cardState);
        root.removeChild(root.children[0]);
      }
      // if task doesn't exist
      else {
        const taskCardController = this.model.addTask(inputValues());
        taskCardController.then((controller) => {
          controller.model.taskSettingsController = this;
          this.curTaskCard = controller;
        });
      }
    });

    closeBtn.addEventListener("click", () => {
      this.view.closeSettings();
      this.model.resetCurCpId();
    });

    // DELETE
    if (this.curTaskCard) {
      deleteBtn.addEventListener("click", () => {
        this.curTaskCard.model.deleteTask();
        this.model.removeDocDb();
        const { taskCard: taskCardEl } = this.curTaskCard.view.getElems(
          this.curTaskCard.model.cardState.id
        );
        taskCardEl.remove();
        this.view.closeSettings();
      });
    }

    ///////////////////////////////////
    ////////////// REPEAT /////////////
    ///////////////////////////////////
    repeatOptionNoRepeat.addEventListener("click", () => {
      this.view.renderNoRepeat();
    });

    repeatOptionEveryOtherDay.addEventListener("click", () => {
      this.view.renderRepeatEveryOtherDay();
    });

    repeatOptionEveryWeek.addEventListener("click", () => {
      this.view.renderRepeatEveryWeek();
    });

    repeatWeekContainer.addEventListener("click", (e) => {
      console.log(e.target.dataset.selected);
      this.view.toggleDayOfWeek(e.target);
    });

    ///////////////////////////////////
    ////////////// ENERGY /////////////
    ///////////////////////////////////

    // Set energy range based on difficulty
    Array.from(difficultySelect.children).forEach((diffEl) => {
      diffEl.addEventListener("click", () => {
        this.model.setEnergyRange(difficultySelect, energy, energyValueDisplay);
      });
    });

    // Set energy value within range
    energy.addEventListener("input", (e) => {
      this.view.setEnergyValueDisplay(e.target);
    });

    //////////////////////////////////
    /////////// CHECKPOINTS //////////
    //////////////////////////////////

    // Add checkpoint
    cpsCont.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        console.log(e.target);
        console.log(this.model.state.curCpId);
        if (this.model.isCpElemFocusedLast(e.target)) {
          const cpId = this.model.incrementCurCpId();
          this.view.renderNewCheckpoint(cpId);
        }
      }
    });

    // Hover checkpoints
    cpsCont.addEventListener("mouseenter", (e) => {
      this.view.hoverDisplayCpIcons(e.target);
    });

    cpsCont.addEventListener("mouseleave", (e) => {
      this.view.hoverDisplayCpIcons(e.target);
    });

    // Delete view checkpoint
    cpsCont.addEventListener("click", (e) => {
      this.view.deleteCp(e.target);
    });

    // Drag checkpoint
    cpsCont.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("icon-drag")) {
        this.view.dragIcons(e.target);
        turnElemsCursorInto("grab");
      }
    });

    window.addEventListener("mouseup", () => {
      turnElemsCursorInto("reset");
    });
  }

  init(state) {
    if (state) {
      this.view.render(root, state);
      this.view.renderExistingCardSettings();
    } else {
      this.view.render(root);
    }
    this.eventListeners();
  }
}
