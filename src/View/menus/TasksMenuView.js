const main = document.getElementById("main");
export default class TasksMenuView {
  _generateMarkup() {
    return `
        <section id="tasksMenu">
                
        </section>
        `;
  }

  render() {
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
