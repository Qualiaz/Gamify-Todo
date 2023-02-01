const main = document.getElementById("main");

class HabitsMenuView {
  _generateMarkup() {
    return `<section id="habitsMenu">
  
            </section>`;
  }

  render() {
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}

export const habitsMenuView = new HabitsMenuView();
