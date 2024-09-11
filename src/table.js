import CliTable3 from "cli-table3";

class GameTable {
  game;
  constructor(game) {
    this.game = game;
  }

  static cliTable() {
    // Create a new table with custom border settings
    return new CliTable3({
      chars: {
        top: "─",
        "top-mid": "┬",
        "top-left": "┌",
        "top-right": "┐",
        bottom: "─",
        "bottom-mid": "┴",
        "bottom-left": "└",
        "bottom-right": "┘",
        left: "│",
        "left-mid": "├",
        mid: "─",
        "mid-mid": "┼",
        right: "│",
        "right-mid": "┤",
        middle: "│",
      },
    });
  }

  generateGameInfo() {
    const table = GameTable.cliTable();
    const playable = this.game.playable;

    table.push([{ colSpan: 1, content: "v PC\\User >" }, ...playable]);

    for (const item of playable) {
      const row = [item];
      for (let i = 0; i < playable.length; i++) {
        this.game.playMove(item);
        this.game.playMove(playable[i]);
        const winner = this.game.checkWinner();
        if (winner) {
          row.push(winner);
        } else {
          row.push("Draw");
        }
        this.game.softReset();
      }
      table.push(row);
    }

    return table.toString();
  }

  showGameHelp() {
    console.log(this.generateGameInfo());
  }

  showAvailableMoves() {
    console.log("Available moves:");
    this.game.playable.forEach((move, i) => {
      console.log(i + 1 + "", " - ", move);
    });
    console.log(0 + "", " - ", "exit");
    console.log("?", " - ", "help");
  }
}

export default GameTable;
