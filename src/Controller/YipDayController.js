import YipDayView from "../View/main/yip/YipDayView";
import YipDayModel from "../Model/main/YipDayModel";

export default class YipDayController {
  constructor() {
    this.view = new YipDayView();
    this.model = new YipDayModel();
  }

  eventListeners(menu) {
    const id = this.model.state.id;
    let textarea;
    let titleInput;
    if (this.model.state.viewMode === "edit") {
      textarea = document.getElementById(`yipLogEditTextarea-${id}`);
      titleInput = document.getElementById(`yipLogEditTitle-${id}`);
    }
    const viewBtn = document.getElementById(`yipViewBtn-${id}`);
    const editBtn = document.getElementById(`yipEditBtn-${id}`);
    const moodColorBtn = document.getElementById(`yipMoodColorBtn-${id}`);

    if (this.model.state.viewMode === "edit") {
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
    }

    viewBtn.addEventListener("click", () => {
      this.view.renderView(this.model.state.log, this.model.state.logTitle, id);
      console.log(this.model.state);
      this.model.changeViewMode("view");
      this.model.db.initDoc();
    });

    editBtn.addEventListener("click", () => {
      this.view.renderEdit(this.model.state.log, this.model.state.logTitle, id);
      // init listeners again to reselect elements
      this.model.changeViewMode("edit");
      this.model.db.initDoc();
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
  }
}
