import "./Dashboard.scss";
const main = document.getElementById("main");

export default class DashboardMenuView {
  _generateMarkup() {
    return `
    <section id="dashboardMenu">
       <section id="dashboardTasks"></section>
       <section id="dashboardHabits"></section>
       <section id="dashboardYIP"></section>
    </section>
`;
  }

  render() {
    main.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}
