export default class View {
  _generateSidebarMarkup() {
    return `
       <sidebar id="sidebar" class="profile fixed">
        <div class="profile__img">
          <img id="profileImg" src="./mylove.png" alt="profile image" />
        </div>
        <div class="profile__name">
          <span id="profileNameNav">Qualiaz</span>
        </div>
        <div class="profile__energy">
          <img src="./energy-icon.svg" alt="e" />
          <span id="energyNav">0</span>
        </div>
        <hr class="sidebar__hr" />
        <nav id="nav">
          <ul>
            <li><a href="/#/" id="dashboard">Dashboard</a></li>
            <li><a href="/#/projects" id="projects">Projects</a></li>
            <li id="navTasksBtn"><a href="/#/tasks" id="tasks">Tasks</a></li>
            <li><a href="/#/habits" id="habits">Habits</a></li>
            <li>
              <a href="/#/yearinpixels" id="yearInPixels">Year in Pixels</a>
            </li>
          </ul>
        </nav>
        <hr class="sidebar__hr" />
        <div class="profile__sign-out-container">
          <button class="profile__sign-out-button" id="signoutBtn">
            sign out
          </button>
        </div>
      </sidebar>`;
  }

  _generatePopupEnergyMarkup(energy, type = "positive") {
    return `
        <div class="energy-popup__container energy-popup__container--${type}">
           <span>${type === "positive" ? "Gained" : "Lost"} ${energy}</span>
           <img id="popupEnergyIcon" src="./energy-icon.svg" alt="e" />
        </div>   
  `;
  }

  createEnergyPopupsContainer() {
    const popupsContainer = document.createElement("div");
    popupsContainer.id = "popupsEnergyContainer";
    popupsContainer.classList.add("energy-popups__container");
    const root = document.getElementById("root");
    root.appendChild(popupsContainer);
  }

  addPopupEnergyToContainer(energy, type = "positive") {
    const popupsContainer = document.getElementById("popupsEnergyContainer");

    popupsContainer.insertAdjacentHTML(
      "beforeend",
      this._generatePopupEnergyMarkup(energy, type)
    );
  }

  removePopupEnergyFromContainer() {
    const container = document.querySelector(".energy-popups__container");
    const popups = document.querySelectorAll(".energy-popup__container");

    popups.forEach((popup) => {
      popup.addEventListener("animationend", () => {
        popup.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      });
    });
  }

  initEnergyPopup(energy, type = "positive") {
    const popupsEnergyContainer = document.getElementById(
      "popupsEnergyContainer"
    );
    if (!popupsEnergyContainer) this.createEnergyPopupsContainer();
    this.addPopupEnergyToContainer(energy, type);
    this.removePopupEnergyFromContainer();
  }

  renderEnergy(energy) {
    const energyNav = document.getElementById("energyNav");
    energyNav.innerText = energy;
  }

  render() {
    const root = document.createElement("div");
    const main = document.createElement("div");
    const body = document.querySelector("body");
    body.prepend(root);
    root.append(main);
    console.log(root);
    root.id = "root";
    main.id = "main";
    // root.style.display = "none";
    root.insertAdjacentHTML("afterbegin", this._generateSidebarMarkup());
  }
}
