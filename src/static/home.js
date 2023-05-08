import imgBg from "./assets/home-background.jpg";
import homeImgLogo from "./assets/logo.svg";
import homeImgHabits from "./assets/home-habits.svg";
import homeImgTasks from "./assets/home-tasks.svg";
import homeImgYip from "./assets/home-yip.svg";
import homeImgGreenRectangleBg from "./assets/green-rectangle.svg";
import homeImgBlueRectangleBg from "./assets/blue-rectangle.svg";
import homeImgYellowRectangleBg from "./assets/yellow-rectangle.svg";

const loadImage = (imgEl, src) => {
  return new Promise((resolve, reject) => {
    imgEl.onload = () => resolve();
    imgEl.onerror = () => reject();
    imgEl.src = src;
  });
};

export const initHomePage = () => {
  const home = document.getElementById("home");
  home.style.backgroundImage = `url(${imgBg})`;

  const logoEl = document.getElementById("homeImgLogo");
  const homeImgHabitsEl = document.getElementById("homeImgHabits");
  const homeImgTasksEl = document.getElementById("homeImgTasks");
  const homeImgYipEl = document.getElementById("homeImgYip");
  const homeImgGreenRectangleBgEl = document.getElementById("greenRectangleBg");
  const homeImgBlueRectangleBgEl =
    document.getElementById("ImgBlueRectangleBg");
  const homeImgYellowRectangleBgEl = document.getElementById(
    "ImgYellowRectangleBg"
  );

  Promise.all([
    loadImage(logoEl, homeImgLogo),
    loadImage(homeImgHabitsEl, homeImgHabits),
    loadImage(homeImgTasksEl, homeImgTasks),
    loadImage(homeImgYipEl, homeImgYip),
    loadImage(homeImgGreenRectangleBgEl, homeImgGreenRectangleBg),
    loadImage(homeImgBlueRectangleBgEl, homeImgBlueRectangleBg),
    loadImage(homeImgYellowRectangleBgEl, homeImgYellowRectangleBg),
  ])
    .then(() => {
      // setTimeout(() => {
      // }, 200);
      home.style.display = "block";
    })
    .catch((error) => {
      console.error(error);
    });

  homeNavLoginBtn.addEventListener("click", () => {
    window.location.href = "/auth.html";
  });
};
// const homeImgBgEl = document.getElementById("homeImgBg");
// homeImgBgEl.src = imgBg;
