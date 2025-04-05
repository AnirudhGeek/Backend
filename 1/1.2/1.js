//creating of folder using fs and path module
const path = require("path");
const fs = require("fs");

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log(dataFolder, " folder created");
}

//creating of file inside this folder
const filePath = path.join(dataFolder, "example.txt");
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "Hello from example.txt file");
  console.log("File created succesfully");
  
  //reading content from a file
  const readContentFomFile = fs.readFileSync(filePath, "utf-8");
  console.log("File content: ", readContentFomFile);

  //append another line
  fs.appendFileSync(filePath, "\nThis is the new line added ");
  console.log("New file content added");
}

//Async way of creating the file
const asyncFilePath = path.join(dataFolder, "async-example.txt");
fs.writeFile(asyncFilePath, "Hello, from async file", (err) => {
  if (err) throw err;
  console.log("Async file created successfully");

  //async way of reading a file
  fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    console.log("Async file content : ", data);

    //async way of appending something into existing file
    fs.appendFile(asyncFilePath, "\nThis is another line added", (err) => {
      if (err) throw err;
    });
  });
});
