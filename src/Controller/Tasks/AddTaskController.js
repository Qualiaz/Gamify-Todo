import { swapElems } from "../../helpers/drag";
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
      difficulty,
      energyValueDisplay,
      repeatWeek,
      repeatNoRepeat,
      repeatEveryOtherDay,
      repeatEveryWeek,
      closeBtn,
      doneBtn,
    } = this.view.getElems();

    doneBtn.addEventListener("click", () => {
      const taskSettingsValues = this.model.getValues(this.view.getElems());
      const taskCardController = this.model.addTask(taskSettingsValues);
      taskCardController.then(
        (controller) => (controller.model.taskSettingsController = this)
      );
    });

    closeBtn.addEventListener("click", () => {
      this.model.closeSettings();
    });

    ///////////////////////////////////
    ////////////// REPEAT /////////////
    ///////////////////////////////////
    repeatWeek.addEventListener("click", (e) => {
      this.view.toggleDayOfWeek(e.target);
    });

    repeatNoRepeat.addEventListener("click", () => {
      this.view.renderNoRepeat();
    });

    repeatEveryOtherDay.addEventListener("click", () => {
      this.view.renderRepeatEveryOtherDay();
    });

    repeatEveryWeek.addEventListener("click", () => {
      this.view.renderRepeatEveryWeek();
    });

    ///////////////////////////////////
    ////////////// ENERGY /////////////
    ///////////////////////////////////

    // Set energy range based on difficulty
    Array.from(difficulty.children).forEach((diffEl) => {
      diffEl.addEventListener("click", () => {
        this.model.setEnergyRange(difficulty, energy, energyValueDisplay);
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
        if (this.model.isCpElemFocusedLast(e.target)) {
          const cpId = this.model.incrementCurCpId();
          this.view.renderNewCheckpoint(cpId);
        }
      }
    });

    // Delete checkpoint
    cpsCont.addEventListener("click", (e) => {
      this.view.deleteCp(e.target);
    });

    // Hover checkpoints
    cpsCont.addEventListener("mouseenter", (e) => {
      this.view.hoverDisplayCpIcons(e.target);
    });

    cpsCont.addEventListener("mouseleave", (e) => {
      this.view.hoverDisplayCpIcons(e.target);
    });

    // Drag checkpoint
    cpsCont.addEventListener("mousedown", (e) => {
      this.view.dragIcons(e.target);
    });
  }

  init(state) {
    // console.log(values);
    // if (values) this.model.setValues();
    this.view.render(root, state);
    this.eventListeners();
  }
}
