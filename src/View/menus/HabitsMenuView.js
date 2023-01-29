const main = document.getElementById("main");

export default class HabitsMenuView {
  _generateMarkup() {
    return `<section id="habitsMenu">
       
            </section>;`;
  }

  render() {
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
