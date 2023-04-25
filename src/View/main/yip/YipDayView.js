import yipEditIcon from "../../../assets/images/edit-yip.svg";
import yipViewIcon from "../../../assets/images/view-yip.svg";

export default class YipDayView {
  _generateMarkup({ date, viewMode, logTitle, log, id }) {
    return `
      <section class="yip-component">
          <div class="yip-component__header">
            <div id="yipDate-${id}" class="yip-header__title">${
      date ? date : "Today pixel"
    }</div>
            <div class="yip-header__edit-btn-wrapper">
              <button id="yipEditBtn"><img class="yip-header__edit-btn-img" src="${yipEditIcon}" alt=""></button>
            </div>
            <div class="yip-header__view-btn-wrapper">
              <button id="yipViewBtn"><img class="yip-header__view-btn-img" src="${yipViewIcon}" alt=""></button>
            </div>
          </div>
          <div class="yip-component__main">
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

  render(parentEl, state) {
    parentEl.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(state ? state : {})
    );
    if (state) {
      this.setMoodColor(state.moodColor, state.id);
    }
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
      <textarea class="yip-component__edit-textarea" id="yipLogEditModeInput-${id}">${log}</textarea>
    </section>
  `;
  }

  remove() {
    document.querySelector(".yip-component").remove();
  }

  setMoodColor(color, id) {
    const moodColorBtn = document.getElementById(`yipMoodColorBtn-${id}`);
    moodColorBtn.style.backgroundColor = color;
  }
}
