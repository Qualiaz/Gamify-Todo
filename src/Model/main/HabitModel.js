import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import HabitCardController from "../../Controller/Habits/HabitCardController";
import HabitSettingsController from "../../Controller/Habits/HabitSettingsController";
import { auth, db } from "../../firebase/config";

export const allHabits = [];

export default class HabitModel {
  habitData;
  isCardCreated;
  localStorageObj;
  isCardToggle = false;

  setIsCardToggleLocalStorage() {
    if (this.localStorageObj.isHabitCardToggled) {
      this.localStorageObj.isHabitCardToggled = false;
      localStorage.setItem(
        `habitCard-${this.habitData.id}`,
        JSON.stringify(this.localStorageObj)
      );
    } else {
      this.localStorageObj.isHabitCardToggled = true;
      localStorage.setItem(
        `habitCard-${this.habitData.id}`,
        JSON.stringify(this.localStorageObj)
      );
    }
  }

  getLocalStorageParsedObj() {
    const lsItem = localStorage.getItem(`habitCard-${this.habitData.id}`);
    this.localStorageObj = JSON.parse(lsItem);
    return this.localStorageObj;
  }

  deleteHabitDb() {
    const colHabitsRef = this.#getColHabitsRef();
    const docHabitRef = doc(colHabitsRef, this.habitData.id);
    deleteDoc(docHabitRef);
  }

  deleteHabitLocal() {
    allHabits.forEach((habitController, i) => {
      if (habitController.model.habitData.id === this.habitData.id) {
        allHabits.splice(i, 1);
      }
      return allHabits;
    });
  }

  initDeleteHabit() {
    this.deleteHabitLocal();
    this.deleteHabitDb();
  }

  setElems(elems) {
    return (this.elems = elems);
  }

  createHabitData({ name, difficulty, energy, notes }) {
    this.habitData = {
      name: name,
      difficulty: difficulty,
      energy: Number(energy),
      notes: notes,
      streakPositive: 0,
      streakNegative: 0,
    };
    // allHabits.push(this.habitData);
    return this.habitData;
  }

  addHabitLocal() {
    const habitData = this.getValuesForm();
    if (!this.isFormChecks()) return;
    this.createHabitData(habitData);
    const habitCard = new HabitCardController();
    habitCard.model = this;

    this.isCardCreated = true;
    allHabits.push(habitCard);
    return habitCard;
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
    const habitCard = this.addHabitLocal();
    const docId = await this.addHabitDb(habitCard.model.habitData);
    habitCard.model.habitData.id = docId;
    this.createLocalStorageObj(docId);
    return habitCard;
  }

  createLocalStorageObj(id) {
    const localStorageObj = {
      id: id,
      isHabitCardToggled: false,
    };
    this.localStorageObj = localStorageObj;
    localStorage.setItem(
      `habitCard-${id}`,
      JSON.stringify(this.localStorageObj)
    );
    return this.localStorageObj;
  }

  updateHabitDb(habitData = this.habitData) {
    const colHabitsRef = this.#getColHabitsRef();
    const docHabitRef = doc(colHabitsRef, habitData.id);

    updateDoc(docHabitRef, {
      name: habitData.name,
      difficulty: habitData.difficulty,
      energy: habitData.energy,
      notes: habitData.notes,
      streakPositive: habitData.streakPositive,
      streakNegative: habitData.streakNegative,
    });
  }

  changeHabit({
    name,
    notes,
    difficulty,
    energy,
    streakPositive,
    streakNegative,
  }) {
    this.habitData.name = name;
    this.habitData.notes = notes;
    this.habitData.difficulty = difficulty;
    this.habitData.energy = energy;
    this.habitData.streakPositive = streakPositive;
    this.habitData.streakNegative = streakNegative;

    return this.habitData;
  }

  getValuesForm() {
    const {
      habitSettingsName,
      habitSettingsNotes,
      habitSettingsDifficulty,
      habitSettingsProjectAssociated,
      habitSettingsEnergy,
      habitSettingsStreakPositiveInput,
      habitSettingsStreakNegativeInput,
    } = this.elems;

    if (this.isCardCreated) {
      return {
        name: habitSettingsName.value,
        notes: habitSettingsNotes.value,
        difficulty: habitSettingsDifficulty.value,
        projectAssociated: habitSettingsProjectAssociated.value,
        energy: habitSettingsEnergy.value,
        streakPositive: habitSettingsStreakPositiveInput.value,
        streakNegative: habitSettingsStreakNegativeInput.value,
      };
    } else
      return {
        name: habitSettingsName.value,
        notes: habitSettingsNotes.value,
        difficulty: habitSettingsDifficulty.value,
        projectAssociated: habitSettingsProjectAssociated.value,
        energy: habitSettingsEnergy.value,
      };
  }

  setValuesForm() {
    const {
      habitSettingsName,
      habitSettingsNotes,
      habitSettingsDifficulty,
      habitSettingsProjectAssociated,
      habitSettingsStreakPositiveInput,
      habitSettingsStreakNegativeInput,
    } = this.elems;

    habitSettingsName.value = this.habitData.name;
    habitSettingsNotes.textContent = this.habitData.notes;
    habitSettingsDifficulty.value = this.habitData.difficulty;
    habitSettingsProjectAssociated.value = this.habitData.projectAssociated;
    habitSettingsStreakPositiveInput.value = this.habitData.streakPositive;
    habitSettingsStreakNegativeInput.value = this.habitData.streakNegative;
    this.changeEnergyValues(this.habitData.difficulty, this.habitData.energy);
  }

  isFormChecks() {
    let ok = true;
    const { habitSettingsName } = this.elems;
    if (habitSettingsName.value.length === 0) {
      ok = false;
    }
    return ok;
  }

  changeEnergyValues(difficulty, value = null) {
    const { habitSettingsEnergy } = this.elems;

    const changeInputValues = (min, max) => {
      habitSettingsEnergy.setAttribute("min", min);
      habitSettingsEnergy.setAttribute("max", max);
      habitSettingsEnergy.setAttribute("value", value || min);
      habitSettingsEnergy.value = value || min;
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
