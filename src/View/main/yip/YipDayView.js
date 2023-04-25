import yipEditIcon from "../../../assets/images/edit-yip.svg";
import yipViewIcon from "../../../assets/images/view-yip.svg";

export default class YipDayView {
  _generateMarkup({ date, viewMode, logTitle, log }) {
    return `
      <section class="yip-component">
          <div class="yip-component__header">
            <div class="yip-header__title">Today pixels</div>
            <div class="yip-header__edit-btn-wrapper">
              <button><img class="yip-header__edit-btn-img" src="${yipEditIcon}" alt=""></button>
            </div>
            <div class="yip-header__view-btn-wrapper">
              <button><img class="yip-header__view-btn-img" src="${yipViewIcon}" alt=""></button>
            </div>
          </div>
          <div class="yip-component__main">
            <h3>${logTitle ? logTitle : "Title"}</h3>
            <br>
            ${
              viewMode === "edit"
                ? this.generateEditMarkup(log)
                : this.generateViewMarkup(log)
            }           
          </div>
          <div class="yip-component__footer">
            <div class="yip-footer__color-btn-wrapper">
              <button id="yipMoodColorBtn" class="yip-footer_color-btn"></button>
            </div>
          </div>
      </section>
   `;
  }

  render(parentEl, state) {
    console.log(state);
    parentEl.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(state ? state : {})
    );
    if (state) {
      this.setMoodColor(state.moodColor);
    }
  }

  generateViewMarkup(log) {
    return `
      <section>
        ${log}
      </section>
    `;
  }

  generateEditMarkup(log) {
    return `
    <section>
      ${log}
    </section>
  `;
  }

  remove() {
    document.querySelector(".yip-component").remove();
  }

  setMoodColor(color) {
    const moodColorBtn = document.getElementById("yipMoodColorBtn");
    moodColorBtn.style.backgroundColor = color;
  }
}
