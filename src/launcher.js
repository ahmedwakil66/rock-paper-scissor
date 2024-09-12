import Game from "./game.js";
import HMAC from "./hmac.js";
import GameTable from "./table.js";
import Terminal from "./terminal.js";

class Launcher {
  game;
  table;
  hmac;
  terminal;
  constructor(...args) {
    this.game = new Game(...args);
    this.table = new GameTable(new Game(...args));
    this.hmac = new HMAC();
    this.terminal = new Terminal();
  }

  start() {
    this.play();
  }

  stop(msg) {
    console.log(msg || "Game stopped. Now existing...");
    process.exit();
  }

  async restart(msg) {
    if (msg) console.log(msg);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 700)
    );
    this.play();
  }

  play() {
    const game = this.game;
    game.resetSoft();
    const playable = game.playable;

    // Record computer move
    const key = this.hmac.getStringKey();
    const computerMove = playable[Math.floor(Math.random() * playable.length)];
    game.playMove(computerMove);

    // Show HMAC
    const hmac = this.hmac.createHmac(computerMove, key);
    console.log("HMAC: ", hmac);

    // Show available moves in console
    this.table.showAvailableMoves();

    // Handle user input
    const handleInput = (input) => {
      console.log(`'${input}'`);
      if (input == "0") {
        this.stop();
      } else if (input == "?") {
        this.help();
      } else if (input < 1 || input > playable.length) {
        // wrong key
        this.restart(`${input} is not a valid input. Restarting...`);
      } else {
        // Record user move
        const userMove = playable[parseInt(input) - 1];
        game.playMove(userMove);

        // Check who won and prepare a message
        const winner = game.checkWinner();
        let message = "It's a Draw!";
        if (winner === computerMove) {
          message = "You lost!";
        } else if (winner === userMove) {
          message = "You win!";
        }

        // Print the result, message and HMAC key
        console.log("Your move: ", userMove);
        console.log("Computer move: ", computerMove);
        console.log(message);
        console.log("HMAC KEY: ", key);

        this.whatNext();
      }
    };

    this.terminal.askQuestion("Enter your move: ", handleInput);
  }

  whatNext() {
    this.terminal.askQuestion("Do you want to play again? [Y/N]", (input) => {
      if (input.toLowerCase() === "y" || input.toLowerCase() === "yes") {
        this.play();
      } else {
        this.stop();
      }
    });
  }

  help() {
    console.log("The table shows who wins/looses against whom.");
    this.table.showGameHelp();

    this.terminal.askQuestion(
      "Do you understand the rules now? [Y/N]",
      (input) => {
        if (input.toLowerCase() === "y" || input.toLowerCase() === "yes") {
          this.restart("Okay! Restarting...");
        } else {
          this.stop();
        }
      }
    );
  }
}

export default Launcher;
