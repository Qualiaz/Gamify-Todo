import YipDayController from "../../Controller/YipDayController";

export default class YipCalendarModel {
  state = {
    yipDays: {},
  };

  update(yipDayModel) {
    const setMoodColor = () => {
      const id = yipDayModel.state.id;
      const gridItem = document.getElementById(`yipCalendar${id}`);
      gridItem.style.backgroundColor = yipDayModel.state.moodColor;
    };
    setMoodColor();
  }

  #formatYipCalendarId(id) {
    const monthDay = id.replace("yipCalendar", "");
    const month = monthDay.replace(/[0-9]/g, "");
    const day = monthDay.replace(/\D/g, "");
    const formattedMonth =
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    return `${formattedMonth}${day}`;
  }

  handler = {
    initYipDayController: (e) => {
      const yipMenu = document.getElementById("yipMenu");
      const id = this.#formatYipCalendarId(e.target.id);
      if (this.state.yipDays[id]) {
        const yipDayController = this.state.yipDays[id];
        yipDayController.view.remove();
        yipDayController.init(yipMenu);
      } else {
        // YipComponentController object doesn't exist for this day element
        const yipDayController = new YipDayController();
        yipDayController.model.state.id = this.#formatYipCalendarId(
          e.target.id
        );
        console.log(yipDayController.model.state.id);
        yipDayController.model.obs.add(this);
        yipDayController.view.remove();
        yipDayController.init(yipMenu);
        this.state.yipDays[id] = yipDayController;
      }
    },
  };
}
