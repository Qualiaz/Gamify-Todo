import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { getCurrentDay } from "../../helpers/date";
import { state } from "./Model";

export default class YipDayModel {
  state = {};
  #privateState = {
    curMoodColorIndex: 0,
  };

  constructor() {
    this.state.viewMode = "edit";
    this.state.logTitle = "";
    this.state.log = "";
    this.state.moodColor = "#2B2A2A";
    this.state.id = getCurrentDay();
    this.observers = [];
  }

  obs = {
    add: (observer) => {
      this.observers.push(observer);
    },
    remove: (observer) => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    },
    notify: () => this.observers.forEach((obs) => obs.update(this)),
  };

  changeDate(date) {
    this.state.date = date + " pixel";
    this.updateGlobalState();
  }

  changeViewMode(mode) {
    this.state.viewMode = mode;
    this.updateGlobalState();
    // console.log(this.state.view.mode);
  }

  changeLogTitle(title) {
    this.state.logTitle = title;
    this.updateGlobalState();
  }

  changeLog(log) {
    this.state.log = log;
    this.updateGlobalState();
  }

  initState(data) {
    // this.state.date = data.date;
    this.state.id = data.id;
    this.state.log = data.log;
    this.state.logTitle = data.logTitle;
    this.state.moodColor = data.moodColor;
    this.state.viewMode = data.viewMode;
    this.state.dbId = data.dbId;
  }

  db = {
    getColYipRef: () => {
      return collection(db, "users", auth.currentUser.uid, "yip");
    },

    isDayInDb: async (day) => {
      const q = query(yipColRef, where("id", "==", day));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0];
      return !!doc.data();
    },

    add: async () => {
      try {
        const docRef = await addDoc(this.db.getColYipRef(), this.state);
        this.state.dbId = docRef.id;
      } catch (e) {
        console.error("error adding doc:", e);
      }
    },

    update: async () => {
      try {
        const docRef = doc(this.db.getColYipRef(), this.state.dbId);
        console.log(this.state.dbId);
        await updateDoc(docRef, this.state);
      } catch (e) {
        console.error("error updating doc:", e);
      }
    },

    initDoc: async () => {
      if (this.state.dbId) {
        return await this.db.update();
      } else {
        return await this.db.add();
      }
    },
  };

  nextMoodColor() {
    const moodColors = ["awful", "bad", "ok", "good", "amazing"];

    this.#privateState.curMoodColorIndex =
      (this.#privateState.curMoodColorIndex + 1) % moodColors.length;

    this.state.moodColor = this.getMoodColor(
      moodColors[this.#privateState.curMoodColorIndex]
    );

    this.updateGlobalState();
  }

  async updateGlobalState() {
    const globalYipDayController = state.yipDays[this.state.id];
    globalYipDayController.model.state = this.state;
    this.updateGlobalStateUserYipStats();
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

  updateGlobalStateUserYipStats() {
    const moodsStats = this.getMoodColorsStats();
    state.userStats.yearInPixels = moodsStats;
  }

  getMoodColor(color) {
    const moodColorMap = {
      default: "#2B2A2A",
      awful: "#181116",
      bad: "#891A29",
      ok: "#5B9A63",
      good: "#42BFDD",
      amazing: "#F9B624",
    };
    return moodColorMap[color];
  }

  handler = {
    keepBulletPointOnNewLine(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const target = event.target;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const currentLineStart = target.value.lastIndexOf("\n", start - 1) + 1;
        const currentLine = target.value.substring(currentLineStart, start);
        if (currentLine.match(/^\s*-\s\S/)) {
          target.value =
            target.value.substring(0, start) +
            "\n" +
            currentLine.match(/^\s*/)[0] +
            "- " +
            target.value.substring(end);
          target.selectionStart = target.selectionEnd =
            start + currentLine.match(/^\s*/)[0].length + 3;
        } else {
          target.value =
            target.value.substring(0, start) +
            "\n" +
            target.value.substring(end);
          target.selectionStart = target.selectionEnd = start + 1;
        }
      }
    },
    tabIndent(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        const target = event.target;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        target.value =
          target.value.substring(0, start) +
          "    " +
          target.value.substring(end);
        target.selectionStart = target.selectionEnd = start + 4;
      }
    },
  };
}
