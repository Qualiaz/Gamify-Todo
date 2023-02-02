import HabitsComponentController from "../Habits/HabitsComponentController";
import { habitsMenuView } from "../../View/menus/HabitsMenuView";

// class HabitsMenuController {
//   //   component
//   constructor() {
//     this.view = new HabitsMenuView();
//   }

//   createComponent() {
//     return new HabitsComponentController();
//   }
// }

// export const habitsMenuController = new HabitsMenuController();

export default function habitsMenuController() {
  habitsMenuView.render();

  const habitsMenuEl = document.getElementById("habitsMenu");

  const habitsComponentController = new HabitsComponentController();
  habitsComponentController.init(habitsMenuEl);
}
