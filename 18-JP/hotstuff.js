const fs = require('fs');

function part1(cubes) {
   // Set to store the input cubes
   let inputCubes = new Set();
   // Arrays to store the minimum and maximum coordinates of the input cubes
   let maxCoords = [0, 0, 0], minCoords = [20, 20, 20];
   // Function to generate a unique key for a given cube
   const getKey = cube => cube.join('_');
   // Function to calculate the distance between two cubes
   const cubeDistance = (c1, c2) => c1.reduce((acc, v, i) => acc + Math.abs(v - c2[i]), 0);
 
   // Iterate through the input cubes and:
   // - Add them to the inputCubes set
   // - Update the maxCoords and minCoords arrays to include the current cube
   // - Calculate the number of input cubes that are not adjacent to the current cube
   // - Add this value to the accumulator
   return cubes.reduce((acc, c1) => {
     inputCubes.add(getKey(c1));
     maxCoords = maxCoords.map((v, d) => Math.max(v, c1[d] + 1));
     minCoords = minCoords.map((v, d) => Math.min(v, c1[d] - 1));
     return acc + 6 - cubes.filter(c2 => cubeDistance(c1, c2) == 1).length;
   }, 0);
}


function part2(cubes) {
    // Array to store the water cubes and a set to store the processed cubes
    let waterCubes = [], processedCubes = new Set();
    // Set to store the input cubes
    let inputCubes = new Set();
    // Arrays to store the minimum and maximum coordinates of the input cubes
    let maxCoords = [0, 0, 0], minCoords = [20, 20, 20];
    // Array of directions to use when spreading water
    const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    // Function to generate a unique key for a given cube
    const getKey = cube => cube.join('_');
    // Function to check if a given cube is within the range of the input cubes
    const isInRange = cube => cube.every((v, i) => v >= minCoords[i] && v <= maxCoords[i]);
    // Function to add two cubes together
    const addCubes = (c1, c2) => c1.map((v, i) => v + c2[i]);
    // Function to calculate the distance between two cubes
    const cubeDistance = (c1, c2) => c1.reduce((acc, v, i) => acc + Math.abs(v - c2[i]), 0);
  
    // Function to spread water to adjacent cubes
    const spreadWater = cube => {
      // If the current cube has already been processed, return early
      if (processedCubes.has(getKey(cube))) return;
      // Add the current cube to the processed cubes set and the water cubes array
      processedCubes.add(getKey(cube));
      waterCubes.push(cube);
      // Iterate through the directions and:
      // - Calculate the target cube by adding the current cube and the direction
      // - If the target cube is within the range of the input cubes and has not been processed,
      //   spread water to the target cube
      for (let i = 0; i < dirs.length; i++) {
        let targetCube = addCubes(cube, dirs[i]);
        if (isInRange(targetCube) && !inputCubes.has(getKey(targetCube))) spreadWater(targetCube);
      }
    }
  
    // Iterate through the input cubes and:
    // - Add them to the inputCubes set
    // - Update the maxCoords and minCoords arrays to include the current cube
    cubes.forEach(cube => {
      inputCubes.add(getKey(cube));
      maxCoords = maxCoords.map((v, d) => Math.max(v, cube[d] + 1));
      minCoords = minCoords.map((v, d) => Math.min(v, cube[d] - 1));
    });
  
    // Spread water from the minimum coordinates of the input cubes
    spreadWater(minCoords);
  // Iterate through the water cubes and:
  // - Calculate the number of input cubes that are adjacent to the current cube
  // - Add this value to the accumulator
  return waterCubes.reduce((acc, c1) => acc + cubes.filter(c2 => cubeDistance(c1, c2) == 1).length, 0);
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const cubes = data.split('\n').map(line => line.split(',').map(Number));
  console.log("answer 1: " + part1(cubes));
  console.log("answer 2: " + part2(cubes));
});


