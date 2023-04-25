import YipDayView from "../View/main/yip/YipDayView";
import YipDayModel from "../Model/main/YipDayModel";

export default class YipDayController {
  constructor() {
    this.view = new YipDayView();
    this.model = new YipDayModel();
  }

  eventListeners() {}

  init(parentEl, state = this.model.state) {
    this.view.render(parentEl, state);
  }
}
