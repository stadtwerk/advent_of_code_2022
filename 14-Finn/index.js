'use strict';

// Solutions for https://adventofcode.com/2022/day/14

const fs = require('fs');
const path = require('path');

/**
 * Reads the input items from a file.
 *
 * @param {string} relativeFilePath A file path relative to __dirname.
 * @param {string} encoding The input file encoding.
 * @returns {Array<Array<Array<Number>>>} The input items.
 */
const readInput = (relativeFilePath = './input.txt', encoding = 'utf8') => {

    return fs
        .readFileSync(path.resolve(__dirname, relativeFilePath), encoding)
        .split(/\r?\n/)
        .slice(0, -1)

        // We are transforming the rock path coordinates from
        // the custom notation into plain arrays of integers.
        .map(
            rockPath => rockPath
                .split(' -> ')
                .map(
                    point => point
                        .split(',')
                        .map(
                            coordinate => parseInt(coordinate, 10)
                        )
                )
        )
};

const calculateRockCoordinates = paths => {

    const rockCoordinates = [];

    const addUniquePoint = uniquePoint => {

        const alreadyExists = rockCoordinates.find(
            point => point[0] === uniquePoint[0] && point[1] === uniquePoint[1]
        );

        if (!alreadyExists) {
            rockCoordinates.push(uniquePoint);
        }
    }

    paths.forEach(path => {

        path.forEach((point, index) => {

            const nextPoint = path[index + 1];

            if (!nextPoint) {
                return;
            }

            const isHorizontal = nextPoint[0] !== point[0];
            const isVertical = nextPoint[1] !== point[1];

            rockCoordinates.find(element => element > 10);

            if (isHorizontal) {

                resolveRange(point[0], nextPoint[0])
                    .forEach(x => addUniquePoint([x, point[1]]));
            }

            if (isVertical) {

                resolveRange(point[1], nextPoint[1])
                    .forEach(y => addUniquePoint([point[0], y]));
            }
        })
    })

    return rockCoordinates;
}

const resolveRange = (from, to) => {

    const range = [from, to].sort((a, b) => (a - b));
    const result = [range[1]];

    let index = range[1] - range[0];

    while (index--) {
        result.push(range[0] + index)
    }

    return result;
}

const pointIsFree = (rockCoordinates, sandCoordinates, x, y) => {

    return !Boolean(
        rockCoordinates.find(point => point[0] === x && point[1] === y) ||
        sandCoordinates.find(point => point[0] === x && point[1] === y)
    );
}

const getLowestRockPosition = rockCoordinates => rockCoordinates.reduce(
    (aggregate, point) => point[1] > aggregate ? point[1] : aggregate,
    0
);

const simulate = rockCoordinates => {

    const origin = [500, 0];
    const sandCoordinates = [];
    const beneathFloorPosition = getLowestRockPosition(rockCoordinates) + 3;

    let x = origin[0];
    let y = origin[1];

    while (true) {

        // We assume that a sand unit is in free fall
        // if it is below the floor rock position.
        if (y > beneathFloorPosition) {
            break;
        }

        // Try moving a step down.
        if (pointIsFree(rockCoordinates, sandCoordinates, x, y + 1)) {
            y = y + 1;
            continue;
        }

        // Try moving a step down-left.
        if (pointIsFree(rockCoordinates, sandCoordinates, x - 1, y + 1)) {
            x = x - 1;
            y = y + 1;
            continue;
        }

        // Try moving a step down-right.
        if (pointIsFree(rockCoordinates, sandCoordinates, x + 1, y + 1)) {
            x = x + 1;
            y = y + 1;
            continue;
        }

        if (y > beneathFloorPosition) {
            break;
        }

        // We assume, that the sand unit is settled.
        sandCoordinates.push([x, y]);

        // The cave is filled if the sand unit settles in the origin.
        if (x === origin[0] && y === origin[1]) {
            break;
        }

        // We are emitting a new sand unit at the origin.
        x = origin[0];
        y = origin[1];
    }

    return sandCoordinates;
}

const addFloor = rockCoordinates => {

    const result = rockCoordinates;
    const y = getLowestRockPosition(rockCoordinates) + 2;
    let x = 1000;

    while (x--) {
        result.push([x, y])
    }

    return result;
}

console.log(
    'Solution for part one:',
    simulate(
        calculateRockCoordinates(
            readInput()
        )
    ).length
);

console.log(
    'Solution for part two:',
    simulate(
        addFloor(
            calculateRockCoordinates(
                readInput()
            )
        )
    ).length
);
