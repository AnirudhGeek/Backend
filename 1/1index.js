//what is node js module system
//node js module system is allows to organise your code into multiple reusable files connected together and each file is used for a separate work

//Difference between dependencies and dev dependencies
//=> dependencies are all the packages that are required for your application to run in production
//=>dev dependencies are needed for local development and testing

const loadsh = require("loadsh");
const path = require("path");
const names = ["anirudh", "abhinav", "rahul", "aryan"];

const caps = loadsh.map(names, loadsh.capitalize);
console.log(caps);

console.log("Directory name : ", path.dirname(__filename));
console.log("File name : ", path.basename(__filename));
console.log("Extension name : ", path.extname(__filename));

//joining path
const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Joined path : ",joinPath)