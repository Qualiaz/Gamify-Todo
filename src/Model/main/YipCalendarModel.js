import YipDayController from "../../Controller/YipDayController";
import Model, { state } from "./Model";
import { formatYipCalendarId } from "../../helpers/formatYipCalendarId";

export default class YipCalendarModel extends Model {
  getDaysMoodColors() {
    //
    let daysColors = {};
    for (let key in state.yipDays) {
      daysColors[key] = state.yipDays[key].model.state.moodColor;
    }
    return daysColors;
  }

  update(yipDayModel) {
    const setMoodColor = () => {
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
      if (state.yipDays[id]) {
        const yipDayController = state.yipDays[id];
        // yipDayController.view.remove();
        yipDayController.init(yipMenu);
        state.selectedDay = yipDayController;
      } else {
        // YipComponentController object doesn't exist for this day element
        const yipDayController = new YipDayController();
        yipDayController.model.state.id = id;

        yipDayController.model.obs.add(this);
        // yipDayController.view.remove();
        yipDayController.init(yipMenu);
        state.yipDays[id] = yipDayController;
        state.selectedDay = yipDayController;
      }
    },
  };
}
