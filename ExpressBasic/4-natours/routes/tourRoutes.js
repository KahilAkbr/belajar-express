const express = require('express');
const tourController = require(`${__dirname}/../controllers/tourController`);
const router = express.Router();

router.route('/').get(tourController.getAllTours).post(tourController.addTour);

router
  .route('/:id')
  .get(tourController.getToursById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTour);

module.exports = router;
