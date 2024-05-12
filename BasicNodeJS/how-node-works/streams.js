const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    // fs.readFile("test-file.txt", (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // const readable = fs.createReadStream("test-file.txt");
    // readable.on("data", (chunk) => {
    //     res.write(chunk);
    // });
    // readable.on("end", () => {
    //     res.end();
    // });
    // readable.on("error", (err) => {
    //     console.log(err);
    //     res.status = 500;
    //     res.end("File Not Found!");
    // });

    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
});

server.listen(8000, "localhost", () => {
    console.log("Server started");
});
