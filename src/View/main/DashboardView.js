class DashboardView {
  _generateMarkup() {
    return `
    <div>
        <button>Add Task</button>
    </div>
`;
  }

  render(parentEl) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}

export const dashboardView = new DashboardView();
