import "./TasksComponentView.scss";
import addImgBtn from "../../../assets/images/add.svg";
import viewSettingsImgBtn from "../../../assets/images/view-settings.svg";

export default class TasksComponentView {
  _generateMarkup(view, id) {
    console.log(view);
    return `
      <section class="TM__component">
        <div class="TM__component__header">
          <div class="TM__component__header__title-wrapper">
            <span id="tmComponentName-${id}" data-filterName="${
      view.filter
    }"></span>
          </div>
          <div class="TM__component__header__addTaskBtn-wrapper">
            <button class="TM__component__addTaskBtn" id="addTaskBtn-${id}"><img class="TM__component__addTaskImgBtn" id="addTaskImgBtn-${id}" src=${addImgBtn} alt="add task button"></button>
          </div>
          <div class="TM__component__header__filterBtn-wrapper">
            <button class="TM__component__filterBtn" id="tmComponentViewSettingsBtn-${id}"><img class="TM__component__filterImgBtn" id="tmComponentViewSettingsImgBtn-${id}" src=${viewSettingsImgBtn} alt="view filter settings" /></button>  
            
            <div id="viewSettingsContainer-${id}" class="view-settings__container">

            <div  class="view-settings__filter__container ${
              view.menu === "dashboard" ? "hidden" : ""
            }"> 
               <div class="view-settings__filter-name__wrapper">
                  <span>Filter</span>
               </div>
               <select  ${
                 view.menu === "dashboard" ? "disabled" : ""
               } id="filterSelections-${id}" class="view-settings__selections">
                 <option id="filterSelectionToday-${id}"value="today">Today</option>
                 <option id="filterSelectionTomorrow-${id}"value="tomorrow">Tomorrow</option>
                 <option id="filterSelectionThisWeek-${id}"value="thisWeek">This Week</option>
                 <option id="filterSelectionNextWeek-${id}"value="nextWeek">Next Week</option>
                 <option id="filterSelectionWhenever-${id}"value="whenever">Whenever</option>
                 <option id="filterSelectionAll-${id}"value="all">All</option>
               </select>              
            </div>
      
            <hr class="view-settings__hr" />
      
            <div class="view-settings__order__container"> 
              <div class="view-settings__filter-name__wrapper">
                 <span>Order</span>
              </div>
              <select id="orderSelections-${id}" class="view-settings__selections">
                <option id="orderSelectionTimeCreated-${id}" value="timeCreated">Time created</option>
                <option id="orderSelectionDifficulty-${id}" value="difficulty">Difficulty</option>
                <option id="orderSelectionEnergy-${id}" value="energy">Energy</option>
              </select>       
            </div>
            <div class="view-settings__order-type">
              <button class="${
                view.order.direction === "ascending"
                  ? "view-settings__order-btn__active"
                  : ""
              }" id="taskSettingsAscBtn-${id}">Ascending</button>
              <button class="${
                view.order.direction === "descending"
                  ? "view-settings__order-btn__active"
                  : ""
              }" id="taskSettingsDescBtn-${id}">Descending</button>
             </div>
      
             <hr class="view-settings__hr" />
      
            <div class="view-settings__reset__wrapper">
              <button id="resetAllViewBtn">Reset All</button>
            </div>
            
          </div>
          </div>
        </div>
          <div id="tmComp-${id}" class="TM__component__tasks--${this.renderViewMenu(
      view
    )}">         
        </div>
      </section>    
  `;
  }

  renderViewSettings(id, isOpen) {
    const viewSettingsContainer = document.getElementById(
      `viewSettingsContainer-${id}`
    );

    if (isOpen) {
      viewSettingsContainer.style.display = "flex";
    } else {
      viewSettingsContainer.style.display = "none";
    }

    return viewSettingsContainer;
  }

  renderViewMenu(view) {
    if (view.menu === "tasks") return "tasksMenu";
    if (view.menu === "dashboard") return "dashboardMenu";
  }

  renderCards(parentEl, tasks) {
    tasks.forEach((task) => {
      task.view.render(parentEl, task.model.cardState);
      task.eventListeners();
    });
  }

  getElems(id) {
    const tmComponent = document.getElementById(`tmComp-${id}`);
    const tmComponentName = document.getElementById(`tmComponentName-${id}`);
    const optionToday = document.getElementById(`filterSelectionToday-${id}`);
    const optionTomorrow = document.getElementById(
      `filterSelectionTomorrow-${id}`
    );
    const optionThisWeek = document.getElementById(
      `filterSelectionThisWeek-${id}`
    );
    const optionWhenever = document.getElementById(
      `filterSelectionWhenever-${id}`
    );
    const optionAll = document.getElementById(`filterSelectionAll-${id}`);

    const optionOrderTimeCreated = document.getElementById(
      `orderSelectionTimeCreated-${id}`
    );
    const optionOrderDifficulty = document.getElementById(
      `orderSelectionDifficulty-${id}`
    );
    const optionOrderEnergy = document.getElementById(
      `orderSelectionEnergy-${id}`
    );

    const optionOrderDirectionAscending = document.getElementById(
      `taskSettingsAscBtn-${id}`
    );
    const optionOrderDirectionDescending = document.getElementById(
      `taskSettingsDescBtn-${id}`
    );

    const filterSelections = document.getElementById(`filterSelections-${id}`);
    const orderSelections = document.getElementById(`orderSelections-${id}`);

    return {
      tmComponent,
      tmComponentName,
      optionToday,
      optionTomorrow,
      optionThisWeek,
      optionWhenever,
      optionAll,
      optionOrderTimeCreated,
      optionOrderDifficulty,
      optionOrderEnergy,
      filterSelections,
      orderSelections,
      optionOrderDirectionAscending,
      optionOrderDirectionDescending,
    };
  }

  switchView(view, id) {
    const {
      tmComponentName,
      optionToday,
      optionTomorrow,
      optionThisWeek,
      optionWhenever,
      optionAll,
      optionOrderTimeCreated,
      optionOrderDifficulty,
      optionOrderEnergy,
    } = this.getElems(id);

    switch (view.filter) {
      case "all":
        tmComponentName.textContent = "All";
        optionAll.selected = true;
        break;
      case "today":
        tmComponentName.textContent = "Today";
        optionToday.selected = true;
        break;
      case "tomorrow":
        tmComponentName.textContent = "Tomorrow";
        optionTomorrow.selected = true;
        break;
      case "thisWeek":
        tmComponentName.textContent = "This Week";
        optionThisWeek.selected = true;
        break;
      case "whenever":
        tmComponentName.textContent = "Whenever";
        optionWhenever.selected = true;
        break;
    }
    switch (view.order.name) {
      case "createdTime":
        optionOrderTimeCreated.selected = true;
        break;
      case "difficulty":
        optionOrderDifficulty.selected = true;
        break;
      case "energy":
        optionOrderEnergy.selected = true;
        break;
    }
  }

  addModalBackground() {
    const body = document.querySelector("body");
    const background = document.createElement("div");
    background.classList.add("background-modal");
    body.prepend(background);
    return background;
  }

  render(parentEl, view, id) {
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(view, id));
    const { tmComponent } = this.getElems(id);

    this.switchView(view, id);
    this.renderCards(tmComponent, view.tasks);
    return tmComponent;
  }
}
