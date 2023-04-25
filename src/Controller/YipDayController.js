import YipDayView from "../View/main/yip/YipDayView";
import YipDayModel from "../Model/main/YipDayModel";

export default class YipDayController {
  constructor() {
    this.view = new YipDayView();
    this.model = new YipDayModel();
  }

  eventListeners() {
    this.model.id;
    document.getElementById("");

    const textarea = document.querySelector(".yip-component__edit-textarea");
    console.log(textarea);

    textarea.addEventListener("keydown", (e) =>
      this.model.handler.tabIndent(e)
    );
    textarea.addEventListener("keydown", (e) =>
      this.model.handler.keepBulletPointOnNewLine(e)
    );
  }

  init(parentEl, state = this.model.state) {
    this.view.render(parentEl, state);
    this.eventListeners();
  }
}
