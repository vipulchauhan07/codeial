const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
//const practiceController = require('../controllers/home_controller');
console.log('router loaded');

// router.get('/', homeController.practice);
router.get('/', homeController.home);
router.use('/users', require('./users'));

// for any further routes, access from here
// router.use('/routerName', require('.routerfile'));

router.use('/tests', require('./tests'));
module.exports = router;