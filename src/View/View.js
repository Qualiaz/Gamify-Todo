export default class View {
  _generateSidebarMarkup() {
    return `
       <sidebar id="sidebar" class="profile fixed">
        <div class="profile__img">
          <button id="profileImgBtn" class="profile__img-btn"><img id="profileImg" src="./mylove.png" alt="profile image" /></button>
        </div>
        <div class="profile__name">
          <span id="profileNameNav">Who am I?</span>
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

  renderName(name) {
    const profileNameNav = document.getElementById("profileNameNav");
    profileNameNav.innerText = name;
  }

  _generateProfileModalMarkup(stats) {
    return `
    <div id="profileModal" class="profile-modal">
    <div class="profile-card">
      <div class="profile-card__header">
        <div class="profile-card__change-img-input-wrapper">       
           <input class="profile-card__change-img-input" id="profileCardChangePicInput" type="file" accept="image/*" />
        </div>
        <div class="profile-card__background"></div>               
        <div class="profile-card__close-btn-wrapper">
          <button id="profileCardCloseBtn" class="profile-card__close-btn">Close</button>
        </div>      
        <div class="profile-card__image-wrapper">
          <button class="profile-card__image-btn" id="profileCardImgBtn"> 
            <img
              class="profile-card__image"
              src="./mylove.png"
              alt="profile image"
              id="profileCardImg"
            />
          </button>
        </div>
        <div class="profile-card__name">
          <span class="profile-card__name">Robert Apostoiu</span>
        </div>
        <div class="profile-card__energy">
          <span>Energy</span>
          <span>${stats.energyPoints}</span>
          <img src="" alt="" />
        </div>
      </div>
      <hr />
      <div class="profile-card__main">
        <div
          class="profile-card__stat-container profile-card__tasks-finished-container"
        >
          <span class="profile-card__tasks-finished-name"
            >Tasks Finished</span
          >
          <span class="profile-card__tasks-finished-count">${stats.finishedTasks}</span>
        </div>
        <div
          class="profile-card__stat-container profile-card__habits-positive-container"
        >
          <span class="profile-card__habits-positive-name"
            >Habits Positive</span
          >
          <span class="profile-card__habits-positive-count">${stats.habitsPositive}</span>
        </div>
        <div
          class="profile-card__stat-container profile-card__habits-negative-container"
        >
          <span class="profile-card__habits-negative-name"
            >Habits Negative</span
          >
          <span class="profile-card__habits-negative-count">${stats.habitsNegative}</span>
        </div>
        <div
          class="profile-card__stat-container profile-card__time-tracked-container"
        >
          <span class="profile-card__time-tracked-name">Time Tracked</span>
          <span class="profile-card__time-tracker-count">${stats.totalTimeTracked}</span>
        </div>
        <div class="profile-card__yip-container">
          <span class="profile-card__yip-name">Year in pixels</span>
          <div class="profile-card__yip-stats">
            <div class="profile-card__yip-box profile-card__yip-awful">
              <span class="profile-card__yip-awful-count">${stats.yearInPixels.awful}</span>
            </div>
            <div class="profile-card__yip-box profile-card__yip-bad">
              <span class="profile-card__yip-bad-count">${stats.yearInPixels.bad}</span>
            </div>
            <div class="profile-card__yip-box profile-card__yip-ok">
              <span class="profile-card__yip-ok-count">${stats.yearInPixels.ok}</span>
            </div>
            <div class="profile-card__yip-box profile-card__yip-good">
              <span class="profile-card__yip-good-count">${stats.yearInPixels.good}</span>
            </div>
            <div class="profile-card__yip-box profile-card__yip-amazing">
              <span class="profile-card__yip-amazing-count">${stats.yearInPixels.amazing}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="profile-card__footer">
        <div class="profile-card__created-account-container">
          <span class="profile-card__created-account-name">Created:</span>
          <span class="profile-card__created-account-date"
            >${stats.createdAccount}</span
          >
        </div>
        <div class="profile-card__sign-out-wrapper">
          <button class="profile-card__sign-out-btn">Sign out</button>
        </div>
      </div>
    </div>
  </div>
    `;
  }

  renderStats(stats) {
    console.log(stats);

    const body = document.querySelector("body");
    body.insertAdjacentHTML(
      "afterbegin",
      this._generateProfileModalMarkup(stats)
    );
  }

  render() {
    const root = document.createElement("div");
    const main = document.createElement("div");
    const body = document.querySelector("body");
    body.prepend(root);
    root.append(main);
    root.id = "root";
    main.id = "main";
    // root.style.display = "none";
    root.insertAdjacentHTML("afterbegin", this._generateSidebarMarkup());
  }
}
