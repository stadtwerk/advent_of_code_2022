const fs = require('fs');
const assert = require('assert');

const parseMonkeys = (data) =>
  data
    .split('Monkey ')
    .slice(1)
    .map((monkey) => ({
      items: monkey
        .split(':')[2]
        .split(',')
        .map((item) => parseInt(item, 10)),
      operation: monkey
        .split('new = ')[1]
        .split('\n')[0]
        .trim(),
      test: parseInt(
        monkey.split(':')[4].split('divisible by ')[1],
        10
      ),
      trueMonkey: parseInt(
        monkey
          .split(':')[5]
          .split('throw to monkey')[1],
        10
      ),
      falseMonkey: parseInt(
        monkey
          .split(':')[6]
          .split('throw to monkey')[1],
        10
      ),
      inspected: 0,
    }));

function simulateMonkeys(monkeys, rounds, manageFrustration) {
  for (let r = 0; r < rounds; r++) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        monkey.inspected += 1;

        const newWorry = manageFrustration(
          eval(
            monkey.operation.replace(/old/g, monkey.items.shift().toString())
          )
        );
        const newMonkeyIndex =
          newWorry % monkey.test === 0
            ? monkey.trueMonkey
            : monkey.falseMonkey;
        monkeys[newMonkeyIndex].items.push(newWorry);
      }
    }
  }
  return monkeys
    .sort((a, b) => b.inspected - a.inspected)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr.inspected, 1);
}

function solveOne(data) {
  return simulateMonkeys(parseMonkeys(data), 20, (frustration) =>
    Math.floor(frustration / 3)
  );
}

(() => {
  const data = fs.readFileSync('input.txt').toString();
  assert.deepStrictEqual(
    solveOne(
      `
  Monkey 0:
    Starting items: 79, 98
    Operation: new = old * 19
    Test: divisible by 23
      If true: throw to monkey 2
      If false: throw to monkey 3
  Monkey 1:
    Starting items: 54, 65, 75, 74
    Operation: new = old + 6
    Test: divisible by 19
      If true: throw to monkey 2
      If false: throw to monkey 0
  Monkey 2:
    Starting items: 79, 60, 97
    Operation: new = old * old
    Test: divisible by 13
      If true: throw to monkey 1
      If false: throw to monkey 3
  Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`
  ),
  10605
);
console.log("answer 1: " + solveOne(data));
})();

function solveTwo(data) {
const monkeys = parseMonkeys(data);
const mod = monkeys.reduce((acc, curr) => acc * curr.test, 1);
return simulateMonkeys(monkeys, 10000, (frustration) =>
  frustration % mod
);
}

(() => {
const data = fs.readFileSync('input.txt').toString();
console.log("answer 2: " + solveTwo(data));
})();