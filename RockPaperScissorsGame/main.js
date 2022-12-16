const startGame = () => {
  let playerStartScore = 0;
  let computerStartScore = 0;

  function startScreen() {
    const playButton = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playButton.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  }

  function playMatch() {
    let options = document.querySelectorAll(".options button");
    let playerHand = document.querySelector(".player-hand");
    let computerHand = document.querySelector(".computer-hand");
    let hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    const computerOptions = ["rock", "paper", "scissors"];

    for (let i = 0; i < options.length; i++) {
      let option = options[i];

      option.addEventListener("click", function () {
        disableButtons(options, true);

        let computerNumber = Math.floor(Math.random() * 3);
        let computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          disableButtons(options, false);
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
          compareHands(this.textContent, computerChoice);
        }, 1500);

        playerHand.style.animation = "shakePlayer 1.5s ease";
        computerHand.style.animation = "shakeComputer 1.5s ease";
      });
    }
  }

  function disableButtons(options, disable) {
    options.forEach((option) => {
      option.disabled = disable;
    });
  }

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = playerStartScore;
    computerScore.textContent = computerStartScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");

    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie";
      return;
    }

    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins!";
        playerStartScore++;

        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins!!";
        computerStartScore++;

        updateScore();
        return;
      }
    }

    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins!!";
        computerStartScore++;

        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins!";
        playerStartScore++;

        updateScore();
        return;
      }
    }

    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins!!";
        computerStartScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        playerStartScore++;
        updateScore();
        return;
      }
    }
  };

  startScreen();
  playMatch();
};

startGame();
