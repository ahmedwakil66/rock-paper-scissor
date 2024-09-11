class Game {
  #history = [];
  #playable = [];
  #firstMove = null;
  #lastMove = null;
  #winnerMove = null;

  constructor(...args) {
    if (args.length < 3) {
      throw new Error(
        "You must provide at least three playable to initiate this game"
      );
    } else if (args.length % 2 === 0) {
      throw new Error("Total playable members must be Odd.");
    }

    for (const arg of args) {
      if (this.#playable.indexOf(arg) !== -1)
        throw new Error("Duplicate playable is not supported");

      this.#playable.push(arg);
    }
  }

  get playable() {
    return this.#playable;
  }

  get firstMove() {
    return this.#firstMove;
  }

  get lastMove() {
    return this.#lastMove;
  }

  get history() {
    return this.#history;
  }

  playMove(value) {
    if (this.#playable.indexOf(value) === -1)
      throw new Error(`${value} is not a playable`);

    if (!this.#firstMove) {
      this.#firstMove = value;
      return `Recorded ${value} as first move`;
    } else if (!this.#lastMove) {
      this.#lastMove = value;
      return `Recorded ${value} as last move`;
    } else {
      throw new Error(
        `Both moves are recorded. You must check who won this round to play again.`
      );
    }
  }

  checkWinner() {
    // Rearrange playable by positioning first played move at center
    // without breaking their sequential order
    let rearrangedPlayable = Game.moveToCenter(this.#playable, this.#firstMove);
    const fmIndex = rearrangedPlayable.indexOf(this.#firstMove);
    const lmIndex = rearrangedPlayable.indexOf(this.#lastMove);

    if (lmIndex > fmIndex) {
      this.#winnerMove = this.#lastMove;
    } else if (lmIndex < fmIndex) {
      this.#winnerMove = this.#firstMove;
    } else {
      this.#winnerMove = null;
    }

    this.#history.push({
      firstMove: this.#firstMove,
      lastMove: this.#lastMove,
      winnerMove: this.#winnerMove,
    });

    return this.#winnerMove;
  }

  softReset() {
    this.#firstMove = null;
    this.#lastMove = null;
    this.#winnerMove = null;
  }

  reset() {
    this.softReset();
    this.#playable = [];
    this.#history = [];
  }

  static moveToCenter(givenArray, selectedItem, modifyOriginal = false) {
    const arr = modifyOriginal ? givenArray : [...givenArray];
    const len = arr.length;
    const middleIndex = Math.floor(len / 2);
    let selectedIndex = arr.indexOf(selectedItem);

    // If the selected item is not in the array, return the original array
    if (selectedIndex === -1) {
      console.error("Item not found in the array.");
      return arr;
    }

    // If the selected item is already in the middle, do nothing
    if (selectedIndex === middleIndex) {
      return arr;
    }

    // Helper function to rotate array
    function rotateLeft(array) {
      const item = array.shift();
      array.push(item);
    }

    function rotateRight(array) {
      const item = array.pop();
      array.unshift(item);
    }

    // Move item to the middle
    while (selectedIndex !== middleIndex) {
      if (selectedIndex > middleIndex) {
        // Move item from the beginning to the end
        rotateLeft(arr);
        selectedIndex = arr.indexOf(selectedItem);
      } else {
        // Move item from the end to the beginning
        rotateRight(arr);
        selectedIndex = arr.indexOf(selectedItem);
      }
    }

    return arr;
  }
}

export default Game;
