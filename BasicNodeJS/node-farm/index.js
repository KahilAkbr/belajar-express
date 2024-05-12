const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

var slugify = require('slugify');

////////// FILES
//Blocking, Synchronus way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textInput)

// const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOutput)
// console.log('File has been written!')

//Non-Blocking, Asynchronus way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('ERROR!')
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3)
//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('File has been written!')
//             })
//         })
//     })
// })
// console.log('Will Read File!')

////////// SERVER
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8'
);
const templateProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8'
);
const templateCard = fs.readFileSync(
  './templates/template-card.html',
  'utf-8'
);

const slugs = dataObj.map((el) =>
  slugify(el.productName, { lower: true })
);

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // console.log(url.parse(req.url), true)

  // console.log(req.url)
  // const pathName = req.url

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join('');
    // console.log(cardHtml)
    const output = templateOverview.replace(
      '{%PRODUCT_CARDS%}',
      cardHtml
    );

    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page Not Found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
