'use strict';

// Solutions for https://adventofcode.com/2022/day/19

const fs = require('fs');
const path = require('path');

/**
 * Reads the input items from a file.
 *
 * @param {string} relativeFilePath A file path relative to __dirname.
 * @param {string} encoding The input file encoding.
 * @returns {Array<Object>} The input items.
 */
const readInput = (relativeFilePath = './input.txt', encoding = 'utf8') => {

    return fs
        .readFileSync(path.resolve(__dirname, relativeFilePath), encoding)
        .split(/\r?\n/)
        .slice(0, -1)

        // We are transforming the custom blueprint notation into a plain object.
        .map(line => {

            const values = line
                .match(/\d+/g)
                .map(value => parseInt(value, 10));

            const blueprint = {
                id: values[0],
                costs: {
                    oreRobot: [values[1], 0, 0],
                    clayRobot: [values[2], 0, 0],
                    obsidianRobot: [values[3], values[4], 0],
                    geodeRobot: [values[5], 0, values[6]],
                },

                // We are calculating the maximum required robots
                // based on the required materials to reduce the
                // total number of execution paths.
                typeLimits: {
                    oreRobot: Math.max(values[1], values[2], values[3], values[5]),
                    clayRobot: values[4],
                    obsidianRobot: values[6],
                    geodeRobot: Infinity,
                },
            };

            return blueprint;
        })
};

const calculateHighestGeodeCount = (blueprints, durationInMinutes, timeLimits) => {

    return blueprints.map(
        blueprint => {

            const startDate = new Date();

            const state = {
                oreRobot: 1,
                clayRobot: 0,
                obsidianRobot: 0,
                geodeRobot: 0,
                ore: 0,
                clay: 0,
                obsidian: 0,
                geode: 0,
            };

            const geodeCounts = traverseDecisionTree(blueprint, state, durationInMinutes, timeLimits);

            return geodeCounts
                .sort((a, b) => a - b)
                .slice(-1)[0];
        }
    );
};

const canProduce = (type, blueprint, inventory) => Boolean(
    inventory.ore >= blueprint.costs[type][0] &&
    inventory.clay >= blueprint.costs[type][1] &&
    inventory.obsidian >= blueprint.costs[type][2]
);

const shouldProduce = (type, blueprint, inventory, minutesLeft, timeLimits) => {

    // We are not building specific robots when
    // less than a specific time frame is left.
    if (minutesLeft < timeLimits[type]) {

        return false;
    };

    // We are limiting the number of a specific robot type
    // based on the required resources to build other robots.
    // Note: We can only produce _one_ robot per cycle!
    if (inventory[type] === blueprint.typeLimits[type]) {

        return false;
    };

    return true;
};

const evaluateNextBuildOptions = (blueprint, inventory, minutesLeft, timeLimits) => {

    // To _not_ build a new robot is always a valid option.
    const robotTypes = [
        null,
    ];

    [
        'oreRobot',
        'clayRobot',
        'obsidianRobot',
        'geodeRobot',

    ].forEach(type => {

        if (!shouldProduce(type, blueprint, inventory, minutesLeft, timeLimits)) {
            return false;
        }

        if (!canProduce(type, blueprint, inventory)) {
            return false;
        }

        robotTypes.push(type);
    });

    return robotTypes;
};

const mine = inventory => {

    inventory.ore += inventory.oreRobot;
    inventory.clay += inventory.clayRobot;
    inventory.obsidian += inventory.obsidianRobot;
    inventory.geode += inventory.geodeRobot;
};

const build = (inventory, blueprint, robotType) => {

    inventory.ore -= blueprint.costs[robotType][0];
    inventory.clay -= blueprint.costs[robotType][1];
    inventory.obsidian -= blueprint.costs[robotType][2];

    inventory[robotType] += 1;
};

const traverseDecisionTree = (blueprint, state, minutesLeft, timeLimits, robotType = null, result = []) => {

    mine(state);

    if (robotType !== null) {
        build(state, blueprint, robotType);
    }

    minutesLeft -= 1;

    if (minutesLeft === 0) {

        if (!result.includes(state.geode)) {
            result.push(state.geode);
        }

        return result;
    }

    evaluateNextBuildOptions(blueprint, state, minutesLeft, timeLimits)
        .forEach(
            robotType => traverseDecisionTree(
                blueprint,
                { ...state },
                minutesLeft,
                timeLimits,
                robotType,
                result
            )
        );

    return result;
};

console.log(
    'Solution for part one:',
    calculateHighestGeodeCount(
        readInput(),
        24,
        {
            oreRobot: 16,
            clayRobot: 6,
            obsidianRobot: 3,
            geodeRobot: 2,
        }
    ).reduce(
        (result, highestGeodeCount, index) => result + (highestGeodeCount * (index + 1)),
        0
    )
);

console.log(
    'Solution for part two:',
    calculateHighestGeodeCount(
        readInput().slice(0, 3),
        32,
        {
            oreRobot: 22,
            clayRobot: 10,
            obsidianRobot: 6,
            geodeRobot: 2,
        }
    ).reduce(
        (result, highestGeodeCount) => result * highestGeodeCount,
        1
    )
);
