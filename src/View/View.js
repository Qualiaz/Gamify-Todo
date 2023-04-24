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
