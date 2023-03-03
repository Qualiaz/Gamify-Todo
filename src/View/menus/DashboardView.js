import "./Dashboard.scss";
const main = document.getElementById("main");

export default class DashboardMenuView {
  _generateMarkup() {
    return `
    <section id="dashboardMenu">
       <section id="dashboardTasks">das</section>
       <section id="dashboardHabits"></section>
       <section id="dashboardYIP"></section>
    </section>
`;
  }

  getElems() {
    const dashboardTasks = document.getElementById("dashboardTasks");
    const dashboardHabits = document.getElementById("dashboardHabits");
    const dashboardYIP = document.getElementById("dashboardYIP");

    return { dashboardTasks, dashboardHabits, dashboardYIP };
  }

  render() {
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
