import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TaskModel from "../Model/main/TaskModel";
import TaskCardView from "../View/main/tasks/TaskCardView";
import TasksMenuController from "../View/main/tasks/tasksMenuView";

export default class TaskCardController {
  checkpoints = [];
  constructor(name, date, repeat, difficulty, energy, id) {
    this.name = name;
    this.date = date;
    this.repeat = repeat;
    this.difficulty = difficulty;
    this.energy = energy;
    this.id = id;
  }

  eventListeners() {
    document.addEventListener("click", (e) => {
      const clickedId = e.target.id;

      if (clickedId === "pauseTimer") {
        pauseTimer.classList.add("hidden");
        playTimer.classList.remove("hidden");
      }

      if (clickedId === "playTimer") {
        playTimer.classList.add("hidden");
        pauseTimer.classList.remove("hidden");
      }

      if (clickedId === "cardToggleIcon") {
        const toggleIcon = document.getElementById("cardToggleIcon");
        toggleIcon.classList.toggle("reverse-icon");
      }
    });
  }

  addCps(cps) {
    cps.forEach((cp) => {
      this.checkpoints.push(cp);
    });
  }

  render(parentEl, cardData = this) {
    const taskCardView = new TaskCardView();
    taskCardView.render(parentEl, cardData);
    this.checkpoints.forEach((cp) => {
      taskCardView.renderCps(cp, this.id);
    });
  }
}
