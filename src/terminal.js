import readline from "node:readline";

class Terminal {
  rl;
  constructor() {
    // Create an interface to read from the terminal
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  askQuestion(question, callback) {
    this.rl.question(question, (input) => {
      callback(input.trim(), this.rl);
    });
  }

  pauseInput() {
    this.rl.pause();
  }

  resumeInput() {
    this.rl.resume();
  }
}

export default Terminal;
