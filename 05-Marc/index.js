const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false,
});

const inputArray = [];

file.on('line', (line) => {
    inputArray.push(line);
});

file.on('close', () => {
    const emptyLine = inputArray.findIndex(value => value === '');
    const cargoLines = inputArray.slice(0, emptyLine)
    const rearrangementsLines = inputArray.slice(emptyLine + 1);

    const cargoStackLines = cargoLines.reverse().slice(1);

    const cargoStacks = [];
    cargoStackLines.forEach(line => {
        const chunkSize = 4;
        let j = 0;
        for (let i = 0; i < line.length; i += chunkSize) {
            const item = line.slice(i, i + chunkSize).replace(/[^A-Z]/g, '')
            if(item) {
                if(!Array.isArray(cargoStacks[j])) {
                    cargoStacks[j] = [];
                }
                cargoStacks[j].push(item);
            }
            j++;
        }
    });

    // first part
    const cargoStacks1 = [...cargoStacks.map(value => [...value])];
    rearrangementsLines.forEach(line => {
        const [,quantity,, fromPosition,, toPosition] = line.split(' ').map(Number);

        for(let i = 0; i < quantity; i++) {
            cargoStacks1[toPosition - 1].push(cargoStacks1[fromPosition -1].pop());
        }
    })
    console.log(cargoStacks1.map(
        stack => stack[stack.length - 1]
    ).join(''));


    // second part
    const cargoStacks2 = [...cargoStacks.map(value => [...value])];

    rearrangementsLines.forEach(line => {
        const [,quantity,, fromPosition,, toPosition] = line.split(' ').map(Number);

        cargoStacks2[toPosition - 1].push(...(cargoStacks2[fromPosition -1].splice(cargoStacks2[fromPosition -1].length - quantity, quantity)));
    })
    console.log(cargoStacks2.map(
        stack => stack[stack.length - 1]
    ).join(''));
});