import { addSeconds } from "date-fns/esm";
import TaskCardView from "./TaskCardView";
import "./TasksMenuView.scss";

class TasksMenuView {
  _generateMarkup() {
    return `
    <div id="tasksMenu">
      <div class="TM__component">
        <div class="TM__component__header">
          <div class="TM__component__header__title-wrapper">
            <h3>Tomorrow Tasks</h3>
          </div>
          <div class="TM__component__header__addTaskBtn-wrapper">
            <button id="addTaskBtn">X</button>
          </div>
          <div class="TM__component__header__filterBtn-wrapper">
            <button id="filterBtn">III</button>
          </div>
        </div>
        <div id="tomorrowTasksCards" class="TM__component__tasks">         
        </div>
      </div>
    </div>
  `;
  }

  render(parentEl) {
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }
}

export default new TasksMenuView();
