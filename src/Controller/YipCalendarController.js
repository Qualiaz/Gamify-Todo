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
    const gridItems = document.querySelectorAll(".grid-item--selectable");
    const yipCalendarMain = document.querySelector(".yip-calendar__main");

    gridItems.forEach((gridItem) => {
      gridItem.addEventListener("click", (e) => {
        this.model.handler.initYipDayController(e);
        this.view.clearOutlines();

        const formatedId = formatYipCalendarId(e.target.id);
        state.selectedDay = state.yipDays[formatedId];

        const yipMenu = document.getElementById("yipMenu");
        state.selectedDay.model.obs.add(this.model);
        state.selectedDay.init(yipMenu);

        this.view.outlineSelectedDay(state.selectedDay.model.state.id);
        // this.view.renderTextSelectedDay(state.selectedDay.model.state.id);
        this.view.renderDayText(gridItem.id);
      });
      gridItem.addEventListener("mouseover", () =>
        this.view.renderDayText(gridItem.id)
      );
    });

    yipCalendarMain.addEventListener("mouseout", () => {
      this.view.renderDayText(state.selectedDay.model.state.id);
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
