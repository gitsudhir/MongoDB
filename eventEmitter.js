const EventEmitter = require("events");

const myEventEmitter = new EventEmitter();

myEventEmitter.on("play", (...args) => {
  console.log("Im playing ... ", args);
});

myEventEmitter.emit("play", "sudhir", "kuamr");
