import YipDayView from "../View/main/yip/YipDayView";
import YipDayModel from "../Model/main/YipDayModel";

export default class YipDayController {
  constructor() {
    this.view = new YipDayView();
    this.model = new YipDayModel();
  }

  eventListeners() {
    const id = this.model.state.id;

    let textarea = document.getElementById(`yipLogEditModeTextarea-${id}`);
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

    viewBtn.addEventListener("click", () => {
      this.view.renderView(this.model.state.log, id);
    });

    editBtn.addEventListener("click", () => {
      this.view.renderEdit(this.model.state.log, id);
      // init listeners again to reselect textarea
      this.eventListeners();
    });

    moodColorBtn.addEventListener("click", () => {
      this.model.nextMoodColor();
      this.view.setMoodColor(this.model.state.moodColor, this.model.state.id);
      this.model.obs.notify();
    });
  }

  init(parentEl, state = this.model.state) {
    this.view.render(parentEl, state);
    this.eventListeners();
  }
}
