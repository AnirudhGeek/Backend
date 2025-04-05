//promises are actually a better way or cleaner way

const { error } = require("console");
const { resolve } = require("path");

function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log("promise lecture starts");
delayFn(2000).then(() => {
  // if the Promise is resolved then only the then function will start
  console.log(`Ater 2 seconds promise is resolved`);
});
console.log("end");

//catch error in promise
function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Can not perform division by 0");
    } else {
      resolve(num1 / num2);
    }
  });
}

divideFn(10, 0)
  .then((result) => console.log(result, "res"))
  .catch((error) => console.log(error, "err"));