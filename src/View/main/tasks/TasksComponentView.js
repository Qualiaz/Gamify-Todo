import "./TasksComponentView.scss";
import { curTasks } from "../../../Model/main/TaskModel";

export default class TasksComponentView {
  _generateMarkup(filterName, id) {
    return `
      <section class="TM__component">
        <div class="TM__component__header">
          <div class="TM__component__header__title-wrapper">
            <h3>${filterName}</h3>
          </div>
          <div class="TM__component__header__addTaskBtn-wrapper">
            <button class="TM__component__addTaskBtn" id="addTaskBtn-${id}">Add</button></div>
          <div class="TM__component__header__filterBtn-wrapper">
            <button class="TM__component__filterBtn" id="filterBtn-${id}-today">Today</button>
            <button class="TM__component__filterBtn" id="filterBtn-${id}-tomorrow">Tomorrow</button>
            <button class="TM__component__filterBtn" id="filterBtn-${id}-thisWeek">This week</button>
            <button class="TM__component__filterBtn" id="filterBtn-${id}-whenever">Whenever</button>
            <button class="TM__component__filterBtn" id="filterBtn-${id}-all">All</button>
          </div>
        </div>
        <div id="tmComp-${id}" class="TM__component__tasks">         
        </div>
      </section>    
  `;
  }

  renderCards(parentEl, tasks) {
    // parentEl.innerHTML = "";
    tasks.forEach((task) => {
      task.taskCardView.render(parentEl, task.taskCardModel);
      task.eventListeners();
    });
  }

  render(parentEl, filterName, tasks, id) {
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(filterName, id)
    );
    const tmComponent = document.getElementById(`tmComp-${id}`);
    this.renderCards(tmComponent, tasks);
  }
}
