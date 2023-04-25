import YipMenuView from "../../View/menus/YipMenuView";
import YipCalendarController from "../YipCalendarController";
import YipComponentController from "../YipComponentController";

class YipMenuController {
  constructor() {
    this.view = new YipMenuView();
    this.yipComponentController = new YipComponentController();
    this.yipCalendarController = new YipCalendarController();
  }

  init() {
    this.view.render();
    const yipMenu = document.getElementById("yipMenu");
    this.yipComponentController.init(yipMenu);
    this.yipCalendarController.init();
  }
}

export const yipMenuController = new YipMenuController();
