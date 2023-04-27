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
import YipDayController from "../../Controller/YipDayController";
import { getCurrentDay } from "../../helpers/date";

export const state = {
  totalEnergy: 0,
  yipDays: {},
  selectedDay: null,
  initYipDayController: null,
};

export default class Model {
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
    await this.getEnergyHabits();
    await this.setLocalEnergy();
    await this.getEnergyTasks();
    this.setDbEnergy();
  }

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
      await yipDayController.model.db.initDoc();
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
}
