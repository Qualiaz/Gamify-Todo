import YipMenuView from "../../View/menus/YipMenuView";
import YipCalendarController from "../YipCalendarController";
import YipDayController from "../YipDayController";
import { state } from "../../Model/main/Model";

class YipMenuController {
  constructor() {
    this.view = new YipMenuView();
    this.yipCalendarController = new YipCalendarController();
  }

  eventListeners() {
    this.yipCalendarController.yipDays;
  }

  init() {
    this.view.render();
    const yipMenu = document.getElementById("yipMenu");
    this.yipCalendarController.init();
    state.initYipDayController.init(yipMenu);
  }
}

export const yipMenuController = new YipMenuController();
