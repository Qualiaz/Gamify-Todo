export default class YipMenuView {
  _generateMarkup() {
    return `<section id="yipMenu">
    
              </section>`;
  }

  render() {
    const main = document.getElementById("main");
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
