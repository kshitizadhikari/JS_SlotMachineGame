// 1. Deposit Some Money
// 2. Get the number of lines user wants to bet on
// 3. Get the bet amount from the user
// 4. Spin the slot machine
// 5. If won give user winnings else deduct his balance
// 6. Play again

const prompt = require("prompt-sync")();

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
  console.log(symbols);
};

// let balance = deposit();
// const totalLines = getLines();
// const numBetAmount = getBetAmount(balance, totalLines);

spin();
