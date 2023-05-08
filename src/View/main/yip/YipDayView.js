import yipEditIcon from "../../../assets/images/edit-yip.svg";
import yipViewIcon from "../../../assets/images/view-yip.svg";
import { marked } from "marked";
import yipDefaultMoodIcon from "../../../assets/images/yip-default.svg";
import yipAwesomeMoodIcon from "../../../assets/images/yip-awesome.svg";
import yipGoodMoodIcon from "../../../assets/images/yip-good.svg";
import yipOkMoodIcon from "../../../assets/images/yip-ok.svg";
import yipBadMoodIcon from "../../../assets/images/yip-bad.svg";
import yipAwfulMoodIcon from "../../../assets/images/yip-awful.svg";

export default class YipDayView {
  _generateMarkup({ viewMode, logTitle, log, id }) {
    return `
      <section class="yip-component">
          <div class="yip-component__header">
            <div id="yipDate-${id}" class="yip-header__title">${
      id ? this.renderDaysPassed(id) : "Today pixel"
    }</div>
            <div class="yip-header__edit-btn-wrapper">
              <button id="yipEditBtn-${id}"><img class="yip-header__edit-btn-img" src="${yipEditIcon}" alt=""></button>
            </div>
            <div class="yip-header__view-btn-wrapper">
              <button id="yipViewBtn-${id}"><img class="yip-header__view-btn-img" src="${yipViewIcon}" alt=""></button>
            </div>
          </div>
          <div id="yipDayMainContainer-${id}" class="yip-component__main">
            ${
              viewMode === "edit"
                ? this.generateEditMarkup(log, logTitle, id)
                : this.generateViewMarkup(log, logTitle, id)
            }           
          </div>
          <div class="yip-component__footer">
            <div class="yip-footer__color-btn-wrapper">
              <button id="yipMoodColorBtn-${id}" class="yip-footer_color-btn">
                <img id="yipMoodIcon" src="${yipDefaultMoodIcon}" alt="mood icon"/>
              </button>
            </div>
          </div>
      </section>
   `;
  }

  renderDaysPassed(day) {
    const date = new Date();
    const year = date.getFullYear();
    //prettier-ignore
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = day.match(/[a-zA-Z]+/g)[0];
    const month = monthNames.indexOf(monthName);
    const dayOfMonth = parseInt(day.match(/\d+/g)[0]);
    const inputDate = new Date(year, month, dayOfMonth);
    const today = new Date(year, date.getMonth(), date.getDate());
    const timeDiff = today - inputDate;
    const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "Today pixel";
    } else if (daysDiff === 1) {
      return "Yesterday pixel";
    } else {
      return `${daysDiff}d ago pixel`;
    }
  }

  generateViewMarkup(log, logTitle, id) {
    return `
      <section class="yip-component__view-mode" id="yipLogViewMode-${id}">
        <span class="yip-component__view-title" id="yipLogTitle-${id}">${
      logTitle ? logTitle : "Title"
    }
      <hr class="yip-component__view-hr">
    </span>
        <div class="yip-component__view-content">
        ${log}
        </div>
      </section>
    `;
  }

  generateEditMarkup(log, logTitle, id) {
    return `
    <section class="yip-component__edit-mode" id="yipLogEditMode-${id}">
      <input placeholder="Title of the day" class="yip-component__edit-title-input" id="yipLogEditTitle-${id}" value="${
      logTitle ? logTitle : ""
    }" />
      <br>
      <textarea placeholder="What have you been up to?" class="yip-component__edit-textarea" id="yipLogEditTextarea-${id}">${
      log ? log : ""
    }</textarea>
    </section>
  `;
  }

  #emptyMainContainer(id) {
    const yipDayMainContainer = document.getElementById(
      `yipDayMainContainer-${id}`
    );
    yipDayMainContainer.innerText = "";
    return yipDayMainContainer;
  }

  renderView(log, logTitle, id) {
    const yipDayMainContainer = this.#emptyMainContainer(id);
    console.log(log);
    yipDayMainContainer.insertAdjacentHTML(
      "beforeend",
      this.generateViewMarkup(log ? marked.parse(log) : "", logTitle, id)
    );
  }

  renderEdit(log, logTitle, id) {
    const yipDayMainContainer = this.#emptyMainContainer(id);

    yipDayMainContainer.insertAdjacentHTML(
      "beforeend",
      this.generateEditMarkup(log, logTitle, id)
    );
  }

  remove() {
    const section = document.getElementById("yipMenu").querySelector("section");
    if (section) {
      section.remove();
    }
  }

  setMoodColor(color, id) {
    const moodColorBtn = document.getElementById(`yipMoodColorBtn-${id}`);
    const moodIcon = document.getElementById("yipMoodIcon");
    moodColorBtn.style.backgroundColor = color;

    // awful: "#181116",
    // bad: "#891A29",
    // ok: "#5B9A63",
    // good: "#42BFDD",
    // amazing: "#F9B624",

    if (color === "#181116") moodIcon.src = yipAwfulMoodIcon;
    if (color === "#891A29") moodIcon.src = yipBadMoodIcon;
    if (color === "#5B9A63") moodIcon.src = yipOkMoodIcon;
    if (color === "#42BFDD") moodIcon.src = yipGoodMoodIcon;
    if (color === "#F9B624") moodIcon.src = yipAwesomeMoodIcon;
  }

  render(parentEl, state) {
    if (arguments[0].id === "yipMenu") {
      this.remove();
    }
    parentEl.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(state ? state : {})
    );
    if (state.viewMode === "view") {
      this.renderView(state.log, state.logTitle, state.id);
    }
    this.setMoodColor(state.moodColor, state.id);
  }
}
