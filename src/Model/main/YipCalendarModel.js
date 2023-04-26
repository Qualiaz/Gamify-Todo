import YipDayController from "../../Controller/YipDayController";
import { state } from "./Model";
import { formatYipCalendarId } from "../../helpers/formatYipCalendarId";

export default class YipCalendarModel {
  state = {
    yipDays: {},
    selectedDay: null,
  };

  initCurYipDayController() {
    const initYipDayController = state.initYipDayController;
    const id = initYipDayController.model.state.id;
    this.state.yipDays[id] = initYipDayController;
  }

  getDaysMoodColors() {
    //
    let daysColors = {};
    for (let key in this.state.yipDays) {
      daysColors[key] = this.state.yipDays[key].model.state.moodColor;
    }
    return daysColors;
  }

  update(yipDayModel) {
    const setMoodColor = () => {
      console.log("do i run?");
      const id = yipDayModel.state.id;
      const gridItem = document.getElementById(`yipCalendar${id}`);
      gridItem.style.backgroundColor = yipDayModel.state.moodColor;
    };
    setMoodColor();
  }

  handler = {
    initYipDayController: (e) => {
      const yipMenu = document.getElementById("yipMenu");
      const id = formatYipCalendarId(e.target.id);
      if (this.state.yipDays[id]) {
        const yipDayController = this.state.yipDays[id];
        yipDayController.view.remove();
        yipDayController.init(yipMenu);
      } else {
        // YipComponentController object doesn't exist for this day element
        const yipDayController = new YipDayController();
        yipDayController.model.state.id = id;

        yipDayController.model.obs.add(this);
        yipDayController.view.remove();
        yipDayController.init(yipMenu);
        this.state.yipDays[id] = yipDayController;
      }
    },
  };
}
