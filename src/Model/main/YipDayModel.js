export default class YipDayModel {
  state = {};

  constructor() {
    this.state.date = "Today pixel";
    this.state.viewMode = "edit";
    this.state.logTitle = "Today title";
    this.state.log = "";
    this.state.moodColor = "#42BFDD";
    this.state.id = String(new Date().getTime());
  }

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

  changeMoodColor(color) {
    this.state.moodColor = color;
  }

  getMoodColor(color) {
    if (color === "awful") {
      return "#181116";
    }
    if (color === "sad") {
      return "#891A29";
    }
    if (color === "good") {
      return "#5B9A63";
    }
    if (color === "ok") {
      return "#42BFDD";
    }
    if (color === "amazing") {
      return "#F9B624";
    }
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
