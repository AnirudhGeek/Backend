//emit => emit is use to trigger/crating an event
//on => on is to register a listener

const EventEmitter = require("events");
const myFirstEmitter = new EventEmitter();

//register a listener
myFirstEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});
myFirstEmitter.emit("greet", "Anirudh Raturi");
