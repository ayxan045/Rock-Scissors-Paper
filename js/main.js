const playerUserTitle = document.querySelector("#playerUserTitle");
const playerUserScore = document.querySelector("#playerUserScore");
const playerUserSPR = document.querySelector("#playerUserSPR");

const playerCompTitle = document.querySelector("#playerCompTitle");
const playerCompScore = document.querySelector("#playerCompScore");
const playerCompSPR = document.querySelector("#playerCompSPR");

const myName = document.querySelector("#myName");

const arrSPR = ["s", "p", "r"];


const icon1 = document.querySelector("#icon1");
const icon2 = document.querySelector("#icon2");
const icon3 = document.querySelector("#icon3");



let userScore = 0;
let compScore = 0;

let whatName = prompt("What is your name?");

myName.innerText = whatName ? `${whatName}` : "User Player";

function randomElement(arr) {
  let randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}
// console.log(randomElement(arrSPR));

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
  //   console.log(playerUserChoose);
  if (e.type === "keydown") {
    playerUserChoose = e.key;
  } else if (e.type === "click" ) {

  
   if(e.target.id === "icon1"){
    playerUserChoose = "s"
   }else if(e.target.id === "icon2"){
    playerUserChoose = "r"
   }else if(e.target.id === "icon3"){
    playerUserChoose = "p"
   }
  }
  if (!arrSPR.includes(playerUserChoose)) {
    alert("Please correct choose item: 's','p','r'");
    return;
  }

  let playerCompChoose = randomElement(arrSPR);
  // console.log("playerUserChoose:", playerUserChoose);

  // console.log("playerCompChoose:", playerCompChoose);

  if (
    (playerUserChoose === "s" && playerCompChoose === "p") ||
    (playerUserChoose === "p" && playerCompChoose === "r") ||
    (playerUserChoose === "r" && playerCompChoose === "s")
  ) {
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
    showSPR(playerUserChoose, playerCompChoose);
  } else {
    compScore += 1;
    isWin();
    showSPR(playerUserChoose, playerCompChoose);
  }
 
}
window.onkeydown = startGame;
icon1.onclick = startGame;
icon2.onclick = startGame;
icon3.onclick = startGame;