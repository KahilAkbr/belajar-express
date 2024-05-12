/*
Note:
- Put : client harus send seluruh object yang diupdate
- Patch : client send hanya bagian object yang diupdate
*/

const fs = require('fs');
const express = require('express');

const server = express();

server.use(express.json());

// server.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server',
//     app: 'Natours',
//   });
// });

// server.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint');
// });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

server.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

server.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  // add handler for id that doesn't exist in the API
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'invalid ID',
  //   });
  // }

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  // console.log(tour);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
});

server.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});
