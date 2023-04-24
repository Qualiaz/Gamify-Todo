import HabitsComponentController from "../Habits/HabitsComponentController";
import { habitsMenuView } from "../../View/menus/HabitsMenuView";

export default function habitsMenuController() {
  habitsMenuView.render();

  const habitsMenuEl = document.getElementById("habitsMenu");
  const habitsComponentController = new HabitsComponentController();

  habitsComponentController.init(habitsMenuEl);
}
