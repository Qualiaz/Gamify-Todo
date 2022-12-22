import { markup as dashboardMarkup } from "../View/main/dashboard";
import { markup as projectsMarkup } from "../View/main/projects";
import { markup as tasksMarkup } from "../View/main/tasks";
import { markup as habitsMarkup } from "../View/main/habits";
import { markup as calendarMarkup } from "../View/main/calendar";
import { markup as yearInPixelsMarkup } from "../View/main/yearInPixels";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function initNav() {
  const main = document.getElementById("main");
  const nav = document.getElementById("nav");
  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      switch (el.id) {
        case "dashboard":
          main.innerHTML = "";
          main.innerHTML = dashboardMarkup;
          break;
        case "tasks":
          main.innerHTML = "";
          main.innerHTML = tasksMarkup;
          break;
        case "projects":
          main.innerHTML = "";
          main.innerHTML = projectsMarkup;
          break;
        case "habits":
          main.innerHTML = "";
          main.innerHTML = habitsMarkup;
          break;
        case "calendar":
          main.innerHTML = "";
          main.innerHTML = calendarMarkup;
          break;
        case "yearInPixels":
          main.innerHTML = "";
          main.innerHTML = yearInPixelsMarkup;
          break;
      }
    });
  });
  const signoutBtn = document.getElementById("signoutBtn");

  signoutBtn.addEventListener("click", (e) => {
    signOut(auth).then((_) => {
      window.location.pathname = "/auth.html";
    });
  });
}
