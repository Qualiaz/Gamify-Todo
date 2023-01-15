import { dashboardView } from "../View/main/DashboardView";
const main = document.getElementById("main");

document.addEventListener("click", (e) => {});

function renderDashboardMenu() {
  dashboardView.render(main);
  const tomorrowTasksCards = document.getElementById("tomorrowTasksCards");
}

export default function dashboardMenuControllerInit() {
  renderDashboardMenu();
}
