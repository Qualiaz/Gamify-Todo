// placeholder for layout
import yipEditIcon from "../../../assets/images/edit-yip.svg";
import yipViewIcon from "../../../assets/images/view-yip.svg";

export default class YipComponentView {
  _generateMarkup() {
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
            <h3>My jornaling for today</h3>
            <br>
            <p>Here is where the jornaling will go</p>
            <p>You can write in md format once you press the edit icon</p>
            <p>You can view when you press the eye icon</p>
            <p>You can choose a color to define how the day was overall for you</p>
          </div>
          <div class="yip-component__footer">
            <div class="yip-footer__color-btn-wrapper">
              <button class="yip-footer_color-btn"></button>
            </div>
          </div>
      </section>
   `;
  }

  render(parentEl) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
