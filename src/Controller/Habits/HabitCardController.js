import { collection, doc, getDocs } from "firebase/firestore";
import HabitModel from "../../Model/main/HabitModel";
import HabitCardView from "../../View/main/habits/HabitCardView";
import HabitSettingsController from "./HabitSettingsController";
import { auth, db } from "../../firebase/config";
import { allHabits } from "../../Model/main/HabitModel";

export default class HabitCardController {
  constructor() {
    this.view = new HabitCardView();
    this.model = new HabitModel();
    this.settingsController = new HabitSettingsController();
  }

  eventListeners() {
    const id = this.model.habitData.id;
    const habitCardEl = document.getElementById(`habitCard-${id}`);
    const habitCardPositiveBtn = document.getElementById(
      `habitCardPositiveBtn-${id}`
    );

    const habitCardNegativeBtn = document.getElementById(
      `habitCardNegativeBtn-${id}`
    );

    const habitCardPositiveStreak = document.getElementById(
      `habitCardPositiveStreak-${id}`
    );

    const habitCardNegativeStreak = document.getElementById(
      `habitCardNegativeStreak-${id}`
    );

    habitCardPositiveBtn.addEventListener("click", (e) => {
      const energyNav = document.getElementById("energyNav");
      habitCardPositiveStreak.innerText = `+ ${++this.model.habitData
        .streakPositive}`;
      this.model.updateHabitDb();
      this.model.initEnergy().then(() => {
        this.model.getDbEnergy().then((energy) => {
          this.view.initEnergyPopup(this.model.habitData.energy);
          energyNav.innerText = energy;
        });
      });
      this.model.updateUserHabitsStats("positive");
      this.model.playEnergyGainSound();
    });

    habitCardNegativeBtn.addEventListener("click", (e) => {
      const energyNav = document.getElementById("energyNav");
      habitCardNegativeStreak.innerText = `- ${++this.model.habitData
        .streakNegative}`;
      this.model.updateHabitDb();
      this.model.initEnergy().then(() => {
        this.model.getDbEnergy().then((energy) => {
          this.view.initEnergyPopup(this.model.habitData.energy, "negative");
          energyNav.innerText = energy;
        });
      });
      this.model.updateUserHabitsStats("negative");
      this.model.playEnergyLoseSound();
    });

    habitCardEl.addEventListener("click", (e) => {
      if (e.target.id === `habitCardMainTop-${id}`) {
        // open card task settings
        this.settingsController.initChangeHabit(this.model.habitData);
        this.settingsController.habitCard = this;
      }

      if (e.target.id === `habitCardToggleImgBtn-${id}`) {
        this.model.habitData.isCardToggle = !this.model.habitData.isCardToggle;
        this.view.toggleCard(id, this.model.habitData.isCardToggle);
        this.model.setLocalStorage();
        this.model.updateHabitDb();
      }
    });
  }

  render() {
    const container = document.querySelector(".habits-component__container");
    this.view.render(container, this.model.habitData);
  }

  init() {
    this.render();
    this.eventListeners();
  }
}

// needs moving after refactor
export async function setLocalHabitsFromDb() {
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
    });
  });
}
