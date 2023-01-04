class TaskCardController {
  eventListeners() {
    document.addEventListener("click", (e) => {
      const clickedId = e.target.id;

      if (clickedId === "pauseTimer") {
        pauseTimer.classList.add("hidden");
        playTimer.classList.remove("hidden");
      }
      if (clickedId === "playTimer") {
        playTimer.classList.add("hidden");
        pauseTimer.classList.remove("hidden");
      }
      if (clickedId === "cardToggleIcon") {
        const toggleIcon = document.getElementById("cardToggleIcon");
        toggleIcon.classList.toggle("reverse-icon");
      }
    });
  }
}

export const taskCardController = new TaskCardController();
