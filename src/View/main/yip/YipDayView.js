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
            <h3 id="yipLogTitle-${id}">${logTitle ? logTitle : "Title"}</h3>
            <br>
            ${
              viewMode === "edit"
                ? this.generateEditMarkup(log, id)
                : this.generateViewMarkup(log, id)
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

  generateViewMarkup(log, id) {
    return `
      <section id="yipLogViewMode-${id}">
        ${log}
      </section>
    `;
  }

  generateEditMarkup(log, id) {
    return `
    <section class="yip-component__edit-mode" id="yipLogEditMode-${id}">
      <textarea placeholder="What have you been up to?" class="yip-component__edit-textarea" id="yipLogEditModeTextarea-${id}">${log}</textarea>
    </section>
  `;
  }

  #removeMainSection(id) {
    const yipDayMainContainer = document.getElementById(
      `yipDayMainContainer-${id}`
    );
    const section = yipDayMainContainer.querySelector("section");
    section.remove();
    return yipDayMainContainer;
  }

  renderView(log, id) {
    const yipDayMainContainer = this.#removeMainSection(id);

    yipDayMainContainer.insertAdjacentHTML(
      "beforeend",
      this.generateViewMarkup(marked.parse(log), id)
    );
  }

  renderEdit(log, id) {
    const yipDayMainContainer = this.#removeMainSection(id);

    yipDayMainContainer.insertAdjacentHTML(
      "beforeend",
      this.generateEditMarkup(log, id)
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
    if (state) {
      this.setMoodColor(state.moodColor, state.id);
    }
  }
}
