import { add } from "date-fns";
import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import TaskModel from "../../Model/main/TaskModel";
import { addTaskView } from "../../View/main/tasks/AddTaskView";

const root = document.getElementById("root");

function addCp(idNumber) {
  const cpsCont = document.getElementById("checkpointsContainer");
  const cpCont = document.getElementById("checkpointContainer-1");

  const newCpCont = cpCont.cloneNode(true);
  const newCpInput = newCpCont.childNodes[1];
  newCpCont.id = `checkpointContainer-${idNumber}`;
  newCpInput.id = `checkpointInput-${idNumber}`;
  newCpInput.value = "";

  cpsCont.appendChild(newCpCont);

  return newCpInput;
}

function deleteCp() {}

function hoverDisplayCpIcons(cpContainer) {
  Array.from(cpContainer).forEach((cpContainer) => {
    cpContainer.addEventListener("mouseenter", (e) => {
      e.target.lastElementChild.classList.remove("hidden");
    });
    cpContainer.addEventListener("mouseleave", (e) => {
      e.target.lastElementChild.classList.add("hidden");
    });
  });
}

function OnlyOneEmptyCpCheck() {
  const cpsContainer = document.querySelectorAll(".checkpoint__container");
  const cpsInput = document.querySelectorAll(".checkpoint__input");

  for (let i = 0; i < cpsContainer.length; i++) {
    if (!cpsInput[i].value && cpsContainer[i].nextElementSibling) {
      cpsContainer[i].remove();
    }
  }
}

function render(parentEl) {
  addTaskView.render(parentEl);
}

function addTask(name, date, repeat, difficulty, energy, cps, repeatValue) {
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTaskRef = collection(docUserRef, "tasks");
  const taskInst = new TaskModel(name, date, repeat, difficulty, energy);
  taskInst.addRepeat(repeatValue);
  cps.forEach((cp) => {
    if (!cp) return;
    taskInst.addCp(cp);
  });
  const taskData = Object.assign({}, taskInst);
  addDoc(colTaskRef, taskData);
}

function eventListeners() {
  let cpCurIdNum = 2;

  const taskSettings = document.getElementById("taskSettings");
  const repeatWeek = document.getElementById("taskSettingsRepeatWeek");
  const repeatEveryDay = document.getElementById("taskSettingsRepeatDaily");
  const taskSettingsEnergy = document.getElementById("taskSettingsEnergy");
  const energyValueDisplay = document.getElementById("energyValueDisplay");
  const checkpointContainer = document.getElementsByClassName(
    "checkpoint__container"
  );

  // CLICK EVENTS
  taskSettings.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedId = e.target.id;

    // send task form
    if (clickedId === "taskSettingsDoneBtn") {
      e.preventDefault();
      const newTaskData = getValues();
      const {
        name,
        startDate,
        difficulty,
        energy,
        cps,
        repeat,
        daysOfWeek,
        repeatsDaily,
      } = newTaskData;
      if (repeat === "daily") {
        addTask(name, startDate, repeat, difficulty, energy, cps, repeatsDaily);
      }
      if (repeat === "weekly") {
        addTask(name, startDate, repeat, difficulty, energy, cps, daysOfWeek);
      }
      if (repeat === "no-repeat") {
        addTask(name, startDate, repeat, difficulty, energy, cps, repeat);
      }

      cpCurIdNum = 2;
      root.removeChild(root.children[0]);
    }

    // DAILY
    if (clickedId === "repeatNoRepeat") {
      repeatWeek.classList.add("hidden");
      repeatEveryDay.classList.add("hidden");
    }
    if (clickedId === "repeatEveryDay") {
      repeatEveryDay.classList.remove("hidden");
      repeatWeek.classList.add("hidden");
    }

    // WEEKLY
    if (clickedId === "repeatEveryWeek") {
      repeatWeek.classList.remove("hidden");
      repeatEveryDay.classList.add("hidden");
    }
    if (clickedId === "taskSettingsRepeatWeekMon") {
      e.target.classList.toggle("day__selected");
    }
    if (clickedId === "taskSettingsRepeatWeekTue") {
      e.target.classList.toggle("day__selected");
    }
    if (clickedId === "taskSettingsRepeatWeekWed") {
      e.target.classList.toggle("day__selected");
    }
    if (clickedId === "taskSettingsRepeatWeekThu") {
      e.target.classList.toggle("day__selected");
    }
    if (clickedId === "taskSettingsRepeatWeekFri") {
      e.target.classList.toggle("day__selected");
    }
    if (clickedId === "taskSettingsRepeatWeekSat") {
      e.target.classList.toggle("day__selected");
    }
    if (clickedId === "taskSettingsRepeatWeekSun") {
      e.target.classList.toggle("day__selected");
    }

    // DELETE CP
    if (e.target.classList.contains("cp__icon--delete")) {
      e.target.closest(".checkpoint__container").remove();
    }
  });

  // Checkpoints
  hoverDisplayCpIcons(checkpointContainer);

  taskSettings.addEventListener("focusin", (e) => {
    if (!e.target.classList.contains("checkpoint__input")) return;
    e.target.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        if (!e.target.value) return;
        const newCp = addCp(cpCurIdNum);
        OnlyOneEmptyCpCheck();
        hoverDisplayCpIcons(checkpointContainer);
        newCp.focus();
        ++cpCurIdNum;
      }
    });
  });

  // Energy
  taskSettingsEnergy.addEventListener("input", (e) => {
    energyValueDisplay.textContent = e.target.value;
  });
}

function getValues() {
  const checkpointsContainer = document.getElementById("checkpointsContainer");

  const name = document.getElementById("taskSettingsName").value;
  const startDate = document.getElementById("taskSettingsStartDate").value;
  const repeat = document.getElementById("taskSettingsRepeat").value;
  const difficulty = document.getElementById("taskSettingsDifficulty").value;
  const energy = document.getElementById("taskSettingsEnergy").value;
  const weekly = document.getElementsByClassName(
    "repeat__week__el day__selected"
  );
  const repeatsDaily = document.getElementById("repeatDailyInput").value;

  const daysOfWeek = [];
  Array.from(weekly).forEach((day) => {
    daysOfWeek.push(day.value);
  });

  const cps = [];
  for (let i = 0; i < checkpointsContainer.children.length; i++) {
    cps.push(checkpointsContainer.children[i].children[0].value);
  }

  return {
    name,
    startDate,
    difficulty,
    energy,
    cps,
    repeat,
    daysOfWeek,
    repeatsDaily,
  };
}

export default function addTaskControllerInit() {
  render(root);
  eventListeners();
}
