import HabitsComponentController from "../Habits/HabitsComponentController";
import HabitsMenuView from "../../View/menus/HabitsMenuView";

class HabitsMenuController {
  //   component
  constructor() {
    this.view = new HabitsMenuView();
  }

  createComponent() {
    return new HabitsComponentController();
  }
}

export const habitsMenuController = new HabitsMenuController();
