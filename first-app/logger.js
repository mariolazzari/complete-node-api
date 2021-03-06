const EventEmitter = require("events");
const url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    // raise event
    this.emit("messageLogged", { id: 1, url });
  }
}

module.exports = Logger;
