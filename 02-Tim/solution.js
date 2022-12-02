import * as fs from "fs/promises";

const input = await fs.readFile("input.txt", "utf-8");
const strategy = input.split("\n").map((line) => line.replace(" ", ""));

function calcResult(input) {
  // A: Rock, B: Paper, C: Scissors
  // X: Rock, Y: Paper, Z: Scissors
  // 0: Loss, 3: Draw, 6: Win
  // 1: Rock, 2: Paper, 3: Scissors
  const result = {
    AX: 4,
    AY: 8,
    AZ: 3,
    BX: 1,
    BY: 5,
    BZ: 9,
    CX: 7,
    CY: 2,
    CZ: 6,
  };
  return result[input];
}

console.log(
  strategy.reduce((a, c) => a + calcResult(c), 0)
);

// Bonus
function calcBonusResult(input) {
  // X: Lose, Y: Draw, Z: Win
  const bonusResult = {
    AX: 3,
    AY: 4,
    AZ: 8,
    BX: 1,
    BY: 5,
    BZ: 9,
    CX: 2,
    CY: 6,
    CZ: 7,
  };
  return bonusResult[input];
}

console.log("Bonus: ",
  strategy.reduce((a, c) => a + calcBonusResult(c), 0)
);
