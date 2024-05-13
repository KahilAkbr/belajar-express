/*
Note:
- Put : client harus send seluruh object yang diupdate
- Patch : client send hanya bagian object yang diupdate
*/

const fs = require('fs');
const express = require('express');

const server = express();

server.use(express.json());

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getToursById = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

const addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTourById = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  // use 200 so that the response appear (the standard is using 204)
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

// server.get('/api/v1/tours', getAllTours);
// server.get('/api/v1/tours/:id', getToursById);
// server.post('/api/v1/tours', addTour);
// server.patch('/api/v1/tours/:id', updateTourById);
// server.delete('/api/v1/tours/:id', deleteTour);

server
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(addTour);
server
  .route('/api/v1/tours/:id')
  .get(getToursById)
  .patch(updateTourById)
  .delete(deleteTour);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});

/////////////////////////////
/*

OLD CODE
// server.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server',
//     app: 'Natours',
//   });
// });

// server.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint');
// });

// add handler for id that doesn't exist in the API
// if (id > tours.length) {
//   return res.status(404).json({
//     status: 'fail',
//     message: 'invalid ID',
//   });
// }

*/
