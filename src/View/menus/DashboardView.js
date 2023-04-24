import "./Dashboard.scss";

export default class DashboardMenuView {
  _generateMarkup() {
    return `
    <section id="dashboardMenu">
       <section id="dashboardTasks"></section>
       <section id="dashboardHabits"></section>
       <section id="dashboardYip"></section>
    </section>
`;
  }

  getElems() {
    const dashboardTasks = document.getElementById("dashboardTasks");
    const dashboardHabits = document.getElementById("dashboardHabits");
    const dashboardYip = document.getElementById("dashboardYip");

    return { dashboardTasks, dashboardHabits, dashboardYip };
  }

  render() {
    const main = document.getElementById("main");
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
