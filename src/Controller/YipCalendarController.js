import YipCalendarView from "../View/main/yip/YipCalendarView";
import YipCalendarModel from "../Model/main/YipCalendarModel";
import YipDayController from "./YipDayController";

function formatYipCalendarId(id) {
  const monthDay = id.replace("yipCalendar", "");
  const month = monthDay.replace(/[0-9]/g, "");
  const day = monthDay.replace(/\D/g, "");
  return `${month.toLowerCase()}${day}`;
}

export default class YipCalendarController {
  constructor() {
    this.view = new YipCalendarView();
    this.model = new YipCalendarModel();
    this.yipDay = {};
  }

  eventListeners = () => {
    const addEventListenersToDays = () => {
      const gridItems = document.querySelectorAll(".grid-item");
      const hoveredDayElem = document.querySelector(
        ".yip-calendar__hovered-day"
      );
      const yipMenu = document.getElementById("yipMenu");

      gridItems.forEach((gridItem) => {
        gridItem.addEventListener("click", (e) => {
          const id = formatYipCalendarId(e.target.id);
          if (this.yipDay[id]) {
            const yipComponent = this.yipDay[id];
            yipComponent.view.remove();
            yipComponent.init(yipMenu);
          } else {
            // YipComponentController object doesn't exist for this day element
            const yipComponent = new YipDayController();
            this.yipDay[id] = yipComponent;
            yipComponent.view.remove();
            yipComponent.init(yipMenu);
          }
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
  };

  init() {
    this.view.render();
    this.eventListeners();
  }
}
