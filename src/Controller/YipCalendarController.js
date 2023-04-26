import YipCalendarView from "../View/main/yip/YipCalendarView";
import YipCalendarModel from "../Model/main/YipCalendarModel";
import { state } from "../Model/main/Model";

export default class YipCalendarController {
  constructor() {
    this.view = new YipCalendarView();
    this.model = new YipCalendarModel();
  }

  eventListeners = () => {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((gridItem) => {
      gridItem.addEventListener("click", (e) => {
        this.model.handler.initYipDayController(e);
        if (this.model.selectedDay) {
          this.view.clearOutline(this.model.selectedDay);
        }
        this.model.selectedDay = e.target.id;
        this.view.outlineSelectedDay(this.model.selectedDay);
      });
      gridItem.addEventListener("mouseover", () =>
        this.view.renderCurHoveredDay(gridItem.id)
      );
      gridItem.addEventListener("mouseout", () =>
        this.view.clearRenderCurDay()
      );
    });
  };

  setMoodColors() {
    const daysMoodColors = this.model.getDaysMoodColors();
    this.view.setMoodColors(daysMoodColors);
  }

  init() {
    this.view.render();
    this.model.initCurYipDayController();
    this.eventListeners();
    return this;
  }
}
