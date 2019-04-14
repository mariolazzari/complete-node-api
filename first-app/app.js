const hello = name => {
  console.log(`Hello ${name}`);
};

hello("Mario");

console.log(module);

// import module
const Logger = require("./logger");
const logger = new Logger();
logger.on("messageLogged", e => {
  console.log("Logger class event", e);
});
logger.log("test log");

// path module
const path = require("path");
const pathObj = path.parse(__filename);
console.log(pathObj);

// os module
const os = require("os");
const totalMem = os.totalmem();
const freeMem = os.freemem();

console.log(`Total memory: ${totalMem}
Free  memory: ${freeMem}`);

// fs module
const fs = require("fs");
// sync version
const files = fs.readdirSync("./");
console.log("Sync files:", files);
// async version
fs.readdir("./", (err, files) => {
  if (err) return console.log(err);
  console.log("Async files", files);
});

// events
const EventEmitter = require("events");
const emitter = new EventEmitter();
// subscribe event: on = addListener
emitter.on("messageLogged", () => {
  console.log("Listener called");
});
// raise an event
emitter.emit("messageLogged");
// event arguments
emitter.on("messageArgs", e => {
  console.log("Event args:", e);
});
emitter.emit("messageArgs", { id: 1, message: "Error logger 1" });

// http module
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world!");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.listen(3000);
console.log("Server started...");
