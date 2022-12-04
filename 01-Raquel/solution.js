
// const countingCalories = (caloriesFromAllElves) => {
    //     caloriesFromAllElves.forEach(
        //         caloriesFromIndividualElf => {
            //             caloriesFromIndividualElf.reduce((accumulator, currentValue) => accumulator + currentValue, eachElfCalorieCount
            //             );
            //         }
            //     );
            // };
// const countingCalories = (caloriesFromAllElves) => {
               
    // for (let i=0; i>=caloriesFromAllElves.length; i++) {
        //     const theMostCalories = caloriesFromAllElves[i].reduce(
            //         (accumulator, currentValue) => {
                //         return accumulator + currentValue, eachElfCalorieCount
                //         }
                //     ) 
                //     return theMostCalories
                // }
                // return
const countingCalories = (caloriesFromAllElves) => {

    //const caloriesFromAllElves = [[2,3], [4,7]];         
    let eachElfCalorieCount = 0;
    
  for (let i=0; i<=2; i++) {
        // let calorieSum = caloriesFromAllElves[0]
        // .reduce((accumulator, currentValue) => {
        //         accumulator + currentValue;
        //     }, eachElfCalorieCount
        // )
        // return calorieSum
        return i
    //}
    }

}

console.log(countingCalories([4,7], [2,3]))



// ********************************************************

const arr = [5, 15, 45];

const sum = arr.reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

console.log(sum); // 👉️ 65

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
