import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import HabitCardController from "../../Controller/Habits/HabitCardController";
import HabitSettingsController from "../../Controller/Habits/HabitSettingsController";
import { auth, db } from "../../firebase/config";
import HabitModel, { allHabits } from "./HabitModel";

export const state = {
  totalEnergy: 0,
};

export default class Model {
  async setLocalHabitsFromDb() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colHabitsRef = collection(docUserRef, "habits");
    await getDocs(colHabitsRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const habitCardController = new HabitCardController();
        const habitData = habitCardController.model.createHabitData(doc.data());
        habitCardController.model.habitData.id = doc.id;
        habitCardController.settingsController.model.habitData = habitData;
        habitCardController.settingsController.model.isCardCreated = true;
        allHabits.push(habitCardController);
        console.log(habitCardController.model);
      });
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
          // TODO - ONCE ADDED RESET ON TIME ADD STREAK COUNTER AND MULTIPLY BY ENERGY
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
    this.setDbEnergy();
  }
}
