import HabitsComponentController from "../Habits/HabitsComponentController";
import HabitsMenuView from "../../View/menus/HabitsMenuView";

export default class HabitsMenuController {
  constructor() {
    if (HabitsMenuController.instance) return HabitsMenuController.instance;
    this.view = new HabitsMenuView();

    HabitsMenuController.instance = this;
  }

  init() {
    this.view.render();
    const habitsMenuEl = document.getElementById("habitsMenu");
    new HabitsComponentController().init(habitsMenuEl);
  }
}
