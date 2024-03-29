export default class YipCalendarView {
  _generateMarkup() {
    return `
        <div id="yipCalendar">
            <div class="yip-calendar__header">
              <span class="yip-calendar__year">2023</span>
              <span class="yip-calendar__hovered-day">July 2</span>
            </div>
            <div class="yip-calendar__main">
              <div class="yip-calendar__january"></div>         
              <div class="yip-calendar__february"></div>            
              <div class="yip-calendar__march"></div>   
              <div class="yip-calendar__april"></div>
              <div class="yip-calendar__may"></div>
              <div class="yip-calendar__june"></div>
              <div class="yip-calendar__july"></div>
              <div class="yip-calendar__august"></div>
              <div class="yip-calendar__september"></div>
              <div class="yip-calendar__october"></div>
              <div class="yip-calendar__november"></div>
              <div class="yip-calendar__december"></div> 
            </div>
        </div>
        `;
  }
  createDaysElems() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    //prettier-ignore
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //prettier-ignore
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let m = 0; m < daysInMonth.length; m++) {
      const monthContainer = document.querySelector(
        `.yip-calendar__${monthNames[m].toLowerCase()}`
      );
      for (let d = 1; d <= daysInMonth[m]; d++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        if (m < month || (m === month && d <= day)) {
          gridItem.classList.add("grid-item--selectable");
        } else {
          gridItem.classList.add("grid-item--not-selectable");
        }
        gridItem.id = `yipCalendar${monthNames[m]}${d}`;
        monthContainer.appendChild(gridItem);
      }
    }
  }

  #formatDayText(id) {
    let monthDay = id;
    if (id.includes("yipCalendar")) {
      monthDay = id.replace("yipCalendar", "");
    }
    const month = monthDay.replace(/[0-9]/g, "");
    const day = monthDay.replace(/\D/g, "");
    const formattedDate = `${month} ${day}`;
    return formattedDate;
  }

  renderDayText(id) {
    const hoveredDayElem = document.querySelector(".yip-calendar__hovered-day");
    const dayText = this.#formatDayText(id);
    hoveredDayElem.textContent = dayText;
  }

  clearOutlines() {
    const day = document.querySelectorAll(`.grid-item`);
    day.forEach((day) => {
      day.style.outline = "none";
    });
  }

  outlineSelectedDay(id) {
    const selectedDay = document.getElementById(`yipCalendar${id}`);
    selectedDay.style.outline = "2px solid white";
  }

  setMoodColors(daysColors) {
    console.log(daysColors["May5"]);
    for (let key in daysColors) {
      if (!(daysColors[key] === "#2B2A2A")) {
        const x = document.getElementById(`yipCalendar${key}`);
        x.style.backgroundColor = daysColors[key];
      }
    }
  }

  render() {
    const yipMenu = document.getElementById("yipMenu");
    yipMenu.insertAdjacentHTML("afterbegin", this._generateMarkup());
    this.createDaysElems();
  }
}
