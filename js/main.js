let scores,
  activePlayer,
  roundScore,
  diceDOM,
  playerOne,
  playerTwo,
  isPlaying,
  dice1,
  dice2,
  winnerScore;
winnerScore = 10;

init();

dice1DOM = document.querySelector(".dice1");
dice2DOM = document.querySelector(".dice2");

playerOne = document.querySelector(".player-0-panel");

playerTwo = document.querySelector(".player-1-panel");

isPlaying = true;

dice1DOM.style.display = "none";
dice2DOM.style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isPlaying) {
    dice2 = Math.floor(Math.random() * 6) + 1;
    dice1 = Math.floor(Math.random() * 6) + 1;
    if (dice1 == 6 && dice2 == 6) {
      let score = document.getElementById("score-" + activePlayer);
      score.textContent = 0;
      scores[activePlayer] = 0;
      previousDice2 = 0;
      previousDice1 = 0;
      nextPlayer();
    }
    dice1DOM.style.display = "block";
    dice2DOM.style.display = "block";

    dice1DOM.src = "imgs/dice-" + dice1 + ".png";
    dice2DOM.src = "imgs/dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
      // diceDOM.style.display = "none";
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isPlaying) {
    scores[activePlayer] += roundScore;
    let score = document.getElementById("score-" + activePlayer);
    score.textContent = scores[activePlayer];
    if (scores[activePlayer] > winnerScore) {
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      isPlaying = false;
    } else {
      nextPlayer();
    }
    //   diceDOM.style.display = "none";
  }
});
document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();
  winnerScore = parseInt(document.getElementById("winnerScore").value);
});
document.querySelector(".btn-new").addEventListener("click", init);
function nextPlayer() {
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  playerOne.classList.toggle("active");
  playerTwo.classList.toggle("active");
}
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  document.querySelector("#current-0").textContent = roundScore;
  document.querySelector("#current-1").textContent = roundScore;
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  isPlaying = true;
}
