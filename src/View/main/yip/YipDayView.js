import yipEditIcon from "../../../assets/images/edit-yip.svg";
import yipViewIcon from "../../../assets/images/view-yip.svg";
import { marked } from "marked";
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
              <button id="yipMoodColorBtn-${id}" class="yip-footer_color-btn"></button>
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

  getElems(id) {}

  remove() {
    const section = document.getElementById("yipMenu").querySelector("section");
    if (section) {
      section.remove();
    }
  }

  setMoodColor(color, id) {
    const moodColorBtn = document.getElementById(`yipMoodColorBtn-${id}`);
    moodColorBtn.style.backgroundColor = color;
  }

  render(parentEl, state) {
    if (arguments[0].id === "yipMenu") {
      this.remove();
    }
    console.log(arguments[0]);
    parentEl.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(state ? state : {})
    );
    if (state.viewMode === "view") {
      this.renderView(state.log, state.logTitle, state.id);
    }
    this.setMoodColor(state.moodColor, state.id);
    // if (state) {
    // }
  }
}
