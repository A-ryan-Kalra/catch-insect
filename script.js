const screenALl = document.querySelectorAll(".screen");
const play_game_btn = document.querySelector(".play-game");
const choose_insect_btn = document.querySelectorAll(".choose-insect-btn");
const game_container = document.querySelector("#game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const messageEl = document.querySelector(".message");

let score = 0,
  seconds = 0,
  insectDetails = {};

play_game_btn.addEventListener("click", () => {
  screenALl[0].classList.add("up");
});

choose_insect_btn.forEach((insect) => {
  insect.addEventListener("click", () => {
    const img = insect.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    insectDetails = {
      src,
      alt,
    };
    screenALl[1].classList.add("up");
    createInsect();
    startGame();
  });
});

function createInsect() {
  let insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomPosition();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img style="transform: rotate(${
    Math.random() * 360
  }deg)" src="${insectDetails.src}" alt="${
    insectDetails.alt
  } draggable="false"" />`;
  insect.addEventListener("click", catchInsect);
  game_container.appendChild(insect);
}

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 1000);
  addInsects();
}
function startGame() {
  setInterval(increaseTime, 1000);
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  if (score > 10) {
    messageEl.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time ${m}:${s}`;
  seconds++;
}

function getRandomPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200);
  const y = Math.random() * (height - 200);

  return { x, y };
}
