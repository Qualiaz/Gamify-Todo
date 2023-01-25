import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { swapElems } from "../../helpers/drag";
import TaskModel, { curTasks } from "../../Model/main/TaskModel";
import { addTaskView } from "../../View/main/tasks/AddTaskView";
import { createTasksFromDb, renderCards } from "../TasksComponentController";
import TaskCardController, { getTask } from "../TaskCardController";
import { curFilter } from "../TasksComponentController";

const root = document.getElementById("root");
const main = document.getElementById("main");
function addCp(idNumber) {
  const cpsCont = document.getElementById("checkpointsContainer");
  const cpCont = document.getElementById("checkpointContainer-1");

  const newCpCont = cpCont.cloneNode(true);
  const newCpInput = newCpCont.childNodes[1];
  newCpCont.id = `formCheckpointContainer-${idNumber}`;
  newCpInput.id = `formCheckpointInput-${idNumber}`;
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
//prettier-ignore
function addTask(name,notes,date,repeat,difficulty,energy,cps,repeatValue) {
  const tmCompTask = document.querySelector('.TM__component__tasks')
  const docUserRef = doc(db, "users", auth.currentUser.uid);
  const colTaskRef = collection(docUserRef, "tasks");
  
  const taskCardController = new TaskCardController();
  taskCardController.taskCardModel = new TaskModel(name, notes, date, repeat, difficulty, energy)
  taskCardController.taskCardModel.addRepeat(repeatValue)
  cps.forEach(cp => {
    if(!cp) return
    taskCardController.taskCardModel.addCp(cp)
  })
  const taskData = Object.assign({}, taskCardController.taskCardModel)
  addDoc(colTaskRef, taskData).then((doc) => {
    taskCardController.taskCardModel.id = doc.id

    if (document.getElementById(`taskCard-${doc.id}`)) return;
    curTasks.push(taskCardController);
    taskCardController.taskCardView.render(tmCompTask, taskCardController.taskCardModel)
    taskCardController.eventListeners()
  })
}

let curTaskCard;
export function openTaskSettings(taskCard) {
  render(root);
  eventListeners();
  setFormValues(taskCard.taskCardModel.name);
  curTaskCard = taskCard;
  // renderChangedTask(taskCard, "okasd");
}

function setTask() {
  const changeName = (name, id) => {
    const docTaskRef = getTask(id);
    updateDoc(docTaskRef, {
      name: name,
    });
  };

  const taskId = curTaskCard.taskCardModel.id;
  const taskEl = document.getElementById(`taskCard-${taskId}`);
  const { name } = getValues();
  const tomorrowTasksCards = document.getElementById("tomorrowTasksCards");
  // curTaskCard.taskCardModel.name = name;

  curTaskCard.taskCardView.render(
    tomorrowTasksCards,
    curTaskCard.taskCardModel
  );
}

function eventListeners() {
  let cpCurIdNum = 2;

  const taskSettings = document.getElementById("taskSettings");
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
      //prettier-ignore
      const {name,startDate,difficulty,energy,cps,repeat,daysOfWeek,repeatDaily,notes} = newTaskData;
      if (!validFormCheck(name, repeatDaily).ok) return;

      if (repeat === "daily") {
        //prettier-ignore
        addTask(name,notes,startDate,repeat,difficulty,energy,cps,repeatDaily);
        changeTask();
      }
      if (repeat === "weekly") {
        //prettier-ignore
        addTask(name,notes,startDate,repeat,difficulty,energy,cps,daysOfWeek);
      }
      if (repeat === "no-repeat") {
        //prettier-ignore
        addTask(name,notes,startDate,repeat,difficulty,energy,cps,repeat);
        // setTask()
      }

      cpCurIdNum = 2;
      root.removeChild(root.children[0]);
    }

    // REPEAT
    if (clickedId === "repeatNoRepeat") {
      addTaskView.renderNoRepeat();
    }
    if (clickedId === "repeatEveryOtherDay") {
      addTaskView.renderRepeatEveryOtherDay();
    }
    if (clickedId === "repeatEveryWeek") {
      addTaskView.renderRepeatEveryWeek();
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

function setFormValues(name) {
  const nameEl = document.getElementById("taskSettingsName");
  nameEl.value = name;
}

function renderChangedTask(task, name) {
  const tomorrowTasksCards = document.getElementById("tomorrowTasksCards");
  task.taskCardModel.name = name;
  task.taskCardView.render(tomorrowTasksCards);
}

function getValues() {
  const checkpointsContainer = document.getElementById("checkpointsContainer");

  const name = document.getElementById("taskSettingsName").value;
  const repeat = document.getElementById("taskSettingsRepeat").value;
  const difficulty = document.getElementById("taskSettingsDifficulty").value;
  const energy = document.getElementById("taskSettingsEnergy").value;
  const weekly = document.getElementsByClassName(
    "repeat__week__el day__selected"
  );
  const repeatDaily = document.getElementById("repeatDailyInput").value;
  const notes = document.getElementById("markedInput").value;
  //prettier-ignore
  const startDate = document.getElementById("taskSettingsStartDate").value.replace("-", "/").replace("-", "/");

  const daysOfWeek = [];
  Array.from(weekly).forEach((day) => {
    daysOfWeek.push(day.value);
  });

  const cps = [];
  for (let i = 0; i < checkpointsContainer.children.length; i++) {
    cps.push(checkpointsContainer.children[i].children[0].value);
  }

  //prettier-ignore
  return {name,startDate,difficulty,energy,cps,repeat,daysOfWeek,repeatDaily,notes};
}

export default function addTaskControllerInit() {
  render(root);
  eventListeners();
}
