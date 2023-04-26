import YipMenuView from "../../View/menus/YipMenuView";
import YipCalendarController from "../YipCalendarController";
import YipComponentController from "../YipDayController";

class YipMenuController {
  constructor() {
    this.view = new YipMenuView();
    this.yipComponentController = new YipComponentController();
    this.yipCalendarController = new YipCalendarController();
  }

  eventListeners() {
    // this.yipCalendarController
  }

  init() {
    this.view.render();
    const yipMenu = document.getElementById("yipMenu");
    this.yipComponentController.init(yipMenu);
    this.yipCalendarController.init();
    this.eventListeners();
  }
}

export const yipMenuController = new YipMenuController();
