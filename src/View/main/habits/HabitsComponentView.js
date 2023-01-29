export default class HabitsComponentView {
  _generateMarkup() {
    return `<section class="habits-component__container" style="color: white"></section>`;
  }

  render(parentEl) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
