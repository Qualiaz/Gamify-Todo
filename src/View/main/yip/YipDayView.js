import yipEditIcon from "../../../assets/images/edit-yip.svg";
import yipViewIcon from "../../../assets/images/view-yip.svg";
import { marked } from "marked";
export default class YipDayView {
  _generateMarkup({ date, viewMode, logTitle, log, id }) {
    return `
      <section class="yip-component">
          <div class="yip-component__header">
            <div id="yipDate-${id}" class="yip-header__title">${
      date ? date : "Today pixel"
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

  generateViewMarkup(log, logTitle, id) {
    console.log(logTitle);
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
    document.querySelector(".yip-component").remove();
  }

  setMoodColor(color, id) {
    const moodColorBtn = document.getElementById(`yipMoodColorBtn-${id}`);
    moodColorBtn.style.backgroundColor = color;
  }

  render(parentEl, state) {
    parentEl.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(state ? state : {})
    );
    this.setMoodColor(state.moodColor, state.id);
    // if (state) {
    // }
  }
}
