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

  question(question, callback) {
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

// console.log('Starting the game ...');

// const r = rl.question('Enter your first name: ', async(input) => {
//     console.log(input);
//     rl.promt

//     await new Promise(resolve => setTimeout(() => {resolve()}, 2000));

//     rl.question('Enter your last name: ', (input2) => {
//         console.log(input2);
//         console.log(input + " " + input2);

//         rl.close()
//     })
// })
