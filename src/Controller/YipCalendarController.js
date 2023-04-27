import YipCalendarView from "../View/main/yip/YipCalendarView";
import YipCalendarModel from "../Model/main/YipCalendarModel";
import { state } from "../Model/main/Model";
import { formatYipCalendarId } from "../helpers/formatYipCalendarId";
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
          this.view.clearOutline(this.model.selectedDay.model.state.id);
        }
        const formatedId = formatYipCalendarId(e.target.id);
        this.model.selectedDay = state.yipDays[formatedId];

        const yipMenu = document.getElementById("yipMenu");
        this.model.selectedDay.model.obs.add(this.model);
        this.model.selectedDay.init(yipMenu);

        this.view.outlineSelectedDay(this.model.selectedDay.model.state.id);
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
    this.eventListeners();
    this.setMoodColors();
    return this;
  }
}
