import { addDoc, collection, doc } from "firebase/firestore";
import HabitCardController from "../../Controller/Habits/HabitCardController";
import HabitSettingsController from "../../Controller/Habits/HabitSettingsController";
import { auth, db } from "../../firebase/config";

export const allHabits = [];
export default class HabitModel {
  habitData;

  setElems(elems) {
    return (this.elems = elems);
  }

  createHabitData({ name, difficulty, energy, notes }) {
    this.habitData = {
      id: "",
      checked: false,
      streak: {
        positive: 0,
        negative: 0,
      },
      name: name,
      difficulty: difficulty,
      energy: Number(energy),
      notes: notes,
    };
    allHabits.push(this.habitData);
    return this.habitData;
  }

  addHabitLocal() {
    const habitData = this.getValuesForm();
    if (!this.isFormChecks()) return;
    const habit = this.createHabitData(habitData);
    console.log(habitData);
    allHabits.push(habit);
    return habit;
  }

  addHabitDb(habitModel) {
    const colHabitsRef = this.#getColHabitsRef();
    const habitData = Object.assign({}, habitModel);
    const id = addDoc(colHabitsRef, habitData).then((doc) => {
      return doc.id;
    });
    return id;
  }

  async initHabit() {
    const habitData = this.addHabitLocal();
    const docId = await this.addHabitDb(habitData);
    habitData.id = docId;
    return habitData;
  }

  getValuesForm() {
    const {
      habitSettingsName,
      habitSettingsNotes,
      habitSettingsDifficulty,
      habitSettingsProjectAssociated,
      habitSettingsEnergy,
    } = this.elems;

    return {
      name: habitSettingsName.value,
      notes: habitSettingsNotes.value,
      difficulty: habitSettingsDifficulty.value,
      projectAssociated: habitSettingsProjectAssociated.value,
      energy: habitSettingsEnergy.value,
    };
  }

  isFormChecks() {
    let ok = true;
    const { habitSettingsName } = this.elems;
    if (habitSettingsName.value.length === 0) {
      ok = false;
    }
    return ok;
  }

  changeEnergyValues(difficulty) {
    const { habitSettingsEnergy } = this.elems;
    console.log(habitSettingsEnergy);

    const changeInputValues = (min, max) => {
      habitSettingsEnergy.setAttribute("min", min);
      habitSettingsEnergy.setAttribute("max", max);
      habitSettingsEnergy.setAttribute("value", min);
      habitSettingsEnergy.value = min;
      return min;
    };

    if (difficulty === "trivial") {
      return changeInputValues("1", "3");
    }
    if (difficulty === "easy") {
      return changeInputValues("4", "8");
    }
    if (difficulty === "medium") {
      return changeInputValues("9", "15");
    }
    if (difficulty === "hard") {
      return changeInputValues("16", "21");
    }
    if (difficulty === "challenge") {
      return changeInputValues("22", "30");
    }
  }

  #getColHabitsRef() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colHabitsRef = collection(docUserRef, "habits");
    return colHabitsRef;
  }
}
