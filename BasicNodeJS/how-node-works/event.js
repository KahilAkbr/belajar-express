// const EventEmitter = require("events");
const { EventEmitter } = require("stream");
const http = require("http");

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
    console.log("There is a new sale");
});

myEmitter.on("newSale", () => {
    console.log("Customer : Kahil");
});

myEmitter.on("newSale", (stock) => {
    console.log(`There is ${stock} item left`);
});

myEmitter.emit("newSale", 9);

//////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request received");
    res.end("Request receiverd");
});

server.on("request", (req, res) => {
    console.log("Request2 received");
    // res.end("Request receiverd");
});

server.on("close", () => {
    console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for request");
});
