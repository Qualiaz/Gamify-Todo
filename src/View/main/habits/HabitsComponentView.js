export default class HabitsComponentView {
  _generateMarkup() {
    return `
    <section class="habits-component__container" style="color: white">
     <section class="habits-component__top__container">   
        <span>Habits</span>
        <button id="addHabitBtn">Add</button>
        <button id="filterHabitsBtn">Filter</button>
        <button>Revert hidden habits</button>
        <select> 
           <option value="createdTime">Created time</option> 
           <option value="streak">Streak</option> 
        </select>
      </section>
    </section>`;
  }

  renderHabits(habitsModel) {}

  showAll() {}

  render(parentEl, view) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(view));
    // this.renderHabits(habits)
  }
}
