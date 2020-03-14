const express = require('express');
const router = express.Router();

const testsController = require('../controllers/tests_controller');

router.get('/check', testsController.check);

module.exports = router;