import YipDayView from "../View/main/yip/YipDayView";
import YipDayModel from "../Model/main/YipDayModel";
import { state } from "../Model/main/Model";

export default class YipDayController {
  constructor() {
    this.view = new YipDayView();
    this.model = new YipDayModel();
  }

  eventListeners(menu) {
    const id = this.model.state.id;

    let textarea = document.getElementById(`yipLogEditTextarea-${id}`);
    let titleInput = document.getElementById(`yipLogEditTitle-${id}`);
    const viewBtn = document.getElementById(`yipViewBtn-${id}`);
    const editBtn = document.getElementById(`yipEditBtn-${id}`);
    const moodColorBtn = document.getElementById(`yipMoodColorBtn-${id}`);

    textarea.addEventListener("keydown", (e) =>
      this.model.handler.tabIndent(e)
    );

    textarea.addEventListener("keydown", (e) =>
      this.model.handler.keepBulletPointOnNewLine(e)
    );

    textarea.addEventListener("input", () => {
      this.model.changeLog(textarea.value);
    });

    titleInput.addEventListener("input", () => {
      this.model.changeLogTitle(titleInput.value);
    });

    viewBtn.addEventListener("click", () => {
      this.view.renderView(this.model.state.log, this.model.state.logTitle, id);
      this.model.db.initDoc();
    });

    editBtn.addEventListener("click", () => {
      this.view.renderEdit(this.model.state.log, this.model.state.logTitle, id);
      // init listeners again to reselect elements
      this.eventListeners();
    });

    moodColorBtn.addEventListener("click", () => {
      this.model.nextMoodColor();
      this.view.setMoodColor(this.model.state.moodColor, id);
      if (arguments[0].id === "yipMenu") {
        this.model.obs.notify();
      }
    });
  }

  init(parentEl) {
    this.view.render(parentEl, this.model.state);
    this.eventListeners(parentEl);
    // console.log(state);
    console.log(parentEl);
  }
}
