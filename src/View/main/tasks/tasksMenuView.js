import TaskCard from "./TaskCard";
import "./TasksMenuView.scss";

class TasksMenuView {
  markup = `
    <div>
      <button id="addTaskBtn"> Click me </button>
      <div class="tm__today">
        <h2>Tasks Today</h2>
        <div class="tm__today__cards">                  
        </div>
      </div>
    </div>
  `;

  getElems() {
    document.addEventListener("click", (e) => {
      const clickedId = e.target.id;
      if (clickedId === "addTaskBtn") {
        const tasksToday = document.querySelector(".tm__today__cards");
        const firstCard = this.createTaskCard("Run 5km");
        firstCard.setTime(`00:00`);
        firstCard.render(tasksToday);
      }
    });
  }

  addMarkup() {
    main.innerHTML = this.markup;
  }

  render() {
    this.addMarkup();
    this.getElems();
  }

  createTaskCard(name) {
    const taskCard = new TaskCard(name);
    return taskCard;
  }
}

export const tasksMenuView = new TasksMenuView();
