// 1. Deposit Some Money
// 2. Get the number of lines user wants to bet on
// 3. Get the bet amount from the user
// 4. Spin the slot machine
// 5. If won give user winnings else deduct his balance
// 6. Play again

const prompt = require("prompt-sync")();

const COLS = 3;
const ROWS = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
  E: 10,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numDepositAmount = parseFloat(depositAmount);

    if (numDepositAmount <= 0 || isNaN(numDepositAmount)) {
      console.log("Invalid deposit amount. 0\n");
    } else {
      return numDepositAmount;
    }
  }
};

const getLines = () => {
  while (true) {
    const lines = prompt(
      "Enter the number of lines you want to bet on (1-3): "
    );
    const numlines = parseFloat(lines);

    if (isNaN(numlines) || numlines <= 0 || numlines > 3) {
      console.log("Invalid number of lines. 0\n");
    } else {
      return numlines;
    }
  }
};

const getBetAmount = (depositAmount, numlines) => {
  while (true) {
    const betAmount = prompt("Enter bet amount per line: ");
    const numBetAmount = parseFloat(betAmount);

    if (isNaN(numBetAmount) || numBetAmount > depositAmount / numlines) {
      console.log("Invalid bet amount. 0\n");
    } else {
      return numBetAmount;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rowReels = [];

  for (let i = 0; i < ROWS; i++) {
    rowReels.push([]);
    for (let j = 0; j < COLS; j++) {
      rowReels[i].push(reels[j][i]);
    }
  }
  return rowReels;
};

const printRows = (rowReels) => {
  rowReels.forEach((row) => {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  });
};

const CheckWinnings = (rowReels) => {
  let rowsWon = 0;
  rowReels.forEach((row) => {
    const val = row[0];
    let ae = 0;
    for (let i = 1; i < row.length; i++) {
      if (row[i] == val) {
        ae++;
      }
    }
    if (ae == 2) {
      rowsWon++;
    }
  });
  console.log(rowsWon);
};

let balance = deposit();
const totalLines = getLines();
const numBetAmount = getBetAmount(balance, totalLines);
const reels = spin();
const rowReels = transpose(reels);
printRows(rowReels);
CheckWinnings(rowReels);
