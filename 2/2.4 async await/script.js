//async await is just same as promises do , it is just its an syntatical sugar added on top of the promises
// await  => the await keyword pauses the execution of the function until and unless the promise gets resolved

const { time } = require("console");

function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedGreet(name) {
  await delayFn(2000);
  console.log(name);
}

delayedGreet("Anirudh Raturi");

//error handling
async function divisionFn(num1, num2) {
  try {
    if (num2 === 2) throw new Error("Cannot divide by 0");
    return num1 / num2;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
async function mainFn(){
    console.log(await divisionFn(10,2))
    console.log(await divisionFn(10,0))
}
mainFn()