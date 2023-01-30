export default class HabitsComponentView {
  _generateMarkup() {
    return `
    <section class="habits-component__container" style="color: white">
      <button id="addHabitBtn">Add</button>
    </section>`;
  }

  renderHabits(habitsModel) {}

  render(parentEl, habits) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
    // this.renderHabits(habits)
  }
}
