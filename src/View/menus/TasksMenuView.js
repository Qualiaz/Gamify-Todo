export default class TasksMenuView {
  _generateMarkup() {
    return `
        <section id="tasksMenu">
                
        </section>
        `;
  }

  render() {
    const main = document.getElementById("main");
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
