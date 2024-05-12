const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => console.log("Timer 1 finish"), 0);
setImmediate(() => console.log("Immediate 1 finish"));

fs.readFile("test-file.txt", () => {
    console.log("I/O Finished");

    setTimeout(() => console.log("Timer 2 finish"), 0);
    setTimeout(() => console.log("Timer 3 finish"), 3000);
    setImmediate(() => console.log("Immediate 3 finish"));

    process.nextTick(() => console.log("next tick"));
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
});

console.log("Top level code");
