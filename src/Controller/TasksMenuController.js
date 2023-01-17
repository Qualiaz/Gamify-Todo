import { collection, doc, documentId, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TasksMenuView from "../View/main/tasks/tasksMenuView";
import TaskCardController from "./TaskCardController";
import { onAuthStateChanged } from "firebase/auth";
import addTaskControllerInit from "./Tasks/AddTaskController";
import TaskCardView from "../View/main/tasks/TaskCardView";

const main = document.getElementById("main");

function eventListeners() {
  document.addEventListener("click", (e) => {
    const clickedId = e.target.id;
    if (clickedId === "addTaskBtn") {
      addTaskControllerInit();
    }
  });
}

export function renderTasksMenu() {
  TasksMenuView.render(main);
  const tomorrowTasksCards = document.getElementById("tomorrowTasksCards");
  renderCards(tomorrowTasksCards);
}

export function renderCards(parentEl) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const docUserRef = doc(db, "users", user.uid);
      const colTaskRef = collection(docUserRef, "tasks");

      onSnapshot(colTaskRef, (snapshot) => {
        parentEl.innerHTML = "";
        snapshot.docs.forEach((doc) => {
          const id = doc.id;
          const name = doc.data().name;
          const checked = doc.data().checked;
          const startDate = doc.data().startDate;
          const repeat = doc.data().repeat;
          const difficulty = doc.data().difficulty;
          const energy = doc.data().energy;
          const checkpoints = doc.data().checkpoints;
          const taskCard = new TaskCardController(
            name,
            checked,
            startDate,
            repeat,
            difficulty,
            energy,
            checkpoints,
            id
          );
          taskCard.isInfoToggled = doc.data().isInfoToggled;
          taskCard.isTimerToggled = doc.data().isTimerToggled;

          taskCard.render(parentEl);
          taskCard.eventListeners();
        });
      });
    }
  });
}

export default function tasksMenuControllerInit() {
  renderTasksMenu();
  eventListeners();
}

// export function renderCards(parentEl) {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const docUserRef = doc(db, "users", user.uid);
//       const colTaskRef = collection(docUserRef, "tasks");

//       onSnapshot(colTaskRef, (snapshot) => {
//         parentEl.innerHTML = "";
//         snapshot.docs.forEach((doc) => {
//           const id = doc.id;
//           const name = doc.data().name;
//           const checked = doc.data().checked;
//           const startDate = doc.data().startDate;
//           const repeat = doc.data().repeat;
//           const difficulty = doc.data().difficulty;
//           const energy = doc.data().energy;
//           const checkpoints = doc.data().checkpoints;
//           const taskCard = new TaskCardController(
//             name,
//             checked,
//             startDate,
//             repeat,
//             difficulty,
//             energy,
//             checkpoints,
//             id
//           );
//           taskCard.render(parentEl);
//           taskCard.eventListeners();
//         });
//       });
//     }
//   });
// }
