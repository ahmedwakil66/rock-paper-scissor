import Launcher from "./launcher.js";

try {
  const launcher = new Launcher(...process.argv.slice(2));
  launcher.play();
} catch (error) {
  console.log(error.message);
  console.log("Example: Rock, Paper, Scissor");
  console.log("Game stopped. Now Existing...");
}
