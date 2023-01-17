import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { swapElems } from "../../helpers/drag";
import TaskModel from "../../Model/main/TaskModel";
import { addTaskView } from "../../View/main/tasks/AddTaskView";

import iconDifficultyTrivial from "../../View/main/tasks/assets/icon-difficulty-trivial.svg";
import iconDifficultyEasy from "../../View/main/tasks/assets/icon-difficulty-easy.svg";
import iconDifficultyMedium from "../../View/main/tasks/assets/icon-difficulty-medium.svg";
import iconDifficultyHard from "../../View/main/tasks/assets/icon-difficulty-hard.svg";
import iconDifficultyChallenge from "../../View/main/tasks/assets/icon-difficulty-challenge.svg";

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

function validFormCheck(name, repeatDaily) {
  const nameCheckFail = document.getElementById("taskSettingsNameCheckFail");
  const repeatDailyFail = document.getElementById(
    "taskSettingsRepeatDailyFail"
  );
  const taskSettingsRepeat = document.getElementById("taskSettingsRepeat");

  let ok = true;
  let check = {
    name: true,
    repeatDaily: true,
  };

  if (name) {
    check.name = true;
    nameCheckFail.classList.add("hidden");
  } else {
    check.name = false;
    nameCheckFail.classList.remove("hidden");
  }

  if (taskSettingsRepeat.value === "daily") {
    if (repeatDaily.match(/^[0-9]+$/)) {
      check.repeatDaily = true;
      repeatDailyFail.classList.add("hidden");
    } else {
      check.repeatDaily = false;
      repeatDailyFail.classList.remove("hidden");
    }
  }

  Object.values(check).forEach((value) => {
    if (!value) ok = false;
  });

  return { ok };
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
  console.log(taskInst);
  const taskData = Object.assign({}, taskInst);
  addDoc(colTaskRef, taskData);
}

function eventListeners() {
  let cpCurIdNum = 2;

  const taskSettings = document.getElementById("taskSettings");
  const repeatWeek = document.getElementById("taskSettingsRepeatWeek");
  const repeatEveryDay = document.getElementById("taskSettingsRepeatDaily");
  const repeatDailyFail = document.getElementById(
    "taskSettingsRepeatDailyFail"
  );
  const repeatDailyInput = document.getElementById("repeatDailyInput");
  const taskSettingsEnergy = document.getElementById("taskSettingsEnergy");
  const energyValueDisplay = document.getElementById("energyValueDisplay");
  const checkpointContainer = document.getElementsByClassName(
    "checkpoint__container"
  );
  const iconDifficulty = document.getElementById("taskSettingsIconDifficulty");

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
        repeatDaily,
      } = newTaskData;
      if (!validFormCheck(name, repeatDaily).ok) return;

      if (repeat === "daily") {
        addTask(name, startDate, repeat, difficulty, energy, cps, repeatDaily);
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

    // REPEAT
    if (clickedId === "repeatNoRepeat") {
      repeatWeek.classList.add("hidden");
      repeatEveryDay.classList.add("hidden");
      repeatDailyFail.classList.add("hidden");
      repeatDailyInput.value = "";
    }
    if (clickedId === "repeatEveryOtherDay") {
      repeatEveryDay.classList.remove("hidden");
      repeatWeek.classList.add("hidden");
    }

    if (clickedId === "repeatEveryWeek") {
      repeatWeek.classList.remove("hidden");
      repeatEveryDay.classList.add("hidden");
      repeatDailyFail.classList.add("hidden");
      repeatDailyInput.value = "";
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

    // DIFFICULTY
    if (clickedId === "taskSettingsDifficultyTrivial") {
      iconDifficulty.src = iconDifficultyTrivial;
    }
    if (clickedId === "taskSettingsDifficultyEasy") {
      iconDifficulty.src = iconDifficultyEasy;
    }
    if (clickedId === "taskSettingsDifficultyMedium") {
      iconDifficulty.src = iconDifficultyMedium;
    }
    if (clickedId === "taskSettingsDifficultyHard") {
      iconDifficulty.src = iconDifficultyHard;
    }
    if (clickedId === "taskSettingsDifficultyChallenge") {
      iconDifficulty.src = iconDifficultyChallenge;
    }

    // DELETE CP
    if (e.target.classList.contains("cp__icon--delete")) {
      e.target.closest(".checkpoint__container").remove();
    }

    // CLOSE
    if (clickedId === "taskSettingsCloseBtn") {
      cpCurIdNum = 2;
      root.removeChild(root.children[0]);
    }
  });

  taskSettings.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("cp__icon--drag")) {
      const container = e.target.closest(".checkpoints__container");
      swapElems(container, "cp__icon--drag");
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
  const repeatDaily = document.getElementById("repeatDailyInput").value;

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
    repeatDaily,
  };
}

export default function addTaskControllerInit() {
  render(root);
  eventListeners();
}