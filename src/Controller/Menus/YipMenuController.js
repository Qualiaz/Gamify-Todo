import YipMenuView from "../../View/menus/YipMenuView";
import YipCalendarController from "../YipCalendarController";
import YipDayController from "../YipDayController";

class YipMenuController {
  constructor() {
    this.view = new YipMenuView();
    this.yipDayController = new YipDayController();
    this.yipCalendarController = new YipCalendarController();
  }

  eventListeners() {
    this.yipCalendarController.yipDays;
  }

  init() {
    this.view.render();
    const yipMenu = document.getElementById("yipMenu");
    this.yipDayController.init(yipMenu);
    this.yipCalendarController.init();
    this.eventListeners();
  }
}

export const yipMenuController = new YipMenuController();
