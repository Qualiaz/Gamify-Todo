import { collection, doc, getDocs } from "firebase/firestore";
import HabitCardController from "../../Controller/Habits/HabitCardController";
import HabitSettingsController from "../../Controller/Habits/HabitSettingsController";
import { auth, db } from "../../firebase/config";
import HabitModel, { allHabits } from "./HabitModel";

export default class Model {
  async setLocalHabitsFromDb() {
    const docUserRef = doc(db, "users", auth.currentUser.uid);
    const colHabitsRef = collection(docUserRef, "habits");
    await getDocs(colHabitsRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const habitCardController = new HabitCardController();
        habitCardController.settingsController = new HabitSettingsController();
        habitCardController.model = new HabitModel();
        const habitData = habitCardController.model.createHabitData(doc.data());
        habitCardController.model.habitData.id = doc.id;
        habitCardController.settingsController.model.habitData = habitData;
        habitCardController.settingsController.model.isCardCreated = true;
        allHabits.push(habitCardController);
      });
    });
  }
}
