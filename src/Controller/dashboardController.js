import DashboardMenuView from "../View/main/DashboardView";

class DashboardMenuController {
  constructor(view) {
    this.view = view;
  }

  init() {
    renderDashboardMenu();
  }
}

export const dashboardMenuController = new DashboardMenuController(
  new DashboardMenuView()
);
