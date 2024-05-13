/*
Note:
- Put : client harus send seluruh object yang diupdate
- Patch : client send hanya bagian object yang diupdate
*/

const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Test middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

/////////////////////////////
/*

OLD CODE
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the app',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint');
// });

// add handler for id that doesn't exist in the API
// if (id > tours.length) {
//   return res.status(404).json({
//     status: 'fail',
//     message: 'invalid ID',
//   });
// }

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getToursById);
// app.post('/api/v1/tours', addTour);
// app.patch('/api/v1/tours/:id', updateTourById);
// app.delete('/api/v1/tours/:id', deleteTour);

*/
