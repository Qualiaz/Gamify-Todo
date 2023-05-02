import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { getCurrentDay } from "../../helpers/date";
import YipDayController from "../../Controller/YipDayController";
import TaskCardController from "../../Controller/TaskCardController";
import HabitCardController from "../../Controller/Habits/HabitCardController";
import {
  curTasks,
  curTasksThisWeek,
  curTasksToday,
  curTasksTomorrow,
  curTasksWhenever,
} from "./TaskModel";
import {
  addTasksNoRepeatFilter,
  addTasksOtherDayFilter,
  addTasksWeekDaysFilter,
} from "../../helpers/filters";
import { allHabits } from "./HabitModel";

export const state = {
  totalEnergy: 0,
  yipDays: {},
  selectedDay: null,
  initYipDayController: null,
};

export default class Model {
  constructor() {
    this.observers = [];
  }

  // async setLocalHabitsFromDb() {
  //   const docUserRef = doc(db, "users", auth.currentUser.uid);
  //   const colHabitsRef = collection(docUserRef, "habits");
  //   await getDocs(colHabitsRef).then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       const habitCardController = new HabitCardController();
  //       const habitData = habitCardController.model.createHabitData(doc.data());
  //       habitCardController.model.habitData.id = doc.id;
  //       habitCardController.settingsController.model.habitData = habitData;
  //       habitCardController.settingsController.model.isCardCreated = true;
  //       allHabits.push(habitCardController);
  //     });
  //   });
  // }

  async createTasksFromDb() {
    const docUserRef = doc(db, "users", localStorage.getItem("user"));
    const colTaskRef = collection(docUserRef, "tasks");
    const tasksDocs = await getDocs(colTaskRef);

    tasksDocs.forEach((doc) => {
      const taskCard = new TaskCardController();
      taskCard.model.cardState = doc.data();
      taskCard.model.cardState.id = doc.id;

      const localTimeTracked = localStorage.getItem(`timeElapsed-${doc.id}`);
      if (localTimeTracked) {
        taskCard.model.cardState.timeTracked = localTimeTracked;
      }

      const taskSettingsController =
        taskCard.model.createTaskSettingsController();
      taskSettingsController.curTaskCard = taskCard;

      curTasks.push(taskCard);
      this.filterTask(taskCard);
    });
  }

  filterTask(taskCard) {
    if (taskCard.model.cardState.startDate) {
      if (taskCard.model.cardState.repeat.type === "every-other-day") {
        const everyOtherDay = taskCard.model.cardState.repeat.everyOtherDay;
        console.log(everyOtherDay);
        addTasksOtherDayFilter(everyOtherDay, taskCard);
        return;
      }
      if (taskCard.model.cardState.repeat.type === "weekly") {
        const days = taskCard.model.cardState.repeat.daysOfWeek;
        addTasksWeekDaysFilter(days, taskCard);
        return;
      }
      addTasksNoRepeatFilter(taskCard);
    } else {
      // no selected date
      curTasksWhenever.push(taskCard);
    }
  }

  async getUser() {
    const user = localStorage.getItem("user");
    let docUserRef = doc(db, "users", user);
    if (!docUserRef) {
      docUserRef = doc(db, "users", auth.currentUser.uid);
    }
    const docSnap = await getDoc(docUserRef);
    const userData = docSnap.data();
    const stats = userData.stats;
    const profile = userData.profile;

    return { profile, stats };
  }

  changeProfilePicture() {
    const input = document.getElementById("profileCardChangePicInput");
    const profileCardImg = document.getElementById("profileCardImg");
    const profileImg = document.getElementById("profileImg");

    input.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        profileCardImg.onload = () => {
          URL.revokeObjectURL(profileCardImg.src);
        };
        profileCardImg.src = URL.createObjectURL(this.files[0]);
        profileImg.src = URL.createObjectURL(this.files[0]);
      }
    });

    profileCardImg.addEventListener("click", function () {
      input.click();
    });
  }

  async getEnergyTasks() {
    let totalEnergyFromTasks;
    const energyArr = [];
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colTasksRef = collection(docUserRef, "tasks");
    await getDocs(colTasksRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        const energy = Number(doc.data().energy);
        const isChecked = doc.data().checked;
        if (isChecked) {
          // TODO - ONCE ADDED RESET ON TIME ADD STREAK COUNTER
          energyArr.push(energy);
        }
      });
    });
    totalEnergyFromTasks = energyArr.reduce((a, b) => a + b, 0);
    return totalEnergyFromTasks;
  }

  async getEnergyHabits() {
    let totalEnergyFromHabits;
    const energyArr = [];
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colHabitsRef = collection(docUserRef, "habits");
    await getDocs(colHabitsRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        const energy = Number(doc.data().energy);
        const streak = Number(doc.data().streakPositive);
        if (streak === 0) {
          energyArr.push(energy);
        } else {
          const habitTotalEnergyGained = streak * energy;
          energyArr.push(habitTotalEnergyGained);
        }
      });
      totalEnergyFromHabits = energyArr.reduce((a, b) => a + b, 0);
    });
    return totalEnergyFromHabits;
  }

  async setLocalEnergy() {
    const totalTasksEnergyGained = await this.getEnergyHabits().then(
      (energy) => energy
    );
    const totalHabitsEnergyGained = await this.getEnergyTasks().then(
      (energy) => energy
    );
    state.totalEnergy = totalTasksEnergyGained + totalHabitsEnergyGained;
  }

  async getDbEnergy() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docUserRef);
    const energyPoints = docSnap.data().stats.energyPoints;
    return energyPoints;
  }

  async setDbEnergy() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docUserRef, {
      "stats.energyPoints": state.totalEnergy,
    });
  }

  async initEnergy() {
    await this.getEnergyTasks();
    await this.getEnergyHabits();
    await this.setLocalEnergy();
    this.setDbEnergy();
  }

  //yip
  async getAllYipDays() {
    const colRef = collection(db, "users", auth.currentUser.uid, "yip");
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // data.id refers to the internal id like 'April6'
      const yipDayController = new YipDayController();
      yipDayController.model.initState(data);
      state.yipDays[data.id] = yipDayController;
      return state.yipDays;
    });
  }

  async addYipToday() {
    const day = getCurrentDay();
    const yipDayController = new YipDayController();

    if (!state.yipDays[day]) {
      const x = await yipDayController.model.db.initDoc();
      console.log(x);
      yipDayController.model.state.dbId = doc.id;
      state.yipDays[day] = yipDayController;
      state.initYipDayController = state.yipDays[day];
      state.selectedDay = state.initYipDayController;
      // state.initYipDayController = state.yipDays[day];
    }
    // if day exists
    else {
      const yipColRef = collection(db, "users", auth.currentUser.uid, "yip");
      const q = query(yipColRef, where("id", "==", day));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0]; // day state
      yipDayController.model.initState(doc.data());
      yipDayController.model.state.dbId = doc.id;
      state.initYipDayController = yipDayController;
      state.selectedDay = state.initYipDayController;
    }
  }

  getMoodColorsStats() {
    let colorsStats = {};
    let moodsStats = {};

    const getColorsStats = () => {
      for (let key in state.yipDays) {
        let color = state.yipDays[key].model.state.moodColor;
        if (colorsStats[color]) colorsStats[color]++;
        else colorsStats[color] = 1;
      }
    };

    const changeColorsKeyToMoods = () => {
      for (let key in colorsStats) {
        let newKey;
        if (key === "#181116") newKey = "awful";
        if (key === "#891A29") newKey = "bad";
        if (key === "#5B9A63") newKey = "ok";
        if (key === "#42BFDD") newKey = "good";
        if (key === "#F9B624") newKey = "amazing";

        moodsStats[newKey] = colorsStats[key];
      }
    };

    getColorsStats();
    changeColorsKeyToMoods();
    return moodsStats;
  }

  async setYipMoodsToUserStatsDb() {
    const moodStats = this.getMoodColorsStats();
    const colRef = collection(db, "users");
    const docRef = doc(colRef, auth.currentUser.uid);

    await updateDoc(docRef, {
      "stats.yearInPixels": moodStats,
    });
  }
}
