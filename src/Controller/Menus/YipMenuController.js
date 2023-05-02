import YipMenuView from "../../View/menus/YipMenuView";
import YipCalendarController from "../YipCalendarController";
import { state } from "../../Model/main/Model";

export default class YipMenuController {
  constructor() {
    if (YipMenuController.instance) return YipMenuController.instance;

    this.view = new YipMenuView();
    this.yipCalendarController = new YipCalendarController();

    YipMenuController.instance = this;
  }

  eventListeners() {
    this.yipCalendarController.yipDays;
  }

  init() {
    this.view.render();
    const yipMenu = document.getElementById("yipMenu");
    this.yipCalendarController.init();
    state.initYipDayController.init(yipMenu);

    state.initYipDayController.model.obs.add(this.yipCalendarController.model);
    this.yipCalendarController.model.update(state.initYipDayController.model);

    this.yipCalendarController.view.renderDayText(
      state.selectedDay.model.state.id
    );
    this.yipCalendarController.view.outlineSelectedDay(
      state.selectedDay.model.state.id
    );

    state.selectedDay.init(yipMenu);
  }
}
