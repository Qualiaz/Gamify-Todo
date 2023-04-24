class HabitsMenuView {
  _generateMarkup() {
    return `<section id="habitsMenu">
  
            </section>`;
  }

  render() {
    const main = document.getElementById("main");
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}

export const habitsMenuView = new HabitsMenuView();
