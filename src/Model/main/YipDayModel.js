export default class YipDayModel {
  state = {};
  #privateState = {
    curMoodColorIndex: 0,
  };

  constructor() {
    this.state.date = "Today pixel";
    this.state.viewMode = "edit";
    this.state.logTitle = null;
    this.state.log = null;
    this.state.moodColor = "#42BFDD";
    this.state.id = this.getCurrentDay();
    this.observers = [];
  }

  getCurrentDay() {
    // format ex "4 July"
    let date = new Date();
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: "long" });
    return `${month}${day}`;
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
  }

  changeViewMode() {
    if (this.state.viewMode === "view") {
      this.state.viewMode === "edit";
    } else {
      this.state.viewMode === "view";
    }
  }

  changeLogTitle(title) {
    this.state.logTitle = title;
  }

  changeLog(log) {
    this.state.log = log;
  }

  nextMoodColor() {
    const moodColors = ["awful", "sad", "good", "ok", "amazing"];
    this.#privateState.curMoodColorIndex =
      (this.#privateState.curMoodColorIndex + 1) % moodColors.length;

    this.state.moodColor = this.getMoodColor(
      moodColors[this.#privateState.curMoodColorIndex]
    );
  }

  getMoodColor(color) {
    const moodColorMap = {
      awful: "#181116",
      sad: "#891A29",
      good: "#5B9A63",
      ok: "#42BFDD",
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
