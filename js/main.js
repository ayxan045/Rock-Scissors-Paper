const playerUserTitle = document.querySelector("#playerUserTitle");
const playerUserScore = document.querySelector("#playerUserScore");
const playerUserSPR = document.querySelector("#playerUserSPR");

const playerCompTitle = document.querySelector("#playerCompTitle");
const playerCompScore = document.querySelector("#playerCompScore");
const playerCompSPR = document.querySelector("#playerCompSPR");

const cardUser = document.querySelector(".cardUser");
const cardComp = document.querySelector(".cardComp");

const user = document.querySelector("#user");
const computer = document.querySelector("#computer");
const userMob = document.querySelector("#userMob");
const computerMob = document.querySelector("#computerMob");

const myName = document.querySelector("#myName");

const music = document.querySelector("#music");
const audio = document.querySelector("#audio");

const arrSPR = ["s", "p", "r"];

const icon1 = document.querySelector("#icon1");
const icon2 = document.querySelector("#icon2");
const icon3 = document.querySelector("#icon3");

let userScore = 0;
let compScore = 0;

alert("Welcome to the rock-scissors-paper game");
let whatName = prompt("What is your name?");
let score = Number(prompt("What is the score in the game?"));


if (score === 0) {
  score = 3;
  alert("Score = 3");
}

myName.innerText = whatName ? `${whatName}` : "User Player";

function musicAudio() {
  audio.classList.toggle("displayNone");
}
musicAudio();

function confet() {
  const duration = 3 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    if (userScore === score) {
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.25), y: Math.random() - 0.2 },
        })
      );
    } else {
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.75, 0.9), y: Math.random() - 0.2 },
        })
      );
    }
  }, 250);
  setTimeout(() => {
    if (userScore === score || compScore === score) {
      playerCompSPR.setAttribute("src", `img/rock-paper-scissors.png`);
      playerUserSPR.setAttribute("src", `img/rock-paper-scissors.png`);
      playerCompTitle.innerHTML = "...";
      playerUserTitle.innerHTML = "...";
      playerCompScore.innerHTML = "Score: 0";
      playerUserScore.innerHTML = "Score: 0";
      userScore = 0;
      compScore = 0;
      cardUser.classList.remove("loseBShadow");
      cardComp.classList.remove("winBShadow");
      cardUser.classList.remove("drawBShadow");
      cardComp.classList.remove("drawBShadow");
      playerUserTitle.classList.remove("text-danger");
      playerUserTitle.classList.remove("text-success");
      playerCompTitle.classList.remove("text-success");
      playerCompTitle.classList.remove("text-danger");
      cardUser.classList.remove("winBShadow");
      cardComp.classList.remove("loseBShadow");
      cardUser.classList.remove("loseBShadow");
      cardComp.classList.remove("winBShadow");
      cardUser.classList.remove("scaleWin");
      cardComp.classList.remove("scaleLose");
      cardComp.classList.remove("scaleWin");
      cardUser.classList.remove("scaleLose");
    }
  }, 4000);
}

function winLose() {
  if (userScore === score) {
    cardUser.classList.add("scaleWin");
    cardComp.classList.add("scaleLose");
    user.innerText ++;
    userMob.innerText ++;
    confet();
  } else if (compScore === score) {
    cardComp.classList.add("scaleWin");
    cardUser.classList.add("scaleLose");
    computer.innerText ++;
    computerMob.innerText ++;
    confet();
  }
}

function randomElement(arr) {
  let randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

function isWin(isPlayerUserWin) {
  if (isPlayerUserWin) {
    playerUserTitle.innerHTML = "Win";
    playerCompTitle.innerHTML = "Lose";
    playerUserTitle.classList.remove("text-primary");
    playerCompTitle.classList.remove("text-primary");
    playerUserTitle.classList.remove("text-danger");
    playerCompTitle.classList.remove("text-success");
    playerUserTitle.classList.add("text-success");
    playerCompTitle.classList.add("text-danger");
  } else if (!isPlayerUserWin) {
    playerUserTitle.innerHTML = "Lose";
    playerCompTitle.innerHTML = "Win";
    playerUserTitle.classList.remove("text-primary");
    playerCompTitle.classList.remove("text-primary");
    playerUserTitle.classList.remove("text-success");
    playerCompTitle.classList.remove("text-danger");
    playerCompTitle.classList.add("text-success");
    playerUserTitle.classList.add("text-danger");
  }
}

function showSPR(img1, img2) {
  playerUserScore.innerText = `Score: ${userScore}`;
  playerCompScore.innerText = `Score: ${compScore}`;

  playerUserSPR.src = `img/${img1}.png`;
  playerCompSPR.src = `img/${img2}.png`;
}

function startGame(e) {
  let playerUserChoose;
  if (e.type === "keydown") {
    playerUserChoose = e.key;
    if(userScore === score || compScore === score){
      return
    }
  } else if (e.type === "click") {
    if (e.target.id === "icon1") {
      playerUserChoose = "s";
    } else if (e.target.id === "icon2") {
      playerUserChoose = "r";
    } else if (e.target.id === "icon3") {
      playerUserChoose = "p";
    }
    if(userScore === score || compScore === score){
      return
    }
  }
  if (!arrSPR.includes(playerUserChoose)) {
    alert("Please correct choose item: 's','p','r'");
    return;
  }

  let playerCompChoose = randomElement(arrSPR);

  if (
    (playerUserChoose === "s" && playerCompChoose === "p") ||
    (playerUserChoose === "p" && playerCompChoose === "r") ||
    (playerUserChoose === "r" && playerCompChoose === "s")
  ) {
    cardUser.classList.remove("loseBShadow");
    cardComp.classList.remove("winBShadow");
    cardUser.classList.remove("drawBShadow");
    cardComp.classList.remove("drawBShadow");
    cardUser.classList.add("winBShadow");
    cardComp.classList.add("loseBShadow");
    userScore += 1;
    isWin(true);
    showSPR(playerUserChoose, playerCompChoose);
   
  } else if (playerUserChoose === playerCompChoose) {
    playerUserTitle.innerHTML = "Draw";
    playerCompTitle.innerHTML = "Draw";
    playerUserTitle.classList.remove("text-danger");
    playerUserTitle.classList.remove("text-success");
    playerCompTitle.classList.remove("text-success");
    playerCompTitle.classList.remove("text-danger");
    playerUserTitle.classList.add("text-primary");
    playerCompTitle.classList.add("text-primary");
    cardUser.classList.remove("winBShadow");
    cardComp.classList.remove("loseBShadow");
    cardUser.classList.remove("loseBShadow");
    cardComp.classList.remove("winBShadow");
    cardComp.classList.add("drawBShadow");
    cardUser.classList.add("drawBShadow");
    showSPR(playerUserChoose, playerCompChoose);
  } else {
    cardUser.classList.remove("winBShadow");
    cardComp.classList.remove("loseBShadow");
    cardUser.classList.remove("drawBShadow");
    cardComp.classList.remove("drawBShadow");
    cardUser.classList.add("loseBShadow");
    cardComp.classList.add("winBShadow");
    compScore += 1;
    isWin();
    showSPR(playerUserChoose, playerCompChoose);
  }
  winLose();
}
window.onkeydown = startGame;
icon1.onclick = startGame;
icon2.onclick = startGame;
icon3.onclick = startGame;
