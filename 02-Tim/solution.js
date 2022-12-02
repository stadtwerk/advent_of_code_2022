import * as fs from "fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

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
  input
    .split("\n")
    .map((line) => line.replace(" ", ""))
    .reduce((a, c) => a + calcResult(c), 0)
);
