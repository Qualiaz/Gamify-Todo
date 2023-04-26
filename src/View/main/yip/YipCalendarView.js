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
    const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    //prettier-ignore
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //prettier-ignore
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let month = 0; month < daysInMonth.length; month++) {
      const monthContainer = document.querySelector(
        `.yip-calendar__${monthNames[month].toLowerCase()}`
      );
      for (let day = 1; day <= daysInMonth[month]; day++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.id = `yipCalendar${monthNames[month]}${day}`;
        monthContainer.appendChild(gridItem);
      }
    }
  }

  renderCurHoveredDay(id) {
    const hoveredDayElem = document.querySelector(".yip-calendar__hovered-day");
    const monthDay = id.replace("yipCalendar", "");
    const month = monthDay.replace(/[0-9]/g, "");
    const day = monthDay.replace(/\D/g, "");
    const formattedDate = `${month} ${day}`;
    hoveredDayElem.textContent = formattedDate;
  }

  clearRenderCurDay() {
    const hoveredDayElem = document.querySelector(".yip-calendar__hovered-day");
    hoveredDayElem.textContent = "";
  }

  render() {
    const yipMenu = document.getElementById("yipMenu");
    yipMenu.insertAdjacentHTML("afterbegin", this._generateMarkup());
    this.createDaysElems();
  }
}
