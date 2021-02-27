const express = require('express');

const router = express.Router();

const autosController = require('../controller/crud-autos');

const isAuth = require('../middleware/is-auth');
const validateAuto = require('../middleware/auto-validator');

router.get('/cars', isAuth, autosController.getHome);

router.post('/add-car', isAuth, validateAuto, autosController.postAddCar);

router.post('/edit-car/:carId', isAuth, validateAuto, autosController.postEditCar);

router.get('/car-detail/:carId', isAuth, autosController.getCarDetail);

router.delete('/delete-car/:carId', isAuth, autosController.postDeleteCar);

module.exports = router;
