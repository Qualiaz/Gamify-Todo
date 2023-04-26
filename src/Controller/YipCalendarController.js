import YipCalendarView from "../View/main/yip/YipCalendarView";
import YipCalendarModel from "../Model/main/YipCalendarModel";
import YipDayController from "./YipDayController";

export default class YipCalendarController {
  constructor() {
    this.view = new YipCalendarView();
    this.model = new YipCalendarModel();
  }

  eventListeners = () => {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((gridItem) => {
      gridItem.addEventListener("click", (e) =>
        this.model.handler.initYipDayController(e)
      );
      gridItem.addEventListener("mouseover", () =>
        this.view.renderCurHoveredDay(gridItem.id)
      );
      gridItem.addEventListener("mouseout", () =>
        this.view.clearRenderCurDay()
      );
    });
  };

  init() {
    this.view.render();
    this.eventListeners();
  }
}
