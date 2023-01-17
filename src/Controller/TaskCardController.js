import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TaskModel from "../Model/main/TaskModel";
import TaskCardView from "../View/main/tasks/TaskCardView";
import TasksMenuController from "../View/main/tasks/tasksMenuView";
import { renderCards, renderTasksMenu } from "./TasksMenuController";

export default class TaskCardController {
  taskCardView;
  numId = 0;
  constructor(
    name,
    checked,
    date,
    repeat,
    difficulty,
    energy,
    checkpoints,
    id
  ) {
    this.name = name;
    this.date = date;
    this.repeat = repeat;
    this.difficulty = difficulty;
    this.energy = energy;
    this.checkpoints = checkpoints;
    this.id = id;
    this.checked = checked;
  }

  eventListeners() {
    document.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      const playTimer = document.getElementById(`playTimer-${this.id}`);
      const pauseTimer = document.getElementById(`pauseTimer-${this.id}`);
      const cardToggle = document.getElementById(`cardToggleIcon-${this.id}`);

      if (clickedId === `pauseTimer-${this.id}`) {
        pauseTimer.classList.add("hidden");
        playTimer.classList.remove("hidden");
      }

      if (clickedId === `playTimer-${this.id}`) {
        playTimer.classList.add("hidden");
        pauseTimer.classList.remove("hidden");
      }

      if (clickedId === `cardToggleIcon-${this.id}`) {
        cardToggle.classList.toggle("reverse-icon");
      }

      if (clickedId === `taskCheckboxUnfinished-${this.id}`) {
        this.checked = true;
        console.log(this.checked);
        checkTask(this.id, this.checked);
      }

      if (clickedId === `taskCheckboxFinished-${this.id}`) {
        this.checked = false;
        checkTask(this.id, this.checked);
      }

      // WHEN USER CHECKS CHECKPOINT
      if (
        clickedId.startsWith("cardCheckpointUnfinished") &&
        clickedId.endsWith(this.id)
      ) {
        checkCheckpoint(clickedId, this.id, true);
      }
      // WHEN USER UNCHECKS CHECKPOINT
      if (
        clickedId.startsWith("cardCheckpointFinished") &&
        clickedId.endsWith(this.id)
      ) {
        checkCheckpoint(clickedId, this.id, false);
      }
    });
  }

  render(parentEl, cardData = this) {
    const taskCardView = new TaskCardView();
    taskCardView.render(parentEl, cardData);
    this.checkpoints.forEach((cp) => {
      taskCardView.renderCps(cp["name"], cp["checked"], this.numId, this.id);
      cp.id = `cardCheckpoint-${this.numId}-${this.id}`;
      this.numId++;
    });
    this.numId = 0;
    this.taskCardView = taskCardView;
  }
}

function checkCheckpoint(clickedId, id, checked) {
  const cpNumId = clickedId.split("-")[1];
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTasksRef = collection(docUserRef, "tasks");
  const docTaskRef = doc(colTasksRef, id);

  (async () => {
    try {
      const docSnap = await getDoc(docTaskRef);
      const checkpoints = docSnap.data().checkpoints;
      const { name } = checkpoints[cpNumId];
      checkpoints[cpNumId] = { checked: checked, name: name };
      updateDoc(docTaskRef, { checkpoints });
    } catch (err) {
      console.log(err);
    }
  })();
}

function checkTask(id, checked) {
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTasksRef = collection(docUserRef, "tasks");
  const docTaskRef = doc(colTasksRef, id);
  updateDoc(docTaskRef, { checked: checked });
}
