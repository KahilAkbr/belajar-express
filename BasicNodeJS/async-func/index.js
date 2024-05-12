const fs = require("fs");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("File Not Found");
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject("File Not Found");
            resolve("success");
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro("./dog.txt");
        console.log(`Breed : ${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map((el) => el.body.message);
        console.log(imgs);

        await writeFilePro("dog-img.txt", imgs.join("\n"));
        console.log("Image Saved");
    } catch (err) {
        console.log(err);
        throw err;
    }
    return "2";
};

(async () => {
    try {
        console.log("1");
        const x = await getDogPic();
        console.log(x);
        console.log("3");
    } catch (err) {
        console.log("ERROR");
    }
})();

// console.log("1");
// getDogPic()
//     .then((x) => {
//         console.log(x);
//         console.log("3");
//     })
//     .catch((err) => {
//         console.log("ERROR");
//     });

// readFilePro("./dog.txt")
//     .then((data) => {
//         console.log(`Breed : ${data}`);

//         return superagent.get(
//             `https://dog.ceo/api/breed/${data}/images/random`
//         );
//     })
//     .then((res) => {
//         console.log(res.body.message);

//         return writeFilePro("dog-img.txt", res.body.message);
//     })
//     .then(() => {
//         console.log("Image Saved");
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });
