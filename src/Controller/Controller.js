import { onAuthStateChanged, signOut } from "firebase/auth";
import { tasksMenuView } from "../View/main/tasks/tasksMenuView";
import { auth } from "../firebase/config";
import initUser from "./initUserController";
import dashboardView from "../View/main/DashboardView";
import { taskCardController } from "./TaskController";

export default function Controller() {
  // getCur User
  initUser();
  const main = document.getElementById("main");
  const nav = document.getElementById("nav");
  const menuBtns = nav.querySelectorAll("a");

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      main.innerHTML = "";
      switch (btn.id) {
        case "dashboard":
          dashboardView();
          break;
        case "tasks":
          tasksMenuView.render();
          taskCardController.eventListeners();
          break;
        case "projects":
          main.innerHTML = projectsMarkup;
          break;
        case "habits":
          main.innerHTML = habitsMarkup;
          break;
        case "calendar":
          main.innerHTML = calendarMarkup;
          break;
        case "yearInPixels":
          main.innerHTML = yearInPixelsMarkup;
          break;
      }
    });
  });

  //
  // SIGN OUT
  //

  const signoutBtn = document.getElementById("signoutBtn");
  signoutBtn.addEventListener("click", (e) => {
    signOut(auth).then((_) => {
      window.location.pathname = "/auth.html";
    });
  });

  // view connect
  //   dashboardMenuBtn.addEventListener("click", dashboardMenuHandler);
  //   tasksMenuBtn.addEventListener("click", tasksMenuHandler);
}
