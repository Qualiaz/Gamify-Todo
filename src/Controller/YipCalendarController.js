import YipCalendarView from "../View/main/yip/YipCalendarView";
import YipCalendarModel from "../Model/main/YipCalendarModel";

export default class YipCalendarController {
  constructor() {
    this.view = new YipCalendarView();
    this.model = new YipCalendarModel();
  }

  eventListeners() {
    const addEventListenersToDays = () => {
      const gridItems = document.querySelectorAll(".grid-item");
      const hoveredDayElem = document.querySelector(
        ".yip-calendar__hovered-day"
      );
      gridItems.forEach((gridItem) => {
        gridItem.addEventListener("click", function () {
          this.style.backgroundColor = "yellow";
        });
      });

      gridItems.forEach((gridItem) => {
        gridItem.addEventListener("mouseover", function () {
          const id = this.id;
          const monthDay = id.replace("yipCalendar", "");
          const month = monthDay.replace(/[0-9]/g, "");
          const day = monthDay.replace(/\D/g, "");
          const formattedDate = `${month} ${day}`;
          hoveredDayElem.textContent = formattedDate;
        });
        gridItem.addEventListener("mouseout", function () {
          hoveredDayElem.textContent = "";
        });
      });
    };
    addEventListenersToDays();
  }

  init() {
    this.view.render();
    this.eventListeners();
  }
}
