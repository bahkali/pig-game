/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let scrore, roundScore, activePlayer, gamePlaying;
init();
/* dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);`
document.querySelector("#current-" + activePlayer).textContent;
document.querySelector("#current-" + activePlayer).innerHTML = '<em>'+ dice+'</em>';
var x = document.querySelector("#score-0").textContent;
console.log(x); */
var winnerScore = window.prompt("What is the winner Score");
document.querySelector(".btn-roll").addEventListener(
  "click",
  //anonumous funtion
  function () {
    //check state of the game
    if (gamePlaying) {
      //generate a ramdon number between 1 - 6
      let dice = Math.floor(Math.random() * 6) + 1;
      let previousDice;
      //display result
      var dicePieace = document.querySelector(".dice");
      dicePieace.style.display = "block";
      dicePieace.src = "dice-" + dice + ".png";

      previousDice = dice;
      if (dice === 6 && previousDice === 6) {
        scrore[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        nextPlayer();
      }
      //update the round score score if the rolled number was not a 1
      else if (dice !== 1) {
        roundScore += dice;
        // console.log(previousDice);
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else {
        nextPlayer();
      }
    }
  }
);

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    //add current score to Global score
    scrore[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scrore[activePlayer];
    //check if the player won the game
    if (scrore[activePlayer] >= winnerScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //   document.querySelector(".player-0-panel").classList.remove("active");
  //   document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
function init() {
  scrore = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = "none"; // change the css propreties { display: none}
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
document.querySelector(".btn-new").addEventListener("click", init);
